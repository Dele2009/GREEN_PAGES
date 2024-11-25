import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const {pathname} = useLocation();
  const isAuthenticated = () => {
    return Cookies.get("token") && Cookies.get("is_staff") === "false";
  };

  if (["/member", "/member/"].includes(pathname) && isAuthenticated()) {
    return <Navigate to="/member/dashboard" />;
  }
  return isAuthenticated() ? children : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;
