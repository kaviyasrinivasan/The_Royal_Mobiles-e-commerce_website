import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("googlepay");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) navigate("/shipping");

  const handlePaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handlePaymentMethod}>
        <Form.Group>
          <Form.Label as="label">Select method</Form.Label>
        </Form.Group>

        <Col>
          <Form.Group>
            <Form.Check
              type="radio"
              label="Google pay / upi"
              id="Googlepay"
              value="Googlepay"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
        </Col>

        {/* <Col>
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            value="Stripe"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col> */}

        <Button className="mt-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
// import { QRCodeCanvas } from "qrcode.react";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { createOrder } from "../redux/actions/orderActions";

// const PaymentScreen = () => {
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
//   const merchantName = "Mobile Shop";
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

// export default PaymentScreen;