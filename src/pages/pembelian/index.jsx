// pages/pembelian/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/global/Sidebar";

export default function PembelianPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    supplier: {
      nama: "",
      email: "",
      telepon: "",
      alamat: ""
    },
    items: {
      nama: "",
      jumlah: 0,
      harga: 0
    },
    total: 0,
    status: "Diproses",
    metodeBayar: "",
    statusBayar: "Belum Bayar"
  });

  const materialOptions = [
    { nama: "Abu Batu", harga: 75000 },
    { nama: "Screening", harga: 80000 },
    { nama: "Split 1/2", harga: 85000 },
    { nama: "Split 2/3", harga: 90000 },
    { nama: "Base Course", harga: 70000 },
    { nama: "Boulder", harga: 95000 },
    { nama: "Makadam", harga: 87000 },
    { nama: "Sirtu", harga: 72000 },
  ];

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/api/role/admin/pembelian");
    setData(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("supplier.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        supplier: { ...prev.supplier, [field]: value }
      }));
    } else if (name.startsWith("items.")) {
      const field = name.split(".")[1];

      if (field === "nama") {
        const selected = materialOptions.find((m) => m.nama === value);
        setForm((prev) => ({
          ...prev,
          items: {
            ...prev.items,
            nama: value,
            harga: selected ? selected.harga : 0,
          },
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          items: {
            ...prev.items,
            [field]: field === "jumlah" || field === "harga" ? Number(value) : value
          },
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = form.items.jumlah * form.items.harga;

    try {
      await axios.post("/api/role/admin/pembelian", {
        ...form,
        total,
      });

      setForm({
        supplier: {
          nama: "",
          email: "",
          telepon: "",
          alamat: ""
        },
        items: {
          nama: "",
          jumlah: 0,
          harga: 0
        },
        total: 0,
        status: "Diproses",
        metodeBayar: "",
        statusBayar: "Belum Bayar"
      });

      fetchData();
    } catch (err) {
      console.error("Gagal menyimpan pembelian:", err.response?.data || err.message);
    }
  };

  return (
    <div className="text-black ml-[256px]">
      <Sidebar />
      <h1>Daftar Pembelian</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <strong>{item.supplier.nama}</strong> - {item.items.nama} - {item.total}
            <button onClick={() => router.push(`/pembelian/${item._id}`)}>Detail</button>
          </li>
        ))}
      </ul>

      <hr />
      <h2>Tambah Pembelian</h2>
      <form onSubmit={handleSubmit}>
        <input name="supplier.nama" placeholder="Nama Supplier" value={form.supplier.nama} onChange={handleChange} />
        <input name="supplier.email" placeholder="Email" value={form.supplier.email} onChange={handleChange} />
        <input name="supplier.telepon" placeholder="Telepon" value={form.supplier.telepon} onChange={handleChange} />
        <input name="supplier.alamat" placeholder="Alamat" value={form.supplier.alamat} onChange={handleChange} />

        <select name="items.nama" value={form.items.nama} onChange={handleChange} required>
          <option value="">Pilih Material</option>
          {materialOptions.map((m) => (
            <option key={m.nama} value={m.nama}>
              {m.nama}
            </option>
          ))}
        </select>

        <input
          name="items.harga"
          placeholder="Harga"
          type="number"
          value={form.items.harga}
          readOnly
        />

        <input
          type="number"
          name="items.jumlah"
          min="1"
          placeholder="Jumlah"
          value={form.items.jumlah}
          onChange={handleChange}
        />

        <select name="metodeBayar" value={form.metodeBayar} onChange={handleChange} required>
          <option value="">Pilih Metode Bayar</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="Tunai">Tunai</option>
          <option value="QRIS">QRIS</option>
        </select>

        <select name="statusBayar" value={form.statusBayar} onChange={handleChange} required>
          <option value="Belum Bayar">Belum Bayar</option>
          <option value="Sudah Bayar">Sudah Bayar</option>
        </select>

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}