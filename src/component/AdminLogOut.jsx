import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/dashboard.css';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import Cookies from 'js-cookie'

const AdminLogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  Cookies.remove('token');
    Cookies.remove('email');
    
    navigate('/admin'); 
  };

  return (
    <div>
    <AdminHeader/>
    <AdminSidebar/>
    <div className="logout-container">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <div className="button-container">
        <button onClick={handleLogout} className="logout-button">Yes, Logout</button>
        <button onClick={() => navigate(-1)} className="cancel-button">Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default AdminLogOut;
