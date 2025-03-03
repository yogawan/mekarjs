import connectDB from "../../../lib/mongodb"
import Material from "../../../models/materialsModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const materials = await Material.find().select("-__v -createdAt -updatedAt"); // Hapus metadata yang tidak diperlukan
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil data material", error: error.message });
  }
}
