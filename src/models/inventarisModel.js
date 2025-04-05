// src/models/inventarisModel.js

import mongoose from "mongoose";

const InventarisSchema = new mongoose.Schema(
  {
    kodeItem: {
      type: String,
      unique: true,
      required: true,
    },
    namaItem: {
      type: String,
      required: true,
    },
    tipe: {
      type: String,
      enum: ["Alat Berat", "Sparepart", "Bahan Baku", "ATK", "Lainnya"],
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