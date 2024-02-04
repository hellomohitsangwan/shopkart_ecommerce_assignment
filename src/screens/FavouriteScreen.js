import React, { useEffect, useState } from "react";
import { Col, Row, ListGroup, Card, Button, Form } from "react-bootstrap";
import { addToFavourite, removeFromFavourite } from "../actions/favouriteAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Screen.css";
import Footer from "../components/Footer";
import Product from "../components/Product";

const ProductScreen = ({ match, history, location }) => {

  // location.qty it gives me ?qty=1
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const favourite = useSelector((state) => state.favourite);
  const { favouriteItems } = favourite;
  const dispatch = useDispatch();

  const removeFromFavouriteHandler = (id) => {
    dispatch(removeFromFavourite(id));
  };
  useEffect(() => {
    if (productId) {
      console.log(productId);
      dispatch(addToFavourite(productId, qty));
      history.push("/favourites");
    }
    console.log(productId);
  }, [dispatch, productId, qty, history]);
  console.log(favouriteItems);

  return (
    <>
      <div className="container">
        <h2>Favourite Items</h2>
        {favouriteItems?.length !== 0 && <div className="latest"></div>}

        <Row className="mt-4">
          {favouriteItems?.map((product) => (
            <Col key={product?._id} xs={9} sm={9} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ProductScreen;
