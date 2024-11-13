import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return Cookies.get('token') && Cookies.get('is_staff') === 'false'
  };
  const isAuth = isAuthenticated()
  console.log(Cookies.get('token'))
  console.log(Cookies.get('is_staff'))
  console.log(typeof Cookies.get('is_staff') === 'undefined')
  console.log(Cookies.get('token') && Cookies.get('is_staff') === undefined)
  console.log(isAuth)

  return isAuthenticated() ? children : <Navigate to='/auth/signin' />
}

export default ProtectedRoute