import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';




const AdminPrivateRoute = ({ children }) => {
    const location = useLocation()
    const isAuthenticated = () => {
        return Cookies.get('token') && Cookies.get('is_staff') === 'true'
    }
    // console.log(Cookies.get('token') && !Cookies.get('is_staff'))
    // console.log(!Cookies.get('is_staff'))
    // console.log(Cookies.get('is_staff'))
    // console.log(typeof Cookies.get('is_staff'))
    // console.log(Cookies.get('is_staff') === 'undefined')
    // console.log(`end \n \n`)

    console.log('location', location)
    if (location.pathname === '/admin' && isAuthenticated()) {
        return <Navigate to="/admin/dashboard" />
    }
    return isAuthenticated() ? children : <Navigate to="/admin-login" />;
}

export default AdminPrivateRoute