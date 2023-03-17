import React, { useEffect } from "react";
import Sidebar from "./SellerSidebar.js";
import "./dashboard.css";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getSellerProduct } from "../../actions/productAction";
import { getAllOrdersSeller } from "../../actions/orderAction.js";
import MetaData from "../layout/MetaData.jsx";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getSellerProduct(user._id));
    dispatch(getAllOrdersSeller());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#ff2400", "#32cd32"],
        hoverBackgroundColor: ["#CB4335", "#228b22"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Seller Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1"> Seller Dashboard</Typography>
        <hr />
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/seller/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/seller/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <div className="lineChart">
                <Line data={lineState} />
              </div>
            </div>
            <div class="col">
              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
