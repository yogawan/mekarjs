import { useState, useEffect } from "react";
import SidebarOrganism from "@/components/organisms/SidebarOrganism";
import axios from "axios";

const ExpensePage = () => {
  const [inventoryIn, setInventoryIn] = useState([]);
  const [inventoryOut, setInventoryOut] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inRes, outRes] = await Promise.all([
          axios.get("/api/dummy/inventory/in"),
          axios.get("/api/dummy/inventory/out"),
        ]);

        setInventoryIn(inRes.data);
        setInventoryOut(outRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SidebarOrganism />

      {/* Inventory Masuk */}
      <div className="ml-52">
        <h1 className="text-black text-xl ml-5 mb-2 mt-5">Barang Keluar</h1>
        <div className="flex justify-start flex-wrap">
            {inventoryOut.map((item, index) => (
              <div className="w-[300px] p-3 m-1 border border-black/15 rounded-3xl" key={index}>
                <p className="text-black text-xl">{item.nama_barang}</p>
                <p className="text-black text-xs">{item.keterangan}</p>
                <div className="mt-1 mb-1 border-t border-black/15"></div>
                <p className="text-black text-xs">Jumplah: {item.jumlah} {item.satuan}</p>
                <p className="text-black text-xs">Harga Satuan: Rp. {item.harga_satuan.toLocaleString()}</p>
                <p className="text-black text-xs">Total: Rp. {item.total_harga.toLocaleString()}</p>
                <p className="text-black text-xs">Vendor: {item.pembeli?.nama || "Tidak ada supplier"}</p>
                <p className="text-black text-xs">{item.pembeli?.kontak || "Tidak ada kontak"}</p>
                <p className="p-3 mt-3 text-xs bg-black text-white rounded-full text-center">{item.tanggal_keluar}</p>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ExpensePage;
