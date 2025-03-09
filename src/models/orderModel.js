import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true },
    id_pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    id_material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    jumlah: { type: Number, required: true },
    total_harga: { type: Number, required: true },
    tautan_bayar: { type: String, required: false },
    sudah_diambil: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
