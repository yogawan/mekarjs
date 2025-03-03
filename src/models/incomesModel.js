import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    id_pesanan: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    jumlah: { type: Number, required: true },
    deskripsi: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Income || mongoose.model("Income", IncomeSchema);
