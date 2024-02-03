import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./component.css";

const Product = ({ product }) => {
  return (
    <div className="product">
      <Card>
        <Link to={`/product/${product?._id}`}>
          <Card.Img src={product?.images[0].url} alt={product?.name} />
        </Link>
        <div>
          <Link to={`/product/${product?._id}`} className="ph">
            {product?.name}
          </Link>
          <p className="ph">₹{product?.price.toFixed(2)}</p>

          <p className="pr">{product?.numReviews}</p>

          <div className="piw">
            <Link to="/favourites">
              <svg
                className="phi"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
            </Link>
            <Link to="/cart">
              {" "}
              <svg
                className="phi"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Product;
