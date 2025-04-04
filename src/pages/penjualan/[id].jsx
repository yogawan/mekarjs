// pages/penjualan/[id].js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditPenjualan() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState(null);

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

  const statusOptions = ["Pending", "Diproses", "Selesai"];
  const metodeBayarOptions = ["Tunai", "Transfer Bank", "QRIS"];
  const statusBayarOptions = ["Belum Bayar", "Sudah Bayar"];

  useEffect(() => {
    if (!id) return;
    fetch(`/api/role/admin/penjualan/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data.data));
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const total = form.items.jumlah * form.items.harga;
    const res = await fetch(`/api/role/admin/penjualan/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, total }),
    });

    if (res.ok) {
      router.push("/penjualan");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form className="text-black" onSubmit={handleUpdate}>
      <h3>Edit Penjualan</h3>

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

      <input name="items.jumlah" placeholder="Jumlah" type="number" value={form.items.jumlah} onChange={handleChange} required />
      <input name="items.harga" placeholder="Harga" type="number" value={form.items.harga} readOnly />

      <select name="status" value={form.status} onChange={handleChange} required>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select name="metodeBayar" value={form.metodeBayar} onChange={handleChange} required>
        {metodeBayarOptions.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select name="statusBayar" value={form.statusBayar} onChange={handleChange} required>
        {statusBayarOptions.map((sb) => (
          <option key={sb} value={sb}>
            {sb}
          </option>
        ))}
      </select>

      <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} required />

      <button type="submit">Update</button>
    </form>
  );
}