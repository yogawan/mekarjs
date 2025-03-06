import jwt from "jsonwebtoken";

export function verifyToken(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Akses ditolak, token tidak ditemukan" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return res.status(403).json({ success: false, message: "Token tidak valid" });
    }
  };
}
