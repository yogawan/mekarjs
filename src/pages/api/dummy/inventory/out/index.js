export default function handler(req, res) {
  res.status(200).json([
    {
      "tanggal_keluar": "2025-02-28",
      "nama_barang": "Batu Split 1/2",
      "jumlah": 8,
      "satuan": "ton",
      "harga_satuan": 500000,
      "total_harga": 4000000,
      "pembeli": {
        "nama": "PT. Konstruksi Jaya Abadi",
        "kontak": "0821-5678-9012"
      },
      "keterangan": "Penjualan ke proyek jalan tol"
    },
    {
      "tanggal_keluar": "2025-02-27",
      "nama_barang": "Batu Abu",
      "jumlah": 12,
      "satuan": "ton",
      "harga_satuan": 200000,
      "total_harga": 2400000,
      "pembeli": {
        "nama": "CV. Bangun Sejahtera",
        "kontak": "0819-8765-4321"
      },
      "keterangan": "Pesanan untuk konstruksi gedung"
    },
    {
      "tanggal_keluar": "2025-02-26",
      "nama_barang": "Batu Gunung",
      "jumlah": 10,
      "satuan": "ton",
      "harga_satuan": 350000,
      "total_harga": 3500000,
      "pembeli": {
        "nama": "PT. Mega Beton",
        "kontak": "0832-6789-1234"
      },
      "keterangan": "Pesanan untuk proyek drainase"
    },
    {
      "tanggal_keluar": "2025-02-25",
      "nama_barang": "Batu Kali",
      "jumlah": 15,
      "satuan": "ton",
      "harga_satuan": 270000,
      "total_harga": 4050000,
      "pembeli": {
        "nama": "UD. Karya Mandiri",
        "kontak": "0815-4321-9876"
      },
      "keterangan": "Penjualan ke proyek jalan desa"
    },
    {
      "tanggal_keluar": "2025-02-24",
      "nama_barang": "Batu Pecah",
      "jumlah": 6,
      "satuan": "ton",
      "harga_satuan": 400000,
      "total_harga": 2400000,
      "pembeli": {
        "nama": "CV. Pembangunan Sejahtera",
        "kontak": "0812-8765-1234"
      },
      "keterangan": "Pengiriman untuk kontraktor swasta"
    },
    {
      "tanggal_keluar": "2025-02-23",
      "nama_barang": "Batu Split 3/4",
      "jumlah": 7,
      "satuan": "ton",
      "harga_satuan": 480000,
      "total_harga": 3360000,
      "pembeli": {
        "nama": "PT. Beton Indah",
        "kontak": "0813-5678-2345"
      },
      "keterangan": "Penjualan untuk pembuatan jembatan"
    },
    {
      "tanggal_keluar": "2025-02-22",
      "nama_barang": "Batu Kerikil",
      "jumlah": 5,
      "satuan": "ton",
      "harga_satuan": 150000,
      "total_harga": 750000,
      "pembeli": {
        "nama": "UD. Makmur Jaya",
        "kontak": "0814-7890-5432"
      },
      "keterangan": "Pesanan untuk taman kota"
    },
    {
      "tanggal_keluar": "2025-02-21",
      "nama_barang": "Batu Belah",
      "jumlah": 9,
      "satuan": "ton",
      "harga_satuan": 320000,
      "total_harga": 2880000,
      "pembeli": {
        "nama": "CV. Mitra Bangunan",
        "kontak": "0822-4567-7890"
      },
      "keterangan": "Pesanan untuk proyek perumahan"
    },
    {
      "tanggal_keluar": "2025-02-20",
      "nama_barang": "Batu Andesit",
      "jumlah": 4,
      "satuan": "ton",
      "harga_satuan": 600000,
      "total_harga": 2400000,
      "pembeli": {
        "nama": "PT. Alam Sejahtera",
        "kontak": "0823-6543-2109"
      },
      "keterangan": "Pesanan untuk interior bangunan"
    }
  ]);
}
