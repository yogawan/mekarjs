import connectDB from "../../../../../lib/mongodb";
import Order from "../../../../../models/orderModel";
import materialModel from "@/models/materialModel";
import { verifyToken } from "../../../../../middleware/auth";

async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const id_pengguna = req.user?.id;

    if (!id_pengguna) {
      return res.status(401).json({ success: false, message: "Pengguna tidak terautentikasi" });
    }

    const orders = await Order.find({ id_pengguna }).populate('id_material', 'nama harga_per_ton').exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "Tidak ada pesanan ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Pesanan ditemukan",
      data: orders
    });
  } catch (error) {
    console.error("Error saat mengambil pesanan:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

export default verifyToken(handler);
