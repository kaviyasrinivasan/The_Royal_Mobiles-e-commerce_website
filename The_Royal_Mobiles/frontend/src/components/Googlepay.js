import React from 'react';
import QRCode from 'qrcode.react';

const Googlepay = () => {
  const totalAmount = 1000; // Replace with dynamic total
  const upiId = 'yourbusiness@okhdfcbank'; // Your UPI ID
  const merchantName = 'Your Business Name';
  const transactionNote = 'Payment for order';

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Pay ₹{totalAmount} via Google Pay</h2>
      <QRCode value={upiLink} size={256} level="H" includeMargin={true} />
      <p>Scan with Google Pay or any UPI app to pay.</p>
      <a href={upiLink} target="_blank" rel="noopener noreferrer">
        Open in Google Pay
      </a>
    </div>
  );
};

export default Googlepay;