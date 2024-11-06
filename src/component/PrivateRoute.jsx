import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import PostBusiness from './PostBusiness';

const isAuthenticated = () => {
  return Cookies.get('token');
};

const isStaff = () => {
  return Cookies.get('is_staff') === 'true'; 
};

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  if (isStaff()) {
    return <Navigate to="/signin" />;
  }

  return <PostBusiness />;
};

export default PrivateRoute;
