import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import "./Product.css";
const Product = ({ product }) => {
  return (
    <Card className="my-4 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.rating} Reviews`} />
        </Card.Text>
        <Card.Text as="h6">
          <strong>&#8377;{product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
