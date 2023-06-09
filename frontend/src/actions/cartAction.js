import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants.js";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/products/${id}`
  );
  console.log(data.product.user);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      seller: data.product.user,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      quantity,
      stock: data.product.Stock,
    },
  });
  // console.log(JSON.stringify(getState().cart.cartItems));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
