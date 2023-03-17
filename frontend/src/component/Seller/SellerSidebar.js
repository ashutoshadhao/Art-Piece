import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/seller/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="/seller/products">
        <p>
          <PostAddIcon />
          My Products
        </p>
      </Link>

      <Link to="/seller/product">
        <p>
          <AddIcon />
          Create Product
        </p>
      </Link>

      <Link to="/seller/orders">
        <p>
          <ListAltIcon />
           Orders
        </p>
      </Link>
     
    </div>
  );
};

export default Sidebar;
