// src/pages/api/role/admin/keuangan/index.js

import connectDB from '@/lib/mongodb';
import Penjualan from '@/models/penjualanModel';
import Pembelian from '@/models/pembelianModel';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const penjualan = await Penjualan.find({});
      const totalPenjualan = penjualan.reduce((acc, item) => acc + item.total, 0);

      const pembelian = await Pembelian.find({});
      const totalPembelian = pembelian.reduce((acc, item) => acc + item.total, 0);

      res.status(200).json({
        success: true,
        data: {
          totalPenjualan,
          totalPembelian
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data keuangan',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metode ${req.method} tidak diizinkan`);
  }
}
