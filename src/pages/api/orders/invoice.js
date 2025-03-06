// import connectDB from "../../../lib/mongodb";
// import Invoice from "../../../models/invoiceModel"; // ✅ Gunakan model Invoice
// import { verifyToken } from "../../../middleware/auth";

// async function handler(req, res) {
//   await connectDB();

//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
//   }

//   try {
//     const id_pengguna = req.user.id; // ✅ Ambil ID pengguna dari token JWT

//     // ✅ Cari semua invoice berdasarkan ID pengguna
//     const invoices = await Invoice.find({ id_pengguna }).select(
//       "order_id transaction_status gross_amount currency payment_type transaction_time"
//     );

//     if (invoices.length === 0) {
//       return res.status(404).json({ success: false, message: "Tidak ada invoice untuk pengguna ini" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Daftar invoice ditemukan",
//       data: invoices
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
//   }
// }

// // ✅ Gunakan middleware JWT untuk mengambil ID pengguna dari token
// export default verifyToken(handler);
