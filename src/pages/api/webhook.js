import connectDB from "../../lib/mongodb";
import Order from "../../models/ordersMaterial";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB(); // Koneksi ke database

    const { transaction_status, order_id } = req.body; // Ambil data dari callback Midtrans

    // Cek apakah order dengan order_id tersebut ada di database
    const order = await Order.findOne({ _id: order_id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    // Update status order jika pembayaran berhasil
    if (transaction_status === "settlement") {
      order.status = "dibayar";
      await order.save();
      return res.status(200).json({ success: true, message: "Order diperbarui menjadi 'dibayar'" });
    }

    return res.status(200).json({ success: true, message: "Webhook diterima, tidak ada perubahan" });

  } catch (error) {
    console.error("Error di webhook:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
