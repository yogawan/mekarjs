export default function handler(req, res) {
  res.status(200).json( 
    [
      {
        "id": 1,
        "date": "2025-02-02",
        "category": "Gaji Karyawan",
        "amount": 25000000,
        "description": "Pembayaran gaji bulanan untuk 20 karyawan",
        "vendor": "PT. Mekar Jaya Sejahtera",
        "payment_method": "Transfer Bank"
      },
      {
        "id": 2,
        "date": "2025-02-06",
        "category": "Biaya Operasional",
        "amount": 15000000,
        "description": "Pembelian bahan bakar solar untuk mesin pemecah batu",
        "vendor": "SPBU 34.102.08",
        "payment_method": "Kredit 7 Hari"
      },
      {
        "id": 3,
        "date": "2025-02-12",
        "category": "Perawatan Mesin",
        "amount": 18000000,
        "description": "Servis dan penggantian sparepart mesin pemecah batu",
        "vendor": "Bengkel Teknik Jaya",
        "payment_method": "Tunai"
      },
      {
        "id": 4,
        "date": "2025-02-18",
        "category": "Pembelian Material",
        "amount": 20000000,
        "description": "Pembelian batu mentah untuk produksi",
        "vendor": "PT. Tambang Nusantara",
        "payment_method": "Transfer Bank"
      },
      {
        "id": 5,
        "date": "2025-02-22",
        "category": "Pajak dan Retribusi",
        "amount": 10000000,
        "description": "Pembayaran pajak usaha dan retribusi daerah",
        "vendor": "Pemerintah Kabupaten",
        "payment_method": "Transfer Bank"
      }
    ]
    
   );
}
