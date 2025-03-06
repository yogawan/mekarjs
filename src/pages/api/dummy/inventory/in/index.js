export default function handler(req, res) {
  res.status(200).json([
    // Data Barang Masuk
    {
      "tanggal_masuk": "2025-02-28",
      "nama_barang": "Batu Kali",
      "jumlah": 10.5,
      "satuan": "ton",
      "harga_satuan": 250000,
      "total_harga": 2625000,
      "supplier": {
        "nama": "PT. Sumber Alam Jaya",
        "kontak": "0812-3456-7890"
      },
      "keterangan": "Pembelian dari supplier lokal"
    },
    {
      "tanggal_masuk": "2025-02-27",
      "nama_barang": "Batu Gunung",
      "jumlah": 15,
      "satuan": "ton",
      "harga_satuan": 300000,
      "total_harga": 4500000,
      "supplier": {
        "nama": "UD. Batu Sejahtera",
        "kontak": "0813-9876-5432"
      },
      "keterangan": "Pengiriman dari daerah Bogor"
    },
    {
      "tanggal_masuk": "2025-02-26",
      "nama_barang": "Batu Split",
      "jumlah": 12,
      "satuan": "ton",
      "harga_satuan": 280000,
      "total_harga": 3360000,
      "supplier": {
        "nama": "CV. Mitra Batu",
        "kontak": "0821-1234-5678"
      },
      "keterangan": "Pasokan rutin mingguan"
    },
    {
      "tanggal_masuk": "2025-02-25",
      "nama_barang": "Batu Andesit",
      "jumlah": 20,
      "satuan": "ton",
      "harga_satuan": 320000,
      "total_harga": 6400000,
      "supplier": {
        "nama": "PT. Batu Mulia",
        "kontak": "0817-2345-6789"
      },
      "keterangan": "Pasokan proyek pemerintah"
    },
    {
      "tanggal_masuk": "2025-02-24",
      "nama_barang": "Batu Pecah",
      "jumlah": 8,
      "satuan": "ton",
      "harga_satuan": 260000,
      "total_harga": 2080000,
      "supplier": {
        "nama": "UD. Karya Abadi",
        "kontak": "0819-5678-4321"
      },
      "keterangan": "Pengiriman tambahan untuk stok"
    },
    {
      "tanggal_masuk": "2025-02-28",
      "nama_barang": "Batu Kali",
      "jumlah": 10.5,
      "satuan": "ton",
      "harga_satuan": 250000,
      "total_harga": 2625000,
      "supplier": {
        "nama": "PT. Sumber Alam Jaya",
        "kontak": "0812-3456-7890"
      },
      "keterangan": "Pembelian dari supplier lokal"
    },
    {
      "tanggal_masuk": "2025-02-27",
      "nama_barang": "Batu Gunung",
      "jumlah": 15,
      "satuan": "ton",
      "harga_satuan": 300000,
      "total_harga": 4500000,
      "supplier": {
        "nama": "UD. Batu Sejahtera",
        "kontak": "0813-9876-5432"
      },
      "keterangan": "Pengiriman dari daerah Bogor"
    },
    {
      "tanggal_masuk": "2025-02-26",
      "nama_barang": "Batu Split",
      "jumlah": 12,
      "satuan": "ton",
      "harga_satuan": 280000,
      "total_harga": 3360000,
      "supplier": {
        "nama": "CV. Mitra Batu",
        "kontak": "0821-1234-5678"
      },
      "keterangan": "Pasokan rutin mingguan"
    },
    {
      "tanggal_masuk": "2025-02-25",
      "nama_barang": "Batu Andesit",
      "jumlah": 20,
      "satuan": "ton",
      "harga_satuan": 320000,
      "total_harga": 6400000,
      "supplier": {
        "nama": "PT. Batu Mulia",
        "kontak": "0817-2345-6789"
      },
      "keterangan": "Pasokan proyek pemerintah"
    },
    {
      "tanggal_masuk": "2025-02-24",
      "nama_barang": "Batu Pecah",
      "jumlah": 8,
      "satuan": "ton",
      "harga_satuan": 260000,
      "total_harga": 2080000,
      "supplier": {
        "nama": "UD. Karya Abadi",
        "kontak": "0819-5678-4321"
      },
      "keterangan": "Pengiriman tambahan untuk stok"
    },
  ]);
}
