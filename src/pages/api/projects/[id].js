import connectDB from "@/lib/mongodb";
import Project from "@/models/projectModel";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID tidak valid" });
  }

  if (req.method === "GET") {
    try {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ error: "Project tidak ditemukan" });

      return res.status(200).json({ project });
    } catch (error) {
      return res.status(500).json({ error: "Gagal mengambil data proyek" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProject) return res.status(404).json({ error: "Project tidak ditemukan" });

      return res.status(200).json({ message: "Project berhasil diperbarui", project: updatedProject });
    } catch (error) {
      return res.status(500).json({ error: "Gagal memperbarui project" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) return res.status(404).json({ error: "Project tidak ditemukan" });

      return res.status(200).json({ message: "Project berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ error: "Gagal menghapus project" });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}
