import connectDB from "@/lib/mongodb";
import Penjualan from "@/models/penjualanModel";

export default async function handler(req, res) {
  await connectDB();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const penjualan = await Penjualan.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: penjualan });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "POST":
      try {
        const baru = await Penjualan.create(req.body);
        return res.status(201).json({ success: true, data: baru });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}