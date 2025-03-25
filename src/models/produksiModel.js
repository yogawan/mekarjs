import mongoose from "mongoose";

const ProduksiSchema = new mongoose.Schema(
  {
    workOrder: { type: String, required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventaris", required: true },
        jumlah: { type: Number, required: true },
      },
    ],
    billOfMaterial: [
      {
        materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventaris", required: true },
        jumlah: { type: Number, required: true },
      },
    ],
    qualityControl: {
      status: { type: String, enum: ["lulus", "gagal", "pending"], default: "pending" },
      catatan: { type: String, default: null },
    },
    tanggal: { type: Date, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Produksi || mongoose.model("Produksi", ProduksiSchema);
