import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPrivateRoute = ({ children }) => {
  const {pathname} = useLocation();
  const isAuthenticated = () => {
    return Cookies.get("token") && Cookies.get("is_staff") === "true";
  };

  if (["/admin", "/admin/"].includes(pathname) && isAuthenticated()) {
    return <Navigate to="/admin/dashboard" />;
  }
  return isAuthenticated() ? children : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;
