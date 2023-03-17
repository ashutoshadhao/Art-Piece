const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const Order = require("../models/orderModel.js");
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
const crypto = require("crypto");

exports.paymentApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

exports.processPayment = catchAsyncErrors(async (req, res) => {
  // console.log(req.body.amount);
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  // console.log(data);
  res.status(200).json({
    success: true,
    order,
  });
});

exports.paymentVerification = catchAsyncErrors(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const paymentDetails = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };
    res.status(200).json({
      success: true,
      paymentDetails,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
