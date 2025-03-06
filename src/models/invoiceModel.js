import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true }, // ID Order dari Midtrans
    transaction_id: { type: String, required: true }, // ID Transaksi dari Midtrans
    transaction_status: { type: String, required: true }, // Status pembayaran (settlement, pending, dll)
    transaction_time: { type: Date, required: true }, // Waktu transaksi
    settlement_time: { type: Date }, // Waktu penyelesaian pembayaran
    payment_type: { type: String, required: true }, // Metode pembayaran (bank_transfer, gopay, dll)
    va_number: { type: String }, // Virtual Account (jika pembayaran bank transfer)
    bank: { type: String }, // Nama bank (jika bank transfer)
    gross_amount: { type: Number, required: true }, // Total jumlah pembayaran
    currency: { type: String, required: true }, // Mata uang (IDR)
    fraud_status: { type: String, required: true }, // Status fraud (accept, deny, challenge)
    expiry_time: { type: Date }, // Waktu kadaluarsa pembayaran
  },
  { timestamps: true } // Auto generate createdAt dan updatedAt
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
