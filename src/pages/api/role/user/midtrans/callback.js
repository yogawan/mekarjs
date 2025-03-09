import connectDB from "../../../../../lib/mongodb";
import Order from "../../../../../models/orderModel";
import nodemailer from "nodemailer";
import { verifySignature } from "../../../../../middleware/verifySignature";
import User from "../../../../../models/userModel";  // Pastikan Anda memiliki model User

async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  const { signature_key, order_id, transaction_status, transaction_id, gross_amount, payment_type, va_numbers } = req.body;

  // Verifikasi signature untuk keamanan
  const isValidSignature = verifySignature(req.body);
  if (!isValidSignature) {
    return res.status(400).json({ success: false, message: "Signature tidak valid" });
  }

  try {
    const order = await Order.findOne({ order_id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    // Cek apakah status transaksi sudah sama dengan yang ada di database
    if (order.transaction_status === transaction_status) {
      return res.status(200).json({ success: true, message: "Status transaksi sudah diperbarui sebelumnya" });
    }

    // Update status order berdasarkan transaksi
    if (transaction_status === "pending") {
      order.status = "Pending";
    } else if (transaction_status === "settlement") {
      order.status = "Lunas";
    } else if (transaction_status === "cancel") {
      order.status = "Batal";
    } else {
      order.status = "Gagal";
    }

    // Simpan status terbaru
    order.transaction_status = transaction_status;
    order.transaction_id = transaction_id;
    await order.save();

    // Kirim email invoice hanya jika status transaksi berubah menjadi settlement atau pending
    if (transaction_status === "settlement" || transaction_status === "pending") {
      const user = await User.findById(order.id_pengguna); // Ambil data pengguna berdasarkan ID
      if (!user || !user.email) {
        return res.status(404).json({ success: false, message: "Email pengguna tidak ditemukan" });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Alamat email pengirim
          pass: process.env.EMAIL_PASS  // Password email pengirim
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Invoice Pembayaran Order ID: ${order_id}`,
        text: `Terima kasih telah melakukan pembayaran untuk pesanan Anda dengan ID: ${order_id}.\n
        Status pembayaran: ${transaction_status}\n
        Total Pembayaran: ${gross_amount}\n
        Silakan melakukan konfirmasi lebih lanjut melalui link pembayaran: ${va_numbers[0]?.va_number}.`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email berhasil dikirim");
      } catch (error) {
        console.error("Gagal mengirim email:", error);
      }
    }

    res.status(200).json({ success: true, message: "Callback diterima dan diproses", data: order });

  } catch (error) {
    console.error("Error saat memproses callback:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

export default handler;
