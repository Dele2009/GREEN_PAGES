import React from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Cookies from 'js-cookie';


const isAuthenticated = () => {
    return Cookies.get('token')
}
const is_staff = () => {
    return Cookies.get('is_staff') === 'true'
}

const AdminPrivateRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/admin" />;
    }
    if (is_staff()) {
        return <Navigate to='/dashboard' />
    }
    return <Dashboard />;
}

export default AdminPrivateRoute