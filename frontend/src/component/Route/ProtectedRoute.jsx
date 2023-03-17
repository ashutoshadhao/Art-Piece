import React from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "../layout/Loader/LoadingBar";
import LoginSignUp from "../User/LoginSignUp";
import Profile from "../User/Profile";
import VerifyUser from "../User/VerifyUser";

const ProtectedRoute = ({
  isAuthenticated,
  loading,
  verified = true,
  children,
  adminRoute,
  isAdmin,
}) => {


  if (loading)
    return <LoadingBar />;

  if (!isAuthenticated) {
    return <LoginSignUp />;
  }
  if (verified === false) {
    return <VerifyUser />
  }
  if (adminRoute && !isAdmin) {
    return <Profile />
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
