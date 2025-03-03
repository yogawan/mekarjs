import connectDB from "../../../lib/mongodb";
import User from "../../../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  await connectDB();

  const { email, kata_sandi } = req.body;

  if (!email || !kata_sandi) {
    return res.status(400).json({ success: false, message: "Harap isi semua bidang yang diperlukan" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email atau kata sandi salah" });
    }

    const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Email atau kata sandi salah" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token berlaku selama 7 hari
    );

    res.status(200).json({ success: true, message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server", error: error.message });
  }
}
