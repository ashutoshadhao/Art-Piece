import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import LoadingBar from "./component/layout/Loader/LoadingBar";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import WebFont from "webfontloader";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import Profile from "./component/User/Profile.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import axios from "axios";
import Payment from "./component/Cart/Payment.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Seller/NewProduct";
import UpdateProduct from "./component/Seller/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import ResetPassword from "./component/User/ResetPassword";
import NotFound from "./component/layout/Not Found/NotFound.jsx";
import SellerDashboard from "./component/Seller/SellerDashboard";
import SellerProductList from "./component/Seller/SellerProductList";
import SellerProcessOrder from "./component/Seller/SellerProcessOrder";
import SellerOrderList from "./component/Seller/SellerOrderList";
import RoleChange from "./component/User/RoleChange";
import VerifyUser from "./component/User/VerifyUser";
import UnApprovedProductList from "./component/Admin/UnApprovedProductList";
import UnapprovedProductPreview from "./component/Admin/UnapprovedProductPreview";
import ContactForm from "./component/Admin/ContactForm";

function App() {
  const { loading, isAuthenticated, isVerified, user } = useSelector(
    (state) => state.user
  );
  // const [paymentApiKey, setpaymentApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/api/v1/paymentApiKey`
  //   );
  //   // console.log(data);
  //   setpaymentApiKey(data.key);
  // }
  let isAdmin = "";
  // let verified = false;
  if (user !== undefined && user !== null) isAdmin = user.role;
  // if (user !== undefined && user !== null) verified = user.verified;
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["sans-serif", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {/* {paymentApiKey && ( */}

      {/* <Routes> */}
      {/* <Route
          path="/process/payment"
          element={
            isAuthenticated ? (
              loading ? (
                <LoadingBar />
              ) : (
                <Payment />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}
      {/* </Routes> */}
      {/* )} */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>

        {/* User Login Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
            />
          }
        >
          <Route path="/account" element={<Profile />}></Route>
          <Route path="/me/update" element={<UpdateProfile />}></Route>
          <Route path="/password/update" element={<UpdatePassword />}></Route>
          <Route
            path="/verify/user"
            element={<VerifyUser />}
            // element={verified === false ? <VerifyUser /> : <NotFound />}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        {/*  Verified User Login Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              verified={isVerified}
              loading={loading}
            />
          }
        >
          <Route path="/login/shipping" element={<Shipping />}></Route>
          <Route path="/order/confirm" element={<ConfirmOrder />}></Route>
          <Route path="/success" element={<OrderSuccess />}></Route>
          <Route path="/orders" element={<MyOrders />}></Route>
          <Route path="/order/:id" element={<OrderDetails />}></Route>
          <Route path="/process/payment" element={<Payment />} />
          <Route path="/role/success" element={<RoleChange />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin Login Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
              adminRoute={true}
              isAdmin={isAdmin === "admin"}
              verified={isVerified}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/products" element={<ProductList />}></Route>
          <Route path="/admin/product/:id" element={<UpdateProduct />}></Route>
          <Route path="/admin/orders" element={<OrderList />}></Route>
          <Route path="/admin/order/:id" element={<ProcessOrder />}></Route>
          <Route path="/admin/users" element={<UsersList />}></Route>
          <Route path="/admin/user/:id" element={<UpdateUser />}></Route>
          <Route path="/admin/reviews" element={<ProductReviews />}></Route>
          <Route path="/admin/contact" element={<ContactForm />}></Route>
          <Route
            path="/admin/verify/products"
            element={<UnApprovedProductList />}
          ></Route>
          <Route
            path="/admin/product/verify/preview/:id"
            element={<UnapprovedProductPreview />}
          ></Route>
        </Route>
        {/* Seller Login Routes */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loading={loading}
              adminRoute={true}
              isAdmin={isAdmin === "seller"}
              verified={isVerified}
            />
          }
        >
          <Route path="/seller/dashboard" element={<SellerDashboard />}></Route>
          <Route
            path="/seller/products"
            element={<SellerProductList />}
          ></Route>
          <Route path="/seller/product" element={<NewProduct />}></Route>
          <Route path="/seller/product/:id" element={<UpdateProduct />}></Route>
          <Route path="/seller/orders" element={<SellerOrderList />}></Route>
          <Route
            path="/seller/order/:id"
            element={<SellerProcessOrder />}
          ></Route>
          <Route path="/seller/reviews" element={<ProductReviews />}></Route>
        </Route>

        {/* <Route
          path="/account"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <Profile />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/me/update"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <UpdateProfile />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/password/update"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <UpdatePassword />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/login/shipping"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <Shipping />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/order/confirm"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <ConfirmOrder />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/success"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <OrderSuccess />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/orders"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <MyOrders />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}
        {/* <Route
          path="/order/:id"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : (
                <OrderDetails />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}
        {/* 
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <Dashboard />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/products"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <ProductList />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/product"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <NewProduct />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/product/:id"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <UpdateProduct />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/orders"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <OrderList />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/order/:id"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <ProcessOrder />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/users"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <UsersList />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/user/:id"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <UpdateUser />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}

        {/* <Route
          path="/admin/reviews"
          element={
            isAuthenticated === true ? (
              loading ? (
                <LoadingBar />
              ) : user.role === "admin" ? (
                <ProductReviews />
              ) : (
                <LoginSignUp />
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route> */}
      </Routes>

      <Footer />
    </>
  );
}
export default App;
