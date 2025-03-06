import connectDB from "../../lib/mongodb";
import Invoice from "../../models/invoiceModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB(); // Koneksi ke database
    const data = req.body;

    // Cek apakah order_id sudah ada di database
    const existingInvoice = await Invoice.findOne({ order_id: data.order_id });
    if (existingInvoice) {
      return res.status(400).json({ success: false, message: "Invoice sudah ada" });
    }

    // Simpan invoice ke database
    const invoice = new Invoice({
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
    console.log("Invoice berhasil disimpan!");

    return res.status(200).json({ success: true, message: "Webhook diterima dan invoice disimpan" });
  } catch (error) {
    console.error("Error di webhook:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
