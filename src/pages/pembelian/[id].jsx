// pages/pembelian/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/global/Sidebar";

export default function EditPembelian() {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    const res = await axios.get(`/api/role/admin/pembelian/${id}`);
    setForm(res.data);
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
            harga: selected ? selected.harga : 0
          }
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          items: {
            ...prev.items,
            [field]: field === "jumlah" || field === "harga" ? Number(value) : value
          }
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = form.items.jumlah * form.items.harga;

    await axios.put(`/api/role/admin/pembelian/${id}`, {
      ...form,
      total
    });

    router.push("/pembelian");
  };

  const handleDelete = async () => {
    await axios.delete(`/api/role/admin/pembelian/${id}`);
    router.push("/pembelian");
  };

  return (
    <div className="text-black ml-[256px]">
      <Sidebar />
      <h1>Edit Pembelian</h1>
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
          type="number"
          name="items.harga"
          placeholder="Harga"
          value={form.items.harga}
          readOnly
        />

        <input
          type="number"
          name="items.jumlah"
          placeholder="Jumlah"
          value={form.items.jumlah}
          onChange={handleChange}
        />

        <input name="metodeBayar" placeholder="Metode Bayar" value={form.metodeBayar} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Diproses">Diproses</option>
          <option value="Dikirim">Dikirim</option>
          <option value="Diterima">Diterima</option>
          <option value="Selesai">Selesai</option>
        </select>

        <select name="statusBayar" value={form.statusBayar} onChange={handleChange}>
          <option value="Belum Bayar">Belum Bayar</option>
          <option value="Sudah Bayar">Sudah Bayar</option>
        </select>

        <button type="submit">Simpan Perubahan</button>
      </form>

      <hr />
      <button onClick={handleDelete}>Hapus Pembelian</button>
    </div>
  );
}