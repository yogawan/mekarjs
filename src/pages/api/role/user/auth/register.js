import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  await connectDB();

  const { nama, email, kata_sandi, nomor_kendaraan } = req.body;

  if (!nama || !email || !kata_sandi) {
    return res.status(400).json({ success: false, message: "Harap isi semua field yang diperlukan" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(kata_sandi, 10);

    const newUser = new User({
      nama,
      email,
      kata_sandi: hashedPassword,
      nomor_kendaraan,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server", error: error.message });
  }
}
