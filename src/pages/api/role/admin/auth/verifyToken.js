import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak tersedia" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Token valid" });
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}
