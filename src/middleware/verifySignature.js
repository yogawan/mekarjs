import crypto from 'crypto';

export function verifySignature(data) {
  const { signature_key, order_id, gross_amount } = data;
  const key = process.env.MIDTRANS_SERVER_KEY;  // Pastikan Anda sudah memiliki MIDTRANS_SERVER_KEY di environment variables
  const stringToSign = `${order_id}|${gross_amount}|${key}`;
  
  const hash = crypto.createHash('sha512').update(stringToSign).digest('hex');
  
  // Bandingkan signature yang diterima dengan signature yang dihitung
  return hash === signature_key;
}
