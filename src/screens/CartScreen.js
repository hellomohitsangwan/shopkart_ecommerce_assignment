import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import "./Screen.css";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Footer from "../components/Footer";
import ComingSoonScreen from "./ComingSoonScreen";
import Modal from "react-bootstrap/Modal";

const CartScreen = ({ match, location, history }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productId = match.params.id;

  // location.qty it gives me ?qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    // history.push("/new");
    setShow(true);
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      history.push("/cart");
    }
    console.log(qty);
  }, [dispatch, productId, qty, history]);
  console.log(cartItems);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {windowWidth >= 1000 ? (
        <div>
          <Row>
            <Col md={8}>
              <h1 className="cart-title">My Cart</h1>
              <div className="green-underline"></div>
              <div className="black-underline"></div>
              {cartItems.length === 0 ? (
                <Message children="Your cart is empty">
                  <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.images[0].url}
                            fluid
                            rounder
                            className="cart-image"
                          />
                        </Col>
                        <Col md={3}>
                          <Link
                            to={`/product/${item.product}`}
                            className="cart-product-title"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <div className="cart-status col-md-8">
                          <Col md={2}>
                            <span className="cart-price">Price : </span>₹
                            {item.price}
                            <span className="cart-kg"></span>
                          </Col>
                          <Col>
                            <p>
                              <span className="cart-price">Status : </span> In
                              Stock
                            </p>
                          </Col>
                          <Col md={2}>
                            <span className="cart-price">Quantity : </span>
                            <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((c) => (
                                <option value={c + 1} Key={c + 1}>
                                  {c + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col md={2}>
                            <Button
                              type="button"
                              variant="light"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                              className="cart-remove"
                            >
                              <p className="remove">Remove</p>
                            </Button>
                          </Col>
                        </div>
                      </Row>

                      <div className="black-underline"></div>
                    </ListGroup.Item>
                  ))}
                  <Button
                    type="button"
                    className="btn btn-block checkout-btn"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card className="checkout-card">
                <div className="checkout-title">
                  <p>Price Details</p>
                </div>
                <div className="checkout-underline"></div>
                <ListGroup variant="flush">
                  <div className="gap"></div>
                  <ListGroup.Item>
                    <p className="subtotal">
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      items
                    </p>
                    <div className="total-amount">
                      <span className="total">Total amount : </span> ₹{" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </div>
                  </ListGroup.Item>
                  <div className="gap"></div>
                  <div className="checkout-underline"></div>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Modal className="cm" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Order Placed Successfully</Modal.Title>
            </Modal.Header>
            <div className="mi">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <ComingSoonScreen />
      )}
    </>
  );
};

export default CartScreen;
