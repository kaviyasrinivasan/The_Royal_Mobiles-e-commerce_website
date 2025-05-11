// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { createOrder } from "../redux/actions/orderActions";

// const PlaceOrderScreen = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   const { order, success, error } = useSelector((state) => state.orderCreate);

//   const addDecimals = (num) => {
//     return (Math.round(num * 100) / 100).toFixed(2);
//   };

//   cart.itemsPrice = addDecimals(
//     cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

//   cart.taxPrice = addDecimals(Number((0.09 * cart.itemsPrice).toFixed(2)));

//   cart.totalPrice = (
//     Number(cart.itemsPrice) +
//     Number(cart.shippingPrice) +
//     Number(cart.taxPrice)
//   ).toFixed(2);

//   useEffect(() => {
//     if (success) navigate(`/order/${order._id}`);
//   }, [dispatch, success, order?._id, navigate]);

//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         taxPrice: cart.taxPrice,
//         shippingPrice: cart.shippingPrice,
//         totalPrice: cart.totalPrice,
//       })
//     );
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             {error && (
//               <ListGroup.Item>
//                 <Message variant="danger">{error}</Message>
//               </ListGroup.Item>
//             )}
//             <ListGroup.Item>
//               <h4>Shipping</h4>
//               <strong>Address:</strong>
//               <p>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                 {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h4>Payment Method</h4>
//               <strong>Method : </strong>
//               {cart.paymentMethod}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h4>Order Items</h4>
//               {cart.cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <>
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x &#8377;{item.price} = &#8377;{item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h4>Order Summary</h4>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>&#8377;{cart.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>&#8377;{cart.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>&#8377;{cart.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>&#8377;{cart.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Button
//                   className="w-100"
//                   variant="primary"
//                   disabled={cart.cartItems.length === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   PLACE ORDER
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default PlaceOrderScreen;



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import { QRCodeCanvas } from "qrcode.react";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { createOrder } from "../redux/actions/orderActions";

// const PlaceOrderScreen = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const { order, success, error } = useSelector((state) => state.orderCreate);

//   // State to track if payment is confirmed
//   const [paymentConfirmed, setPaymentConfirmed] = useState(false);

//   const addDecimals = (num) => {
//     return (Math.round(num * 100) / 100).toFixed(2);
//   };

//   cart.itemsPrice = addDecimals(
//     cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

//   cart.taxPrice = addDecimals(Number((0.09 * cart.itemsPrice).toFixed(2)));

//   cart.totalPrice = (
//     Number(cart.itemsPrice) +
//     Number(cart.shippingPrice) +
//     Number(cart.taxPrice)
//   ).toFixed(2);

//   useEffect(() => {
//     if (success) {
//       navigate(`/order/${order._id}`);
//     }
//   }, [dispatch, success, order?._id, navigate]);

//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         taxPrice: cart.taxPrice,
//         shippingPrice: cart.shippingPrice,
//         totalPrice: cart.totalPrice,
//       })
//     );
//   };

//   const confirmPaymentHandler = () => {
//     setPaymentConfirmed(true);
//     placeOrderHandler();
//   };

//   // UPI deep link for Google Pay
//   const upiId = "kaviyasrini2004@okaxis";
//   const merchantName = "The Royal Mobile Shop";
//   const upiLink = cart.totalPrice
//     ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
//         merchantName
//       )}&am=${cart.totalPrice}&cu=INR&tn=${encodeURIComponent(
//         "Mobile Shop Order"
//       )}`
//     : "";

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             {error && (
//               <ListGroup.Item>
//                 <Message variant="danger">{error}</Message>
//               </ListGroup.Item>
//             )}
//             <ListGroup.Item>
//               <h4>Shipping</h4>
//               <strong>Address:</strong>
//               <p>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                 {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h4>Payment Method</h4>
//               <strong>Method: </strong>
//               {cart.paymentMethod}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h4>Order Items</h4>
//               {cart.cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <>
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h4>Order Summary</h4>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>₹{cart.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>₹{cart.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>₹{cart.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>₹{cart.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <div style={{ textAlign: "center" }}>
//                   <h5>Pay with Google Pay</h5>
//                   {upiLink ? (
//                     <QRCodeCanvas
//                       value={upiLink}
//                       size={200}
//                       level="H"
//                       includeMargin={true}
//                     />
//                   ) : (
//                     <p>Loading payment QR code...</p>
//                   )}
//                   <p>Scan with Google Pay or any UPI app</p>
//                   {upiLink && (
//                     <a
//                       href={upiLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ display: "block", marginTop: "10px" }}
//                     >
//                       Open in Google Pay
//                     </a>
//                   )}
//                   <Button
//                     className="w-100"
//                     variant="success"
//                     disabled={cart.cartItems.length === 0 || paymentConfirmed}
//                     onClick={confirmPaymentHandler}
//                     style={{ marginTop: "20px" }}
//                   >
//                     Confirm Payment
//                   </Button>
//                 </div>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default PlaceOrderScreen;

























import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card, Form, Alert } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../redux/actions/orderActions";
import axios from "axios";

const PlaceOrderScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { order, success, error } = useSelector((state) => state.orderCreate);

  // State to track transaction ID, verification status, and payment success message
  const [transactionId, setTransactionId] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

  cart.taxPrice = addDecimals(Number((0.09 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success && showSuccessMessage) {
      // Delay redirection to show the success message for 3 seconds
      cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
      //return () => clearTimeout(timer);
    }
  }, [success, showSuccessMessage, order?._id, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        transactionId: transactionId,
      })
    );
  };

  const verifyPaymentHandler = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationError("");

    try {
      // Replace with your actual backend endpoint to verify the UPI transaction
      const response = await axios.post("/api/payment/verify-upi", {
        transactionId: transactionId,
        amount: cart.totalPrice,
      });

      if (response.data.success) {
        setPaymentVerified(true);
        setShowSuccessMessage(true); // Show the success message
        placeOrderHandler(); // Create the order
      } else {
        setVerificationError("Payment verification failed. Please check the transaction ID.");
      }
    } catch (err) {
      setVerificationError("Error verifying payment. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // UPI deep link for Google Pay
  const upiId = "kaviyasrini2004@okaxis";
  const merchantName = "The Royal Mobile Shop";
  const upiLink = cart.totalPrice
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
        merchantName
      )}&am=${cart.totalPrice}&cu=INR&tn=${encodeURIComponent(
        "Mobile Shop Order"
      )}`
    : "";

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h4>Shipping</h4>
              <strong>Address:</strong>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div style={{ textAlign: "center" }}>
                  {showSuccessMessage ? (
                    <>
                      <Alert variant="success">
                        Payment Successful!
                      </Alert>
                      <p>Redirecting to order details in a few seconds...</p>
                      <Button
                        className="w-100"
                        variant="primary"
                        onClick={() => navigate(`/order/${order._id}`)}
                        style={{ marginTop: "10px" }}
                      >
                        Go to Order Details
                      </Button>
                    </>
                  ) : (
                    <>
                      <h5>Pay with Google Pay</h5>
                      {upiLink ? (
                        <QRCodeCanvas
                          value={upiLink}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      ) : (
                        <p>Loading payment QR code...</p>
                      )}
                      <p>Scan with Google Pay or any UPI app</p>
                      {upiLink && (
                        <a
                          href={upiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", marginTop: "10px" }}
                        >
                          Open in Google Pay
                        </a>
                      )}
                      <Form onSubmit={verifyPaymentHandler} style={{ marginTop: "20px" }}>
                        <Form.Group controlId="transactionId">
                          <Form.Label>Enter Transaction ID</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter UPI Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            disabled={paymentVerified || isVerifying}
                            required
                          />
                        </Form.Group>
                        {verificationError && (
                          <Alert variant="danger" style={{ marginTop: "10px" }}>
                            {verificationError}
                          </Alert>
                        )}
                        <Button
                          className="w-100"
                          variant="success"
                          type="submit"
                          disabled={cart.cartItems.length === 0 || paymentVerified || isVerifying}
                          style={{ marginTop: "10px" }}
                        >
                          {isVerifying ? "Verifying..." : "Verify Payment & Place Order"}
                        </Button>
                      </Form>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

// import React, { useState } from "react";
// import { Button, Form, Alert, Card, ListGroup, Col, Row } from "react-bootstrap";
// import { QRCodeCanvas } from "qrcode.react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createOrder } from "../redux/actions/orderActions";
// import Message from "../components/Message";

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const { order, success, error } = useSelector((state) => state.orderCreate);

//   // State for transaction ID, verification status, and messages
//   const [transactionId, setTransactionId] = useState("");
//   const [paymentVerified, setPaymentVerified] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [verificationError, setVerificationError] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);

//   // UPI deep link for Google Pay
//   const upiId = "kaviyasrini2004@okaxis";
//   const merchantName = "Mobile Shop";
//   const upiLink = cart.totalPrice
//     ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
//         merchantName
//       )}&am=${cart.totalPrice}&cu=INR&tn=${encodeURIComponent(
//         "Mobile Shop Order"
//       )}`
//     : "";

//   // Handle order creation after payment verification
//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         taxPrice: cart.taxPrice,
//         shippingPrice: cart.shippingPrice,
//         totalPrice: cart.totalPrice,
//         transactionId: transactionId,
//       })
//     );
//   };

//   // Verify payment
//   const verifyPaymentHandler = async (e) => {
//     e.preventDefault();
//     setIsVerifying(true);
//     setVerificationError("");

//     try {
//       const response = await axios.post("/api/payment/verify-upi", {
//         transactionId: transactionId,
//         amount: cart.totalPrice,
//       });

//       if (response.data.success) {
//         setPaymentVerified(true);
//         setShowSuccessMessage(true);
//         placeOrderHandler();
//       } else {
//         setVerificationError("Payment verification failed. Please check the transaction ID.");
//       }
//     } catch (err) {
//       setVerificationError("Error verifying payment. Please try again.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   // Redirect to order details after success
//   React.useEffect(() => {
//     if (success && showSuccessMessage) {
//       const timer = setTimeout(() => {
//         navigate(`/order/${order._id}`);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, showSuccessMessage, order?._id, navigate]);

//   return (
//     <Row className="justify-content-md-center">
//       <Col md={6}>
//         <Card>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h4>Complete Your Payment</h4>
//               {error && <Message variant="danger">{error}</Message>}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <div style={{ textAlign: "center" }}>
//                 {showSuccessMessage ? (
//                   <>
//                     <Alert variant="success">Payment Successful!</Alert>
//                     <p>Redirecting to order details in a few seconds...</p>
//                     <Button
//                       className="w-100"
//                       variant="primary"
//                       onClick={() => navigate(`/order/${order._id}`)}
//                       style={{ marginTop: "10px" }}
//                     >
//                       Go to Order Details
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <h5>Pay with Google Pay</h5>
//                     {upiLink ? (
//                       <QRCodeCanvas
//                         value={upiLink}
//                         size={200}
//                         level="H"
//                         includeMargin={true}
//                       />
//                     ) : (
//                       <p>Loading payment QR code...</p>
//                     )}
//                     <p>Scan with Google Pay or any UPI app</p>
//                     {upiLink && (
//                       <a
//                         href={upiLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ display: "block", marginTop: "10px" }}
//                       >
//                         Open in Google Pay
//                       </a>
//                     )}
//                     <Form onSubmit={verifyPaymentHandler} style={{ marginTop: "20px" }}>
//                       <Form.Group controlId="transactionId">
//                         <Form.Label>Enter Transaction ID</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter UPI Transaction ID"
//                           value={transactionId}
//                           onChange={(e) => setTransactionId(e.target.value)}
//                           disabled={paymentVerified || isVerifying}
//                           required
//                         />
//                       </Form.Group>
//                       {verificationError && (
//                         <Alert variant="danger" style={{ marginTop: "10px" }}>
//                           {verificationError}
//                         </Alert>
//                       )}
//                       <Button
//                         className="w-100"
//                         variant="success"
//                         type="submit"
//                         disabled={cart.cartItems.length === 0 || paymentVerified || isVerifying}
//                         style={{ marginTop: "10px" }}
//                       >
//                         {isVerifying ? "Verifying..." : "Verify Payment & Place Order"}
//                       </Button>
//                     </Form>
//                   </>
//                 )}
//               </div>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default PlaceOrderScreen;