export default function handler(req, res) {
  res.status(200).json( 
    [
      {
        "id": 1,
        "date": "2025-02-01",
        "product": "Batu Split 1/2",
        "quantity": 500,
        "unit_price": 100000,
        "total_amount": 50000000,
        "customer": "PT. Konstruksi Jaya",
        "payment_method": "Transfer Bank"
      },
      {
        "id": 2,
        "date": "2025-02-05",
        "product": "Abu Batu",
        "quantity": 300,
        "unit_price": 100000,
        "total_amount": 30000000,
        "customer": "PT. Beton Perkasa",
        "payment_method": "Tunai"
      },
      {
        "id": 3,
        "date": "2025-02-10",
        "product": "Batu Belah",
        "quantity": 750,
        "unit_price": 100000,
        "total_amount": 75000000,
        "customer": "CV. Sumber Makmur",
        "payment_method": "Transfer Bank"
      },
      {
        "id": 4,
        "date": "2025-02-15",
        "product": "Batu Pecah 3/4",
        "quantity": 400,
        "unit_price": 100000,
        "total_amount": 40000000,
        "customer": "PT. Mitra Bangun",
        "payment_method": "Kredit 30 Hari"
      },
      {
        "id": 5,
        "date": "2025-02-20",
        "product": "Batu Screening",
        "quantity": 600,
        "unit_price": 100000,
        "total_amount": 60000000,
        "customer": "CV. Cipta Karya",
        "payment_method": "Transfer Bank"
      },
      {
        "id": 6,
        "date": "2025-02-20",
        "product": "Abu Pasir",
        "quantity": 600,
        "unit_price": 100000,
        "total_amount": 60000000,
        "customer": "CV. Cipta Karya",
        "payment_method": "Transfer Bank"
      }
    ]
   );
}
