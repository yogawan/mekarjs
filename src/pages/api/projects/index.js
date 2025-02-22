import connectDB from "@/lib/mongodb";
import Project from "@/models/projectModel";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const projects = await Project.find();
    return res.status(200).json({ projects });
  }

  if (req.method === "POST") {
    try {
      const { title, description, status } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: "Title dan Description wajib diisi" });
      }

      const newProject = new Project({ title, description, status });
      await newProject.save();

      return res.status(201).json({ message: "Project berhasil dibuat", project: newProject });
    } catch (error) {
      return res.status(500).json({ error: "Gagal menyimpan project" });
    }
  }

  return res.status(405).json({ error: "Method tidak diizinkan" });
}
