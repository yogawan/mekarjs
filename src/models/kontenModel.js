import mongoose from "mongoose";

const KontenSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isi: { type: String, required: true },
    penulisId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Konten || mongoose.model("Konten", KontenSchema);
