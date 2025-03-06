export default function handler(req, res) {
  res.status(200).json({
    "footer": [
      {
        "title": "PT. Mekar Jaya Sejahtera",
        "links": [
          {
            "label": "Tentang Kami",
            "href": "#about"
          },
          {
            "label": "Visi & Misi",
            "href": "#vision-mission"
          },
          {
            "label": "Karier",
            "href": "#career"
          },
          {
            "label": "Hubungi Kami",
            "href": "#contact"
          }
        ]
      },
      {
        "title": "Layanan Kami",
        "links": [
          {
            "label": "Penggilingan Batu",
            "href": "#stone-crushing"
          },
          {
            "label": "Pasokan Material",
            "href": "#material-supply"
          },
          {
            "label": "Konstruksi & Infrastruktur",
            "href": "#construction"
          },
          {
            "label": "Layanan Logistik",
            "href": "#logistics"
          }
        ]
      },
      {
        "title": "Produk",
        "links": [
          {
            "label": "Batu Split",
            "href": "#batu-split"
          },
          {
            "label": "Abu Batu",
            "href": "#abu-batu"
          },
          {
            "label": "Sirtu",
            "href": "#sirtu"
          },
          {
            "label": "Screening",
            "href": "#screening"
          }
        ]
      },
      {
        "title": "Industri & Partner",
        "links": [
          {
            "label": "Proyek Infrastruktur",
            "href": "#infra-projects"
          },
          {
            "label": "Kontraktor",
            "href": "#contractors"
          },
          {
            "label": "Developer",
            "href": "#developers"
          },
          {
            "label": "Supplier Material",
            "href": "#suppliers"
          }
        ]
      },
      {
        "title": "Sosial Media",
        "links": [
          {
            "label": "LinkedIn",
            "href": "https://linkedin.com/company/mekarjayasejahtera"
          },
          {
            "label": "Instagram",
            "href": "https://instagram.com/mekarjayasejahtera"
          },
          {
            "label": "Facebook",
            "href": "https://facebook.com/mekarjayasejahtera"
          }
        ]
      }
    ]
  });
}
