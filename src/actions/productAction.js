import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
  } from "../constants/productConstants";
  import axios from "axios";
  import { logout } from "./userActions";
  export const listProducts =
    (keyword = "") =>
    async (dispatch) => {
      try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const res = await axios.get(`https://procommerce.onrender.com/api/products?keyword=${keyword}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });
        
        if (res.status === 500) {
          dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: "check your network connection",
          });
          return;
        }
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            err.response && err.response.status === 500
              ? "check your network connection"
              : err.response && err.response.status !== 500
              ? err.response.data.message
              : "check your network connection",
        });
      }
    };
  export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`https://procommerce.onrender.com/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  
  
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  };
  
  export const createProductReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`https://procommerce.onrender.comhttps://procommerce.onrender.com/api/products/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }