import connectDB from "../../../../../lib/mongodb";
import Material from "../../../../../models/materialModel";
import Order from "../../../../../models/orderModel";
import User from "../../../../../models/userModel";
import { verifyToken } from "../../../../../middleware/auth";

async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }

  try {
    const id_pengguna = req.user?.id;
    const { id_material, jumlah } = req.body;

    if (!id_pengguna) {
      return res.status(401).json({ success: false, message: "Pengguna tidak terautentikasi" });
    }

    if (!id_material || jumlah <= 0) {
      return res.status(400).json({ success: false, message: "ID material atau jumlah tidak valid" });
    }

    const material = await Material.findById(id_material);
    if (!material) {
      return res.status(404).json({ success: false, message: "Material tidak ditemukan" });
    }

    const user = await User.findById(id_pengguna);
    if (!user) {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan" });
    }

    const total_harga = jumlah * material.harga_per_ton;
    const order_id = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const midtransServerKey = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString("base64");

    const midtransResponse = await fetch("https://api.sandbox.midtrans.com/v1/payment-links", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${midtransServerKey}`
      },
      body: JSON.stringify({
        transaction_details: {
          order_id,
          gross_amount: total_harga
        },
        item_details: [
          {
            id: id_material,
            name: material.nama,
            price: material.harga_per_ton,
            quantity: jumlah
          }
        ],
        customer_details: {
          first_name: user.nama,
          email: user.email
        }
      })
    });

    const paymentData = await midtransResponse.json();

    let payment_url = paymentData.payment_url;
    if (!payment_url && paymentData.actions && paymentData.actions.length > 1) {
      payment_url = paymentData.actions[1].url;
    }
    if (!payment_url) {
      console.error("Gagal mendapatkan Payment Link dari Midtrans:", paymentData);
      return res.status(400).json({ success: false, message: "Gagal mendapatkan tautan pembayaran" });
    }

    const newOrder = new Order({
      order_id,
      id_pengguna,
      id_material,
      jumlah,
      total_harga,
      tautan_bayar: paymentData.payment_url
    });

    try {
      await newOrder.save();
      console.log("Order berhasil disimpan ke MongoDB");
    } catch (error) {
      console.error("Gagal menyimpan order:", error);
    }

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      data: newOrder
    });

  } catch (error) {
    console.error("Error saat membuat pesanan:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan", error: error.message });
  }
}

export default verifyToken(handler);
