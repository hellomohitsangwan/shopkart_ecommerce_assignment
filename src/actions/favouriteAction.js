import axios from "axios";
import {
  FAVOURITE_ADD_ITEM,
  FAVOURITE_DELETE_ITEM,
} from "../constants/favouriteConstants";

export const addToFavourite = (id, qty) => async (dispatch, getState) => {
    
  const { data } = await axios.get(`https://procommerce.onrender.com/api/products/${id}`);
  dispatch({
    type: FAVOURITE_ADD_ITEM,
    payload: {
      product: data.product._id,
      name: data.product.name,
      images: data.product.images,
      price: data.product.price,
      countInStock: data.product.countInStock,
      qty,
    },
  });
  localStorage.setItem("favouriteItems", JSON.stringify(getState().favourite.favouriteItems));
};
export const removeFromFavourite = (id) => async (dispatch, getState) => {
  dispatch({
    type: FAVOURITE_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem("favouriteItems", JSON.stringify(getState().favourite.favouriteItems));
};
