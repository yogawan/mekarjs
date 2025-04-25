import connectDB from '@/lib/mongodb';
import Pembelian from '@/models/Pembelian';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const pembelian = await Pembelian.find({});
        res.status(200).json(pembelian);
      } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data' });
      }
      break;

    case 'POST':
      try {
        const newPembelian = new Pembelian(req.body);
        await newPembelian.save();
        res.status(201).json(newPembelian);
      } catch (error) {
        res.status(400).json({ error: 'Gagal membuat data', detail: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
}