import connectDB from '@/lib/mongodb';
import Pembelian from '@/models/pembelianModel';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const pembelian = await Pembelian.findById(id);
        if (!pembelian) return res.status(404).json({ error: 'Data tidak ditemukan' });
        res.status(200).json(pembelian);
      } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data' });
      }
      break;

    case 'PUT':
      try {
        const updated = await Pembelian.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Data tidak ditemukan' });
        res.status(200).json(updated);
      } catch (error) {
        res.status(400).json({ error: 'Gagal mengupdate data' });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Pembelian.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Data tidak ditemukan' });
        res.status(200).json({ message: 'Data berhasil dihapus' });
      } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus data' });
      }
      break;

    default:
      res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
}