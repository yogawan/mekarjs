// pages/penjualan/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/global/Sidebar";

export default function PenjualanIndex() {
  const [penjualans, setPenjualans] = useState([]);
  const [form, setForm] = useState({
    pelanggan: { nama: "", email: "", telepon: "", alamat: "" },
    items: { nama: "", jumlah: 0, harga: 0 },
    total: 0,
    status: "",
    metodeBayar: "",
    statusBayar: "",
    tanggal: "",
  });
  const router = useRouter();

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

  const statusOptions = ["Diambil", "Belum Diambil"];
  const metodeBayarOptions = ["Tunai", "Transfer Bank", "QRIS"];
  const statusBayarOptions = ["Belum Bayar", "Sudah Bayar"];

  useEffect(() => {
    fetch("/api/role/admin/penjualan")
      .then((res) => res.json())
      .then((data) => setPenjualans(data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("pelanggan.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        pelanggan: { ...prev.pelanggan, [field]: value },
      }));
    } else if (name.startsWith("items.")) {
      const field = name.split(".")[1];

      if (field === "nama") {
        const selected = materialOptions.find((m) => m.nama === value);
        if (selected) {
          setForm((prev) => ({
            ...prev,
            items: {
              ...prev.items,
              nama: selected.nama,
              harga: selected.harga,
            },
          }));
          return;
        }
      }

      setForm((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [field]: field === "jumlah" || field === "harga" ? Number(value) : value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = form.items.jumlah * form.items.harga;
    const res = await fetch("/api/role/admin/penjualan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, total }),
    });

    if (res.ok) {
      const data = await res.json();
      setPenjualans((prev) => [data.data, ...prev]);
      setForm({
        pelanggan: { nama: "", email: "", telepon: "", alamat: "" },
        items: { nama: "", jumlah: 0, harga: 0 },
        total: 0,
        status: "",
        metodeBayar: "",
        statusBayar: "",
        tanggal: "",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Apakah kamu yakin ingin menghapus data ini?");
    if (!confirmed) return;

    const res = await fetch(`/api/role/admin/penjualan/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPenjualans((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="text-black ml-[256px]">
      <Sidebar />

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h3>Tambah Penjualan</h3>

        <input name="pelanggan.nama" placeholder="Nama Pelanggan" value={form.pelanggan.nama} onChange={handleChange} required />
        <input name="pelanggan.email" placeholder="Email" value={form.pelanggan.email} onChange={handleChange} required />
        <input name="pelanggan.telepon" placeholder="Telepon" value={form.pelanggan.telepon} onChange={handleChange} required />
        <input name="pelanggan.alamat" placeholder="Alamat" value={form.pelanggan.alamat} onChange={handleChange} required />

        <select name="items.nama" value={form.items.nama} onChange={handleChange} required>
          <option value="">Pilih Material</option>
          {materialOptions.map((m) => (
            <option key={m.nama} value={m.nama}>
              {m.nama}
            </option>
          ))}
        </select>

        <input name="items.harga" placeholder="Harga" type="number" value={form.items.harga} readOnly />
        
        <input name="items.jumlah" placeholder="Jumlah" type="number" value={form.items.jumlah} onChange={handleChange} required />

        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Pilih Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select name="metodeBayar" value={form.metodeBayar} onChange={handleChange} required>
          <option value="">Pilih Metode Pembayaran</option>
          {metodeBayarOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select name="statusBayar" value={form.statusBayar} onChange={handleChange} required>
          <option value="">Pilih Status Pembayaran</option>
          {statusBayarOptions.map((sb) => (
            <option key={sb} value={sb}>
              {sb}
            </option>
          ))}
        </select>

        <input name="tanggal" placeholder="Tanggal" type="date" value={form.tanggal} onChange={handleChange} required />

        <button type="submit">Tambah</button>
      </form>

      <ul>
        {penjualans.map((p) => (
          <li key={p._id}>
            {p.pelanggan.nama} - {p.items.nama} ({p.items.jumlah}) - {p.total}
            <button onClick={() => router.push(`/penjualan/${p._id}`)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}