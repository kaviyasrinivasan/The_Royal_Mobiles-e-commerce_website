// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PayPalButton } from "react-paypal-button-v2";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
// import Loading from "../components/Loading";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from "../redux/actions/orderActions";

// const OrderScreen = () => {
//   let params = useParams();
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [sdkReady, setSdkReady] = useState(false);

//   const { order, loading, error } = useSelector((state) => state.orderDetails);

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const { loading: loadingPay, success: successPay } = useSelector(
//     (state) => state.orderPay
//   );

//   const {
//     loading: loadingDeliverd,
//     error: errorDeliverd,
//     success: successDeliverd,
//   } = useSelector((state) => state.orderDeliver);

//   if (!loading) {
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }

//   useEffect(() => {
//     const addPaypalScript = async () => {
//       const { data: clientId } = await axios.get("/api/config/paypal");
//       const script = document.createElement("script");
//       script.type = "text/javascript";
//       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//       script.async = true;
//       script.onload = () => {
//         setSdkReady(true);
//       };
//       document.body.appendChild(script);
//     };
//     if (!order || successPay) {
//       dispatch(getOrderDetails(params.id));
//     } else if (!order.isPaid) {
//       if (!window.paypal) {
//         addPaypalScript();
//       } else {
//         setSdkReady(true);
//       }
//     }
//     dispatch(getOrderDetails(params.id));
//   }, [dispatch, successPay, params.id, successDeliverd]);

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(params.id, paymentResult));
//   };

//   const deliverHandler = () => {
//     dispatch(deliverOrder(params.id));
//   };

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       {loading ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           <h1>Order #{order._id}</h1>
//           <Row>
//             <Col md={8}>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h4>Shipping</h4>
//                   <p>
//                     <strong>Name: </strong>
//                     {order.user.name}
//                     <br />
//                     <strong>Email: </strong>
//                     <a href={`mailto:${order.user.email}`}>
//                       {order.user.email}
//                     </a>
//                   </p>
//                   <strong>Address:</strong>
//                   <p>
//                     {order.shippingAddress.address},{" "}
//                     {order.shippingAddress.city}{" "}
//                     {order.shippingAddress.postalCode},{" "}
//                     {order.shippingAddress.country}
//                   </p>
//                   {order.isDelivered ? (
//                     <Message variant="success">
//                       Delivered on {order.deliveredAt.substring(0, 10)}
//                     </Message>
//                   ) : (
//                     <Message variant="danger">Not Delivered</Message>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <h4>Payment Method</h4>
//                   <p>
//                     <strong>Method : </strong>
//                     {order.paymentMethod}
//                   </p>
//                   {order.isPaid ? (
//                     <Message variant="success">Paid on {order.paidAt}</Message>
//                   ) : (
//                     <Message variant="danger">Not Paid</Message>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <h4>Order Items</h4>
//                   {order.orderItems.length === 0 ? (
//                     <Message variant="info">Your cart is empty</Message>
//                   ) : (
//                     <>
//                       {order.orderItems.map((item, index) => (
//                         <ListGroup.Item key={index}>
//                           <Row>
//                             <Col md={1}>
//                               <Image
//                                 src={item.image}
//                                 alt={item.name}
//                                 fluid
//                                 rounded
//                               />
//                             </Col>
//                             <Col>
//                               <Link to={`/product/${item.product}`}>
//                                 {item.name}
//                               </Link>
//                             </Col>
//                             <Col md={4}>
//                               {item.qty} x &#8377;{item.price} = &#8377;
//                               {item.qty * item.price}
//                             </Col>
//                           </Row>
//                         </ListGroup.Item>
//                       ))}
//                     </>
//                   )}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col md={4}>
//               <Card>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <h4>Order Summary</h4>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Items</Col>
//                       <Col>&#8377;{order.itemsPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Shipping</Col>
//                       <Col>&#8377;{order.shippingPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Tax</Col>
//                       <Col>&#8377;{order.taxPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Total</Col>
//                       <Col>&#8377;{order.totalPrice}</Col>
//                     </Row>
//                     <ListGroup.Item>
//                       {!order.isPaid && (
//                         <ListGroup.Item>
//                           {loadingPay && <Loading />}
//                           {!sdkReady ? (
//                             <Loading />
//                           ) : (
//                             <PayPalButton
//                               amount={order.totalPrice}
//                               onSuccess={successPaymentHandler}
//                             />
//                           )}
//                         </ListGroup.Item>
//                       )}
//                       {loadingDeliverd ? (
//                         <Loading />
//                       ) : (
//                         userInfo.isAdmin &&
//                         order.isPaid &&
//                         !order.isDelivered && (
//                           <Button
//                             onClick={deliverHandler}
//                             className="w-100"
//                             variant="primary"
//                           >
//                             Mark as deliverd
//                           </Button>
//                         )
//                       )}
//                       {errorDeliverd && (
//                         <Message variant="danger">{errorDeliverd}</Message>
//                       )}
//                     </ListGroup.Item>
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       )}
//     </>
//   );
// };

// export default OrderScreen;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// //import { PayPalButton } from "react-paypal-button-v2";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
// import Loading from "../components/Loading";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from "../redux/actions/orderActions";

// const OrderScreen = () => {
//   let params = useParams();
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [sdkReady, setSdkReady] = useState(false);

//   const { order, loading, error } = useSelector((state) => state.orderDetails);

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const { loading: loadingPay, success: successPay } = useSelector(
//     (state) => state.orderPay
//   );

//   const {
//     loading: loadingDeliverd,
//     error: errorDeliverd,
//     success: successDeliverd,
//   } = useSelector((state) => state.orderDeliver);

//   useEffect(() => {
//     // const addPaypalScript = async () => {
//     //   const { data: clientId } = await axios.get("/api/config/paypal");
//     //   const script = document.createElement("script");
//     //   script.type = "text/javascript";
//     //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//     //   script.async = true;
//     //   script.onload = () => {
//     //     setSdkReady(true);
//     //   };
//     //   document.body.appendChild(script);
//     // };

//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };
    
//     const displayRazorpay = async () => {
//       const res = await loadRazorpayScript();
//       if (!res) {
//         alert("Razorpay SDK failed to load");
//         return;
//       }
    
//       const { data } = await axios.post("/api/orders/razorpay", {
//         amount: order.totalPrice * 100, // in paise
//       });
    
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY,
//         amount: data.amount,
//         currency: "INR",
//         name: "Mobile Shop",
//         description: `Order #${order._id}`,
//         order_id: data.id,
//         handler: function (response) {
//           dispatch(payOrder(order._id, response));
//         },
//         prefill: {
//           name: order.user.name,
//           email: order.user.email,
//         },
//       };
    
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     };
    

//     if (!order || order._id !== params.id || successPay || successDeliverd) {
//       dispatch(getOrderDetails(params.id));
//     } else if (!order.isPaid) {
//       if (!window.paypal) {
//         loadRazorpayScript();
//       } else {
//         setSdkReady(true);
//       }
//     }
//   }, [dispatch, order, params.id, successPay, successDeliverd]);

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(params.id, paymentResult));
//   };

//   const deliverHandler = () => {
//     dispatch(deliverOrder(params.id));
//   };

//   if (!loading && order) {
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }

//   return (
//     <>
//       <CheckoutSteps step1 step2 step3 step4 />
//       {loading || !order ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           <h1>Order #{order._id}</h1>
//           <Row>
//             <Col md={8}>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h4>Shipping</h4>
//                   <p>
//                     <strong>Name: </strong>
//                     {order.user.name}
//                     <br />
//                     <strong>Email: </strong>
//                     <a href={`mailto:${order.user.email}`}>
//                       {order.user.email}
//                     </a>
//                   </p>
//                   <strong>Address:</strong>
//                   <p>
//                     {order.shippingAddress.address},{" "}
//                     {order.shippingAddress.city}{" "}
//                     {order.shippingAddress.postalCode},{" "}
//                     {order.shippingAddress.country}
//                   </p>
//                   {order.isDelivered ? (
//                     <Message variant="success">
//                       Delivered on {order.deliveredAt.substring(0, 10)}
//                     </Message>
//                   ) : (
//                     <Message variant="danger">Not Delivered</Message>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <h4>Payment Method</h4>
//                   <p>
//                     <strong>Method : </strong>
//                     {order.paymentMethod}
//                   </p>
//                   {order.isPaid ? (
//                     <Message variant="success">Paid on {order.paidAt}</Message>
//                   ) : (
//                     <Message variant="danger">Not Paid</Message>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <h4>Order Items</h4>
//                   {order.orderItems.length === 0 ? (
//                     <Message variant="info">Your cart is empty</Message>
//                   ) : (
//                     <>
//                       {order.orderItems.map((item, index) => (
//                         <ListGroup.Item key={index}>
//                           <Row>
//                             <Col md={1}>
//                               <Image
//                                 src={item.image}
//                                 alt={item.name}
//                                 fluid
//                                 rounded
//                               />
//                             </Col>
//                             <Col>
//                               <Link to={`/product/${item.product}`}>
//                                 {item.name}
//                               </Link>
//                             </Col>
//                             <Col md={4}>
//                               {item.qty} x &#8377;{item.price} = &#8377;
//                               {item.qty * item.price}
//                             </Col>
//                           </Row>
//                         </ListGroup.Item>
//                       ))}
//                     </>
//                   )}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col md={4}>
//               <Card>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <h4>Order Summary</h4>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Items</Col>
//                       <Col>&#8377;{order.itemsPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Shipping</Col>
//                       <Col>&#8377;{order.shippingPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Tax</Col>
//                       <Col>&#8377;{order.taxPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Total</Col>
//                       <Col>&#8377;{order.totalPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   {!order.isPaid && (
//                     <ListGroup.Item>
//                       {loadingPay && <Loading />}
//                       {!sdkReady ? (
//                         <Loading />
//                       ) : (
//                         // <PayPalButton
//                         //   amount={order.totalPrice}
//                         //   onSuccess={successPaymentHandler}
//                         // />
//                         <Button className="w-100" onClick={displayRazorpay}>
//                               Pay with Razorpay
//                               amount={order.totalPrice}
//                            onSuccess={successPaymentHandler}
//                         </Button>

//                       )}
//                     </ListGroup.Item>
//                   )}
//                   {loadingDeliverd ? (
//                     <Loading />
//                   ) : (
//                     userInfo.isAdmin &&
//                     order.isPaid &&
//                     !order.isDelivered && (
//                       <ListGroup.Item>
//                         <Button
//                           onClick={deliverHandler}
//                           className="w-100"
//                           variant="primary"
//                         >
//                           Mark as Delivered
//                         </Button>
//                       </ListGroup.Item>
//                     )
//                   )}
//                   {errorDeliverd && (
//                     <ListGroup.Item>
//                       <Message variant="danger">{errorDeliverd}</Message>
//                     </ListGroup.Item>
//                   )}
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       )}
//     </>
//   );
// };

// export default OrderScreen;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
// import Loading from "../components/Loading";
// import Message from "../components/Message";
// import { useSelector, useDispatch } from "react-redux";
// import CheckoutSteps from "../components/CheckoutSteps";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from "../redux/actions/orderActions";

// const OrderScreen = () => {
//   let params = useParams();
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [sdkReady, setSdkReady] = useState(false);

//   const { order, loading, error } = useSelector((state) => state.orderDetails);
//   const { userInfo } = useSelector((state) => state.userLogin);
//   const { loading: loadingPay, success: successPay } = useSelector(
//     (state) => state.orderPay
//   );
//   const {
//     loading: loadingDeliverd,
//     error: errorDeliverd,
//     success: successDeliverd,
//   } = useSelector((state) => state.orderDeliver);

//   useEffect(() => {
//     if (!order || !order._id || order._id !== params.id || successPay || successDeliverd) {
//       dispatch(getOrderDetails(params.id));
//     } else if (!order.isPaid) {
//       if (!window.Razorpay) {
//         loadRazorpayScript().then((res) => {
//           if (res) setSdkReady(true);
//         });
//       } else {
//         setSdkReady(true);
//       }
//     }
//   }, [dispatch, order, params.id, successPay, successDeliverd, navigate]);

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(params.id, paymentResult));
//   };

//   const deliverHandler = () => {
//     dispatch(deliverOrder(params.id));
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const displayRazorpay = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert("Razorpay SDK failed to load");
//       return;
//     }

//     const { data } = await axios.post("/api/payment/orders", {
//       amount: order.totalPrice * 100, // in paise
//     });

//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY,
//       amount: data.amount,
//       currency: "INR",
//       name: "Mobile Shop",
//       description: `Order #${order._id}`,
//       order_id: data.id,
//       handler: function (response) {
//         dispatch(payOrder(order._id, response));
//       },
//       prefill: {
//         name: order.user.name,
//         email: order.user.email,
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   if (!loading && order && order.orderItems) {
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }

//   return (
//     <>
//       {!order ? (
//         <Loading />
//       ) : loading ? (
//         <Loading />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           <CheckoutSteps step1 step2 step3 step4 />
//           <h1>Order #{order._id}</h1>
//           <Row>
//             <Col md={8}>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h4>Shipping</h4>
//                   <p>
//                     <strong>Name: </strong>
//                     {order.user.name}
//                     <br />
//                     <strong>Email: </strong>
//                     <a href={`mailto:${order.user.email}`}>
//                       {order.user.email}
//                     </a>
//                   </p>
//                   <strong>Address:</strong>
//                   <p>
//                     {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
//                     {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//                   </p>
//                   {order.isDelivered ? (
//                     <Message variant="success">
//                       Delivered on {order.deliveredAt.substring(0, 10)}
//                     </Message>
//                   ) : (
//                     <Message variant="danger">Not Delivered</Message>
//                   )}
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <h4>Payment Method</h4>
//                   <p>
//                     <strong>Method : </strong>
//                     {order.paymentMethod}
//                   </p>
//                   {order.isPaid ? (
//                     <Message variant="success">Paid on {order.paidAt}</Message>
//                   ) : (
//                     <Message variant="danger">Not Paid</Message>
//                   )}
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <h4>Order Items</h4>
//                   {order.orderItems.length === 0 ? (
//                     <Message variant="info">Your cart is empty</Message>
//                   ) : (
//                     <>
//                       {order.orderItems.map((item, index) => (
//                         <ListGroup.Item key={index}>
//                           <Row>
//                             <Col md={1}>
//                               <Image
//                                 src={item.image}
//                                 alt={item.name}
//                                 fluid
//                                 rounded
//                               />
//                             </Col>
//                             <Col>
//                               <Link to={`/product/${item.product}`}>
//                                 {item.name}
//                               </Link>
//                             </Col>
//                             <Col md={4}>
//                               {item.qty} x &#8377;{item.price} = &#8377;
//                               {item.qty * item.price}
//                             </Col>
//                           </Row>
//                         </ListGroup.Item>
//                       ))}
//                     </>
//                   )}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>

//             <Col md={4}>
//               <Card>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <h4>Order Summary</h4>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Items</Col>
//                       <Col>&#8377;{order.itemsPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Shipping</Col>
//                       <Col>&#8377;{order.shippingPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Tax</Col>
//                       <Col>&#8377;{order.taxPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Total</Col>
//                       <Col>&#8377;{order.totalPrice}</Col>
//                     </Row>
//                   </ListGroup.Item>

//                   {!order.isPaid && (
//                     <ListGroup.Item>
//                       {loadingPay && <Loading />}
//                       {!sdkReady ? (
//                         <Loading />
//                       ) : (
//                         <Button className="w-100" onClick={displayRazorpay}>
//                           Pay with Googlepay
//                         </Button>
//                       )}
//                     </ListGroup.Item>
//                   )}

//                   {loadingDeliverd ? (
//                     <Loading />
//                   ) : (
//                     userInfo.isAdmin &&
//                     order.isPaid &&
//                     !order.isDelivered && (
//                       <ListGroup.Item>
//                         <Button
//                           onClick={deliverHandler}
//                           className="w-100"
//                           variant="primary"
//                         >
//                           Mark as Delivered
//                         </Button>
//                       </ListGroup.Item>
//                     )
//                   )}

//                   {errorDeliverd && (
//                     <ListGroup.Item>
//                       <Message variant="danger">{errorDeliverd}</Message>
//                     </ListGroup.Item>
//                   )}
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       )}
//     </>
//   );
// };

// export default OrderScreen;

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";

const OrderScreen = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const {
    loading: loadingDeliverd,
    error: errorDeliverd,
    success: successDeliverd,
  } = useSelector((state) => state.orderDeliver);

  useEffect(() => {
    if (!order || !order._id || order._id !== params.id || successPay || successDeliverd) {
      dispatch(getOrderDetails(params.id));
    }
  }, [dispatch, order, params.id, successPay, successDeliverd, navigate]);

  const deliverHandler = () => {
    dispatch(deliverOrder(params.id));
  };

  // Calculate itemsPrice only if order and order.orderItems exist
  let itemsPrice = "0.00";
  if (order && order.orderItems) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  // UPI deep link for Google Pay
  const upiId = "kaviyasrini2004@okaxis";
  const merchantName = "Mobile Shop";
  const upiLink = order && order._id && order.totalPrice
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
        merchantName
      )}&am=${order.totalPrice}&cu=INR&tn=${encodeURIComponent(
        `Order #${order._id}`
      )}`
    : "";

  return (
    <>
      {loading || !order ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <h1>Order #{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <strong>Address:</strong>
                  <p>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
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
                              {item.qty} x ₹{item.price} = ₹
                              {item.qty * item.price}
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
                      <Col>₹{itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>₹{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>₹{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loading />}
                      <div style={{ textAlign: "center" }}>
                        <h5>Pay with Google Pay</h5>
                        {upiLink ? (
                          <QRCodeCanvas
                            value={upiLink}
                            size={200}
                            level="H"
                            includeMargin={true}
                          />
                        ) : (
                          <Loading />
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
                      </div>
                    </ListGroup.Item>
                  )}

                  {loadingDeliverd ? (
                    <Loading />
                  ) : (
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          onClick={deliverHandler}
                          className="w-100"
                          variant="primary"
                        >
                          Mark as Delivered
                        </Button>
                      </ListGroup.Item>
                    )
                  )}

                  {errorDeliverd && (
                    <ListGroup.Item>
                      <Message variant="danger">{errorDeliverd}</Message>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;