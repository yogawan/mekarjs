// src/models/Inventaris.js
import mongoose from "mongoose";

const InventarisSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tipe: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      default: null,
    },
    jumlah: {
      type: Number,
      required: true,
      min: 0,
    },
    satuan: {
      type: String,
      required: true,
    },
    lokasi: {
      type: String,
      // Enum PT. Mekar Jaya Sejahtera Cabang 1, Cabang 2 dan Cabang 3
      required: true,
    },
    kondisi: {
      type: String,
      enum: ["Baik", "Rusak", "Perlu Perawatan"],
      default: "Baik",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inventaris || mongoose.model("Inventaris", InventarisSchema);