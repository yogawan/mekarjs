import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    kontakPerson: { type: String, required: true },
    email: { type: String, required: true },
    telepon: { type: String, required: true },
    alamat: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);