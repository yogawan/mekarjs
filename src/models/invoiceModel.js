import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    id_pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: String, required: true, unique: true },
    transaction_id: { type: String, required: true },
    transaction_status: { type: String, required: true },
    transaction_time: { type: Date, required: true },
    settlement_time: { type: Date, default: null },
    payment_type: { type: String, required: true },
    va_numbers: [
      {
        va_number: { type: String, required: false },
        bank: { type: String, required: false },
      }
    ],
    gross_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    fraud_status: { type: String, required: true },
    expiry_time: { type: Date, required: true },
    signature_key: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
