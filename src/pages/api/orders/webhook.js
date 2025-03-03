import connectDB from "../../../lib/mongodb";
import Order from "../../../models/ordersMaterial";

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { order_id, transaction_status } = req.body;

    if (!order_id || !transaction_status) {
      return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    }

    let statusPesanan = "menunggu";

    if (transaction_status === "settlement" || transaction_status === "capture") {
      statusPesanan = "dibayar";
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      statusPesanan = "gagal";
    }

    const order = await Order.findOneAndUpdate(
      { _id: order_id },
      { status: statusPesanan },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
    }

    res.status(200).json({ success: true, message: "Status pesanan diperbarui", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
};

export default handler;
