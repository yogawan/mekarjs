import connectDB from "../../../lib/mongodb";
import Order from "../../../models/orderModel";
import TransactionLog from "../../../models/transactionLogsModel";
import { verifyToken } from "../../../middleware/auth";

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

    // Cari semua pesanan berdasarkan id_pengguna
    const orders = await Order.find({ id_pengguna }).lean();

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Tidak ada transaksi ditemukan" });
    }

    // Ambil semua order_id dari pesanan pengguna
    const orderIds = orders.map(order => order.order_id);

    // Cari semua transaksi yang terkait dengan pesanan pengguna
    const transactions = await TransactionLog.find({ order_id: { $in: orderIds } }).lean();

    res.status(200).json({
      success: true,
      message: "Riwayat transaksi ditemukan",
      data: transactions
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

// Gunakan middleware untuk otentikasi pengguna
export default verifyToken(handler);
