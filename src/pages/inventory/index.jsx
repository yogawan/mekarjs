// import { useState, useEffect } from "react";
// import SidebarOrganism from "@/components/organisms/SidebarOrganism";
// import axios from "axios";

// const InventoryPage = () => {
//   const [inventoryIn, setInventoryIn] = useState([]);
//   const [inventoryOut, setInventoryOut] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [inRes, outRes] = await Promise.all([
//           axios.get("/api/inventory/in"),
//           axios.get("/api/inventory/out"),
//         ]);

//         setInventoryIn(inRes.data);
//         setInventoryOut(outRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <SidebarOrganism />

//       <h1>Inventory Management</h1>

//       {/* Inventory Masuk */}
//       <div className="ml-52">
//         <div className="flex justify-start flex-wrap">
//         {inventoryIn.map((item, index) => (
//               <div className="w-[300px] p-3 m-1 border border-black/15 rounded-3xl" key={index}>
//                 <p className="text-black text-xl">{item.nama_barang}</p>
//                 <p className="text-black text-xs">{item.keterangan}</p>
//                 <div className="mt-3 mb-3 border-t border-black/15"></div>
//                 <p className="text-black text-xs">Jumplah: {item.jumlah} {item.satuan}</p>
//                 <p className="text-black text-xs">Harga Satuan: Rp. {item.harga_satuan.toLocaleString()}</p>
//                 <p className="text-black text-xs">Total: Rp. {item.total_harga.toLocaleString()}</p>
//                 <p className="text-black text-xs">Vendor: {item.supplier?.nama || "Tidak ada supplier"}</p>
//                 <p className="text-black text-xs">{item.supplier?.kontak || "Tidak ada kontak"}</p>
//                 <p className="p- mt- text-xs bg-black text-white rounded-full text-center">{item.tanggal_masuk}</p>
//               </div>
//             ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default InventoryPage;
