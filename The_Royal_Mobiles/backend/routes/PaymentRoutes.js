import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
router.post('/orders', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Order creation failed' });
  }
});

// Verify payment signature
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (expectedSign === razorpay_signature) {
    res.status(200).json({ message: 'Payment verified' });
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
});

export default router;
