import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo1.png";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  console.log(orderInfo);
  if (orderInfo === null || orderInfo === undefined) {
    history("/cart")
  }

  // const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),
  };
  // console.log(paymentData);


  const submitHandler = async (e) => {
    // console.log(window)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data: { key } } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/paymentapikey`)
      const { data: { order } } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/payment/process`,
        paymentData,
        config
      );
      // console.log(order.amount);
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Art-Piece",
        description: "Ecommerce Website Payment",
        image: logo,
        order_id: order.id,
        handler: async (res) => {
          try {
            const verifyUrl = `${process.env.REACT_APP_API_URL}/api/v1/paymentverification`;
            const { data } = await axios.post(verifyUrl, res);
            if (data.success === true) {
              const orders = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice: orderInfo.subtotal,
                taxPrice: orderInfo.tax,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.totalPrice,
                paymentInfo: {
                  razorpay_order_id: data.paymentDetails.razorpay_order_id,
                  razorpay_payment_id: data.paymentDetails.razorpay_payment_id,
                  razorpay_signature: data.paymentDetails.razorpay_signature,
                  status: (data.success) ? 'success' : 'Failed'
                }
              }
              // console.log(orders.paymentInfo)
              dispatch(createOrder(orders));
              history("/success");
            }
            else {
              alert.error("There's some issue while processing payment ");
            }
          } catch (error) {
            alert.error(error.response.data.message);
            // console.log(error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      }
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    submitHandler();
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-main"> </div>
    </Fragment>
  );
};

export default Payment;
