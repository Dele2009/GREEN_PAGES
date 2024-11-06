import React from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserCards from './UserCards';
import '../assets/user-dashboard.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const UserDashboard = () => {
    const navigate = useNavigate();
    
  const isAuthenticated = () => {
    return Cookies.get('token') 
  };

  if (!isAuthenticated()) {
    navigate('/signin'); 
    return null;
  }
    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className='user-dashboard-container'>
                <h1>Welcome to your dashboard!</h1>
            </div>
            <UserCards />
        </div>
    );
};

export default UserDashboard;
