import connectDB from "../../../lib/mongodb";
import Order from "../../../models/ordersMaterial";
import { verifyToken } from "../../../middleware/auth";

async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const id_pengguna = req.user.id; // 🔥 Ambil ID pengguna dari token JWT

    // Cari semua pesanan milik pengguna yang login
    const orders = await Order.find({ id_pengguna }).populate("id_material", "nama harga_per_ton");

    res.status(200).json({
      success: true,
      message: "Daftar pesanan ditemukan",
      data: orders
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

// 🔥 Gunakan middleware JWT untuk mengambil ID pengguna dari token
export default verifyToken(handler);
