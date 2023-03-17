const express = require("express");
const {
  processPayment,
  paymentApiKey,
  paymentVerification,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/paymentapikey").get(isAuthenticatedUser, paymentApiKey);
router.route("/paymentverification").post(isAuthenticatedUser,paymentVerification);
module.exports = router;
