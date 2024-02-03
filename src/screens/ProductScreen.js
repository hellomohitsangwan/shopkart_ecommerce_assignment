import React, { useEffect, useState } from "react";
import { Col, Row, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Screen.css";
import avator from "../assets/avator.svg";
import Footer from "../components/Footer";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
  } = productReviewCreate;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <div style={{"marginTop":"48px"}}>
          <Row>
            <Col sm={12} md={6}>
              <Carousel pause="hover">
                {product?.product?.images &&
                  product?.product?.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <div className="Pimage">
                        <img
                          className="d-block w-100 product-images"
                          src={image.url}
                          alt={product?.product?.title}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col className="pdr" md={6}>
              <h1 className="pdrn">{product?.product?.name}</h1>
              <p className="pdrp">
                {" "}{" "}{product?.product?.description}
              </p>
              <h2 className="pdrd">
                {" "}
                ₹ {product?.product?.price}
              </h2>

              <Button
                      onClick={submitHandler}
                      className="adc"
                      type="button"
                      disabled={product?.product?.countInStock === 0}
                    >
                      Add To Cart
                    </Button>


            </Col>



          </Row>

        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductScreen;
