// src/pages/api/role/admin/inventaris/index.js

import connectDB from "@/lib/mongodb";
import Inventaris from "@/models/inventarisModel";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const items = await Inventaris.find({});
        return res.status(200).json(items);
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "POST":
      try {
        const item = await Inventaris.create(req.body);
        return res.status(201).json(item);
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}