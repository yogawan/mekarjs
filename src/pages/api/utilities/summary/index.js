export default function handler(req, res) {
  res.status(200).json({
    "total_income": 255000000,        // Total pemasukan
    "total_expense": 88000000,        // Total pengeluaran
    "net_profit": 997000000,          // Laba bersih
    "profit_margin": 65.49,           // Margin keuntungan dalam persen

    "total_purchases": 72000000,      // Total pembelian dari supplier
    "total_sales": 310000000,         // Total penjualan produk
    "inventory_value": 125000000,     // Nilai total barang di gudang
    "employee_salaries": 42000000,    // Total gaji karyawan bulan ini
    "production_cost": 38000000,      // Biaya produksi
    "supplier_count": 15,             // Jumlah vendor aktif
    "customer_count": 120,            // Jumlah pelanggan aktif
  });
}
