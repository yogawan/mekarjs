import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  nik: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String }
  },
  department: {
    type: String,
    enum: ["HR", "Finance", "Sales", "Production", "IT", "Logistics"],
    required: true
  },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  bank_account: {
    bank_name: String,
    account_number: String
  },
  join_date: { type: Date, required: true },
  status: { type: String, enum: ["active", "resigned"], default: "active" },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);