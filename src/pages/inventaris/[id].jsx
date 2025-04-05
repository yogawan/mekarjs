import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/global/Sidebar";

export default function EditInventaris() {
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    if (id) {
      axios.get(`/api/role/admin/inventaris/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/role/admin/inventaris/${id}`, form);
    router.push("/inventaris");
  };

  return (
    <div className="text-black ml-[256px]">
      <Sidebar />
      <h1>Edit Inventaris</h1>

      <form onSubmit={handleSubmit}>
        <input name="kodeItem" value={form.kodeItem} onChange={handleChange} required />
        <input name="namaItem" value={form.namaItem} onChange={handleChange} required />
        <select name="tipe" value={form.tipe} onChange={handleChange}>
          <option>Alat Berat</option>
          <option>Sparepart</option>
          <option>Bahan Baku</option>
          <option>ATK</option>
          <option>Lainnya</option>
        </select>
        <input name="deskripsi" value={form.deskripsi} onChange={handleChange} />
        <input name="jumlah" type="number" value={form.jumlah} onChange={handleChange} required />
        <input name="satuan" value={form.satuan} onChange={handleChange} required />
        <input name="lokasi" value={form.lokasi} onChange={handleChange} required />
        <select name="kondisi" value={form.kondisi} onChange={handleChange}>
          <option>Baik</option>
          <option>Rusak</option>
          <option>Perlu Perawatan</option>
        </select>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}