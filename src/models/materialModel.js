import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    harga_per_ton: { type: Number, required: true },
    stok: { type: Number, required: true },
    deskripsi: { type: String, required: false },
    gambar_url: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Material || mongoose.model("Material", MaterialSchema);