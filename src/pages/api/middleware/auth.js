export default function checkApiKey(handler) {
  return async (req, res) => {
    const apiKey = req.headers["x-api-key"];
    const validApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return res.status(403).json({ success: false, message: "Forbidden: Invalid API Key" });
    }

    return handler(req, res);
  };
}
