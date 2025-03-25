import mongoose from "mongoose";

const InventarisSchema = new mongoose.Schema(
  {
    namaItem: { type: String, required: true },
    tipe: { type: String, required: true }, 
    deskripsi: { type: String, default: null },
    jumlah: { type: Number, required: true },
    satuan: { type: String, required: true },
    lokasi: { type: String, required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Inventaris || mongoose.model("Inventaris", InventarisSchema);
