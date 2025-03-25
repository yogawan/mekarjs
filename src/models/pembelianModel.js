import mongoose from "mongoose";

const PembelianSchema = new mongoose.Schema(
  {
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventaris", required: true },
        jumlah: { type: Number, required: true },
        harga: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "selesai"], default: "pending" },
    tanggal: { type: Date, required: true },
    dibuatOleh: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pembelian || mongoose.model("Pembelian", PembelianSchema);
