import StatCard from "./StatCard";
import CountCard from "./CountCard";

const OverviewStats = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="flex flex-col justify-between">
      <StatCard title="Total Penjualan" type="Pemasukan" amount={summary.total_sales} icon="mdi:cart-outline" isPositive={true} />
      <StatCard title="Nilai Inventaris" type="Pemasukan" amount={summary.inventory_value} icon="mdi:warehouse" isPositive={true} />
      <StatCard title="Total Pembelian" type="Pengeluaran" amount={summary.total_purchases} icon="mdi:truck-fast" isPositive={false} />
      <StatCard title="Total Gaji Karyawan" type="Pengeluaran" amount={summary.employee_salaries} icon="mdi:account-group-outline" isPositive={false} />
      <StatCard title="Biaya Produksi" type="Pengeluaran" amount={summary.production_cost} icon="mdi:factory" isPositive={false} />
      <div className="flex gap-4">
        <CountCard title="Jumlah Pelanggan" amount={summary.customer_count} icon="mdi:account-group" isPositive={true} />
        <CountCard title="Jumlah Supplier" amount={summary.supplier_count} icon="mdi:handshake" isPositive={true} />
      </div>
    </div>
  );
};

export default OverviewStats;
