import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Sidebar from "@/components/global/Sidebar";

export default function InventarisList() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    kodeItem: "",
    namaItem: "",
    tipe: "Alat Berat",
    deskripsi: "",
    jumlah: 0,
    satuan: "",
    lokasi: "",
    kondisi: "Baik"
  });

  const fetchData = async () => {
    const res = await axios.get("/api/role/admin/inventaris");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/role/admin/inventaris", form);
    setForm({
      kodeItem: "",
      namaItem: "",
      tipe: "Alat Berat",
      deskripsi: "",
      jumlah: 0,
      satuan: "",
      lokasi: "",
      kondisi: "Baik"
    });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/role/admin/inventaris/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-black ml-[256px]">
      <Sidebar />
      <h1>Inventaris</h1>

      <form onSubmit={handleSubmit}>
        <input name="kodeItem" placeholder="Kode Item" value={form.kodeItem} onChange={handleChange} required />
        <input name="namaItem" placeholder="Nama Item" value={form.namaItem} onChange={handleChange} required />
        <select name="tipe" value={form.tipe} onChange={handleChange}>
          <option>Alat Berat</option>
          <option>Sparepart</option>
          <option>Bahan Baku</option>
          <option>ATK</option>
          <option>Lainnya</option>
        </select>
        <input name="deskripsi" placeholder="Deskripsi" value={form.deskripsi} onChange={handleChange} />
        <input name="jumlah" type="number" placeholder="Jumlah" value={form.jumlah} onChange={handleChange} required />
        <input name="satuan" placeholder="Satuan" value={form.satuan} onChange={handleChange} required />
        <input name="lokasi" placeholder="Lokasi" value={form.lokasi} onChange={handleChange} required />
        <select name="kondisi" value={form.kondisi} onChange={handleChange}>
          <option>Baik</option>
          <option>Rusak</option>
          <option>Perlu Perawatan</option>
        </select>
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>{item.kodeItem} - {item.namaItem} ({item.jumlah} {item.satuan})</p>
            <Link href={`/inventaris/${item._id}`}>Edit</Link>
            <button onClick={() => handleDelete(item._id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}