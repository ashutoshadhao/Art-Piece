const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getAllOrdersSeller,
} = require("../controllers/orderControllers");
const { verifyProduct } = require("../controllers/productController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/verify/Product/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), verifyProduct);

router
  .route("/seller/orders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getAllOrdersSeller);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router
  .route("/seller/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrder);

module.exports = router;
