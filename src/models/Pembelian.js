// src/models/Pembelian.js
import mongoose from 'mongoose';

const PembelianSchema = new mongoose.Schema({
  supplier: {
    nama: String,
    email: String,
    telepon: String,
    alamat: String
  },
  items: {
    nama: String,
    jumlah: Number,
    harga: Number
  },
  total: Number,
  status: {
    type: String,
    enum: ['Diproses', 'Dikirim', 'Diterima', 'Selesai'],
    default: 'Diproses'
  },
  metodeBayar: String,
  statusBayar: {
    type: String,
    enum: ['Belum Bayar', 'Sudah Bayar'],
    default: 'Belum Bayar'
  },
  tanggal: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Pembelian || mongoose.model('Pembelian', PembelianSchema);