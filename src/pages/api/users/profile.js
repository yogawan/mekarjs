import connectDB from "../../../lib/mongodb";
import User from "../../../models/userModel";
import checkAuth from "../middleware/auth";

const handler = async (req, res) => {
  await connectDB();

  const user = await User.findById(req.user.userId).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User tidak ditemukan" });
  }

  return res.status(200).json({ success: true, user });
};

export default checkAuth(handler);
