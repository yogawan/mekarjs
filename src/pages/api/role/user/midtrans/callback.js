import connectDB from "../../../../../lib/mongodb";
import Order from "../../../../../models/orderModel";
import crypto from "crypto";

async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const {
      order_id,
      transaction_status,
      transaction_id,
      settlement_time,
      signature_key,
      gross_amount,
      payment_type
    } = req.body;

    // 🔹 Validasi Signature Key
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      return res.status(403).json({ success: false, message: "Signature tidak valid" });
    }

    // 🔹 Cari order berdasarkan order_id
    const order = await Order.findOne({ order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
    }

    // 🔹 Update status pembayaran berdasarkan status dari Midtrans
    let statusPesanan = order.status;

    if (transaction_status === "settlement") {
      statusPesanan = "lunas";
    } else if (transaction_status === "pending") {
      statusPesanan = "menunggu";
    } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
      statusPesanan = "gagal";
    }

    // 🔹 Simpan perubahan ke database
    order.status = statusPesanan;
    order.transaction_id = transaction_id;
    order.settlement_time = settlement_time || null;
    order.payment_type = payment_type;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Notifikasi pembayaran berhasil diproses",
      data: order
    });

  } catch (error) {
    console.error("Error saat memproses notifikasi Midtrans:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

export default handler;
