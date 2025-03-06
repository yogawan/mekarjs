// import connectDB from "../../../lib/mongodb";
// import Order from "../../../models/ordersMaterial";
// import checkAuth from "../../../middleware/auth"

// export default checkAuth(async (req, res) => {
//   await connectDB();

//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
//   }

//   try {
//     const userId = req.user.id; // Ambil ID pengguna dari token JWT
//     const orders = await Order.find({ id_pengguna: userId }).populate("id_material");

//     if (!orders.length) {
//       return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
//     }

//     return res.status(200).json({ success: true, orders });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
//   }
// });
