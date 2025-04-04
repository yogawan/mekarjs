import connectDB from "@/lib/mongodb";
import Penjualan from "@/models/penjualanModel";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const penjualan = await Penjualan.findById(id);
        if (!penjualan) {
          return res.status(404).json({ success: false, message: "Penjualan tidak ditemukan" });
        }
        return res.status(200).json({ success: true, data: penjualan });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "PUT":
      try {
        const update = await Penjualan.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
          return res.status(404).json({ success: false, message: "Penjualan tidak ditemukan" });
        }
        return res.status(200).json({ success: true, data: update });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "DELETE":
      try {
        const hapus = await Penjualan.findByIdAndDelete(id);
        if (!hapus) {
          return res.status(404).json({ success: false, message: "Penjualan tidak ditemukan" });
        }
        return res.status(200).json({ success: true, message: "Penjualan berhasil dihapus" });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
