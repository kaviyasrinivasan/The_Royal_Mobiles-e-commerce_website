import express from "express";
import QRCode from "qrcode";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { upiId, name, amount } = req.body;

  if (!upiId || !amount || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&cu=INR`;

  try {
    const qr = await QRCode.toDataURL(upiLink);
    res.status(200).json({ qr, upiLink });
  } catch (error) {
    console.error("QR Generation Error:", error);
    res.status(500).json({ message: "Failed to generate QR code" });
  }
});

export default router;
