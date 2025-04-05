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
      <h1 className="ml-5 mt-5">Daftar Pembelian</h1>

      <form className="flex" onSubmit={handleSubmit}>

        <div className="flex flex-col w-[50%] p-1">
          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            name="supplier.nama"
            placeholder="Nama Supplier"
            value={form.supplier.nama}
            onChange={handleChange}
          />

          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            name="supplier.email"
            placeholder="Email"
            value={form.supplier.email}
            onChange={handleChange}
          />

          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            name="supplier.telepon"
            placeholder="Telepon"
            value={form.supplier.telepon}
            onChange={handleChange}
          />

          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            name="supplier.alamat"
            placeholder="Alamat"
            value={form.supplier.alamat}
            onChange={handleChange}
          />

          <select className="mt-1 p-3 border border-black/15 bg-background rounded-full" name="items.nama" value={form.items.nama} onChange={handleChange} required>
            <option value="">Pilih Material</option>
            {materialOptions.map((m) => (
              <option key={m.nama} value={m.nama}>
                {m.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-[50%] p-1">
          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            name="items.harga"
            placeholder="Harga"
            type="number"
            value={form.items.harga}
            readOnly
          />

          <input
            className="mt-1 p-3 border border-black/15 bg-background rounded-full"
            type="number"
            name="items.jumlah"
            min="1"
            placeholder="Jumlah"
            value={form.items.jumlah}
            onChange={handleChange}
          />

          <select className="mt-1 p-3 border border-black/15 bg-background rounded-full" name="metodeBayar" value={form.metodeBayar} onChange={handleChange} required>
            <option value="">Pilih Metode Bayar</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="Tunai">Tunai</option>
            <option value="QRIS">QRIS</option>
          </select>

          <select className="mt-1 p-3 border border-black/15 bg-background rounded-full" name="statusBayar" value={form.statusBayar} onChange={handleChange} required>
            <option value="Belum Bayar">Belum Bayar</option>
            <option value="Sudah Bayar">Sudah Bayar</option>
          </select>

          <button className="mt-1 p-3 bg-black text-white rounded-full" type="submit">Tambah</button>
        </div>

      </form>

      <br />

      <div className="flex justify-start flex-wrap">
        {data.map((item) => (
          <div className="w-[385px] m-1 p-3 rounded-3xl border border-black/15" key={item._id}>
            <div className="border-b border-black/15">
              <p className="">{item.supplier.nama}</p>
              <p className="">{item.supplier.email}</p>
              <p className="">{item.supplier.telepon}</p>
              <p className="">{item.supplier.alamat}</p>
            </div>
            <div className="border-b border-black/15">
              <p className="">{item.items.nama}</p>
              <p className="">{item.items.harga}</p>
              <p className="">{item.items.jumlah}</p>
            </div>
            <div className="">
              <p className="">{item.metodeBayar}</p>
              <p className="">{item.statusBayar}</p>
              <p className="">{item.status}</p>
              <p className="">{item.total}</p>
              <p className="">{item.tanggal}</p>
            </div>

            <div className="flex justify-center">
              <button className="w-full p-3 bg-black text-white rounded-full" onClick={() => router.push(`/pembelian/${item._id}`)}>Detail</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}