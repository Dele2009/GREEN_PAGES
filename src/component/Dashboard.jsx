import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import DashboardCards from './DashboardCards';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Dashboard = () => {
  const navigate = useNavigate();


  const isAuthenticated = () => {
    return Cookies.get('token') && Cookies.get('is_staff')
  };

  if (!isAuthenticated()) {
    return navigate('/admin');
  }

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className='dashboard-container'>
        <h1>Welcome to the admin dashboard!</h1>
      </div>
      <DashboardCards />
    </div>
  );
};

export default Dashboard;

