import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    id_pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    id_material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    jumlah: { type: Number, required: true },
    total_harga: { type: Number, required: true },
    status: { type: String, enum: ["menunggu", "dibayar", "selesai"], default: "menunggu" },
    tautan_bayar: { type: String, required: false },
    sudah_diambil: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
