import mongoose from "mongoose";

const TransaksiKeuanganSchema = new mongoose.Schema(
  {
    jenisTransaksi: { 
      type: String, 
      enum: ["pemasukan", "pengeluaran"], 
      required: true 
    },
    jumlah: { type: Number, required: true },
    deskripsi: { type: String, required: true },
    kategori: { type: String, default: null },
    tanggal: { type: Date, required: true },
    dibuatOleh: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TransaksiKeuangan || mongoose.model("TransaksiKeuangan", TransaksiKeuanganSchema);