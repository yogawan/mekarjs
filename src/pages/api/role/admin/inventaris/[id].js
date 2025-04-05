// src/pages/api/role/admin/inventaris/[id].js

import connectDB from "@/lib/mongodb";
import Inventaris from "@/models/inventarisModel";

export default async function handler(req, res) {
  await connectDB();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await Inventaris.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        return res.status(200).json(item);
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "PUT":
      try {
        const updated = await Inventaris.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ success: false, message: "Item not found" });
        return res.status(200).json(updated);
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "DELETE":
      try {
        const deleted = await Inventaris.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Item not found" });
        return res.status(200).json({ success: true, message: "Item deleted" });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
