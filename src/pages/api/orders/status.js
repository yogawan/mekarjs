// import connectDB from "../../../lib/mongodb";
// import Order from "../../../models/usersModel";
// import checkApiKey from "../../../middleware/auth";

// const handler = async (req, res) => {
//   await connectDB();

//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   try {
//     const { order_id } = req.query;

//     if (!order_id) {
//       return res.status(400).json({ success: false, message: "order_id diperlukan" });
//     }

//     const order = await Order.findOne({ _id: order_id });

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
//     }

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
//   }
// };

// export default checkApiKey(handler);
