import mongoose from "mongoose";

const PelangganSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    email: { type: String, required: true },
    telepon: { type: String, required: true },
    alamat: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pelanggan || mongoose.model("Pelanggan", PelangganSchema);
