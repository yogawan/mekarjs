import mongoose from "mongoose";

const PenjualanSchema = new mongoose.Schema(
  {
    pelangganId: { type: mongoose.Schema.Types.ObjectId, ref: "Pelanggan", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventaris", required: true },
        jumlah: { type: Number, required: true },
        harga: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    metodeBayar: { type: String, required: true },
    statusBayar: { type: String, required: true },
    tanggal: { type: Date, required: true },
    dibuatOleh: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Penjualan || mongoose.model("Penjualan", PenjualanSchema);
