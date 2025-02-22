import connectDB from "@/lib/mongodb";
import Project from "@/models/projectModel";

export default async function handler(req, res) {
  await connectDB(); // Pastikan koneksi ke MongoDB

  if (req.method === "GET") {
    try {
      const projects = await Project.find(); // Ambil semua project
      return res.status(200).json({ projects });
    } catch (error) {
      return res.status(500).json({ error: "Gagal mengambil data proyek" });
    }
  }

  if (req.method === "POST") {
    try {
      const newProject = await Project.create(req.body); // Buat project baru
      return res.status(201).json({ message: "Project berhasil dibuat", project: newProject });
    } catch (error) {
      return res.status(500).json({ error: "Gagal menambahkan project" });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}
