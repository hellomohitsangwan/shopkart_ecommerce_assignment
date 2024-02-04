import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
} from "./reducer/userReducer";

import {
  productListReducer,
  productDetailReducer,
  productReviewCreateReducer,
} from "./reducer/productListReducer";

import { favouriteReducer } from "./reducer/favouriteReducer";

import { cartReducer } from "./reducer/cartReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,

  
  favourite: favouriteReducer,

  cart: cartReducer,


  productList: productListReducer,
  productDetails: productDetailReducer,
  productReviewCreate: productReviewCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    cartItems: cartItemsFromState,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
