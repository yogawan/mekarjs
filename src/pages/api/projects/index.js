import connectDB from "@/lib/mongodb";
import Project from "@/models/projectModel";
import checkApiKey from "../middleware/auth";

async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const projects = await Project.find();
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Gagal mengambil data proyek", details: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const newProject = await Project.create(req.body);
      return res.status(201).json({ success: true, message: "Project berhasil dibuat", data: newProject });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Gagal menambahkan project", details: error.message });
    }
  }

  return res.status(405).json({ success: false, error: "Method tidak diizinkan" });
}

// 🔥 Bungkus handler dengan middleware API Key
export default checkApiKey(handler);
