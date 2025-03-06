import connectDB from "../../../../../lib/mongodb";
import Order from "../../../../../models/orderModel";
import crypto from "crypto";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const {
      transaction_status,
      transaction_id,
      order_id,
      payment_type,
      gross_amount,
      va_numbers,
      signature_key
    } = req.body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      return res.status(401).json({ success: false, message: "Signature tidak valid" });
    }

    const order = await Order.findOne({ order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
    }

    if (transaction_status === "settlement") {
      order.status = "lunas";
      order.settlement_time = new Date();
    } else if (transaction_status === "pending") {
      order.status = "menunggu";
    } else if (transaction_status === "expire") {
      order.status = "kedaluwarsa";
    } else if (transaction_status === "cancel" || transaction_status === "deny") {
      order.status = "dibatalkan";
    }

    order.transaction_id = transaction_id;
    order.payment_type = payment_type;
    order.bank = va_numbers?.[0]?.bank || null;
    order.va_number = va_numbers?.[0]?.va_number || null;
    await order.save();

    res.status(200).json({ success: true, message: "Status pesanan diperbarui", data: order });
  } catch (error) {
    console.error("🚨 Error saat menerima callback Midtrans:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}
