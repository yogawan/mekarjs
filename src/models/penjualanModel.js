import mongoose from "mongoose";

const PenjualanSchema = new mongoose.Schema(
  {
    pelanggan: {
      nama: { type: String, required: true },
      email: { type: String, required: true },
      telepon: { type: String, required: true },
      alamat: { type: String, required: true },
    },
    items: {
        nama: { type: String, required: true },
        jumlah: { type: Number, required: true },
        harga: { type: Number, required: true },
    },
    total: { type: Number, required: true },
    status: { type: String, required: true },
    metodeBayar: { type: String, required: true },
    statusBayar: { type: String, required: true },
    tanggal: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Penjualan || mongoose.model("Penjualan", PenjualanSchema);