import mongoose from "mongoose";

const TransactionLogSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, index: true },
    transaction_id: { type: String, required: true },
    transaction_status: { type: String, required: true },
    settlement_time: { type: Date, default: null },
    payment_type: { type: String, required: true },
    va_number: { type: String, default: null },
    bank: { type: String, default: null },
    gross_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    fraud_status: { type: String, required: true },
    expiry_time: { type: Date, required: true },
    raw_callback: { type: mongoose.Schema.Types.Mixed, required: true }, // Simpan full JSON dari Midtrans
  },
  { timestamps: true }
);

export default mongoose.models.TransactionLog || mongoose.model("TransactionLog", TransactionLogSchema);
