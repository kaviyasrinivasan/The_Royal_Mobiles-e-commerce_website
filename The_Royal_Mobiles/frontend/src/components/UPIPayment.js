import React, { useState } from "react";
import axios from "axios";

const UPIPayment = () => {
  const [qr, setQr] = useState(null);
  const [upiLink, setUpiLink] = useState("");

  const handleGenerateQR = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/upi/generate", {
        upiId: "yourupiid@okaxis",  // Replace with your UPI ID
        name: "Kaviya Srinivasan",
        amount: 150, // Total amount
      });
      setQr(data.qr);
      setUpiLink(data.upiLink);
    } catch (error) {
      console.error("Error generating UPI QR:", error);
    }
  };

  return (
    <div className="text-center mt-4">
      <h2>Pay via UPI</h2>
      <button onClick={handleGenerateQR} className="btn btn-primary my-2">
        Generate UPI QR
      </button>
      {qr && (
        <>
          <img src={qr} alt="UPI QR Code" style={{ width: 250, height: 250 }} />
          <p>Or use UPI link: <a href={upiLink}>{upiLink}</a></p>
        </>
      )}
    </div>
  );
};

export default UPIPayment;
