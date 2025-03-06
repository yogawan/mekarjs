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
    transaction_status: { type: String, required: false },
    payment_type: { type: String, required: false },
    va_numbers: [
      {
        va_number: { type: String, required: false },
        bank: { type: String, required: false },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
