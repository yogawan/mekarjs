import connectDB from "../../lib/mongodb";
import Invoice from "../../models/invoiceModel";
import Order from "../../models/ordersMaterial"; // Pastikan model Order diimport

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB(); // Pastikan koneksi database berhasil
    const data = req.body;

    console.log("✅ Data diterima dari Midtrans:", data);

    // 🔥 Cari order berdasarkan order_id yang diterima
    const order = await Order.findOne({ order_id: data.order_id });

    if (!order) {
      console.log("🚨 Order tidak ditemukan untuk order_id:", data.order_id);
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    console.log("✅ Order ditemukan:", order);

    const id_pengguna = order.id_pengguna; // Ambil id_pengguna dari order

    // 🔍 Cek apakah invoice sudah ada
    let invoice = await Invoice.findOne({ order_id: data.order_id });

    if (invoice) {
      // ✅ Jika invoice sudah ada, update statusnya
      invoice.transaction_status = data.transaction_status;
      invoice.settlement_time = data.settlement_time ? new Date(data.settlement_time) : invoice.settlement_time;
      invoice.fraud_status = data.fraud_status;

      await invoice.save();
      console.log("✅ Invoice diperbarui:", invoice);

      return res.status(200).json({ success: true, message: "Status pembayaran diperbarui" });
    }

    // ✅ Jika invoice belum ada, buat baru
    invoice = new Invoice({
      id_pengguna, // ✅ Simpan ID Pengguna
      order_id: data.order_id,
      transaction_id: data.transaction_id,
      transaction_status: data.transaction_status,
      transaction_time: new Date(data.transaction_time),
      settlement_time: data.settlement_time ? new Date(data.settlement_time) : null,
      payment_type: data.payment_type,
      va_number: data.va_numbers?.[0]?.va_number || null,
      bank: data.va_numbers?.[0]?.bank || null,
      gross_amount: parseFloat(data.gross_amount),
      currency: data.currency,
      fraud_status: data.fraud_status,
      expiry_time: new Date(data.expiry_time),
    });

    await invoice.save();
    console.log("✅ Invoice baru disimpan:", invoice);

    return res.status(200).json({ success: true, message: "Webhook diterima dan invoice disimpan" });
  } catch (error) {
    console.error("🚨 Error di webhook:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
