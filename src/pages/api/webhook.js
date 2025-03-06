import connectDB from "../../../lib/mongodb";
import Order from "../../../models/orderModel";
import TransactionLog from "../../../models/transactionLogsModel";
import crypto from "crypto";

async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const {
      order_id,
      transaction_id,
      transaction_status,
      settlement_time,
      payment_type,
      va_numbers,
      bank,
      gross_amount,
      fraud_status,
      currency,
      expiry_time,
      signature_key
    } = req.body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${transaction_status}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      return res.status(403).json({ success: false, message: "Signature tidak valid" });
    }

    // Simpan callback ke database
    const newLog = new TransactionLog({
      order_id,
      transaction_id,
      transaction_status,
      settlement_time,
      payment_type,
      va_number: va_numbers?.[0]?.va_number || null,
      bank,
      gross_amount: parseFloat(gross_amount),
      currency,
      fraud_status,
      expiry_time,
      raw_callback: req.body // Simpan semua data asli dari Midtrans
    });

    await newLog.save();

    // Update pesanan jika ditemukan
    const order = await Order.findOne({ order_id });
    if (order) {
      if (transaction_status === "settlement") {
        order.status = "dibayar";
        order.settlement_time = settlement_time;
      } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
        order.status = "gagal";
      } else if (transaction_status === "pending") {
        order.status = "menunggu";
      }

      await order.save();
    }

    res.status(200).json({ success: true, message: "Callback berhasil diproses" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

export default handler;
