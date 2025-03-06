export default function handler(req, res) {
  res.status(200).json(
    {
      "total_income": 255000000,
      "total_expense": 88000000,
      "net_profit": 167000000,
      "profit_margin": 65.49
    }
  );
}
