
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import '../assets/user-dashboard.css';
import Cookies from 'js-cookie';

const UserHeader = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalNotification, setModalNotification] = useState(false);

  const loggedInEmail = Cookies.get('email');

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/notifications/`, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setNotifications(response.data);
      setNotificationCount(response.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const openNotification = () => {
    if (modalNotification) {
      setNotificationCount(0);
    }
    setModalNotification(!modalNotification);
  };

  return (
    <header className="header">
      <h1>User Dashboard</h1>
      {loggedInEmail && <h2>Welcome, {loggedInEmail}!</h2>}

      <div className="header-right">
        <Link to="/">View Site</Link>
        <div className="notification-container">
          <FaBell className="notification-icon" onClick={openNotification} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>
      </div>

      {modalNotification && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Notifications</h2>
            <button onClick={openNotification} className="close-button">Close</button>
            {notifications.length > 0 ? (
              <div className="notification-list">
                {notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <div className="notification-message">{notification.notification_message}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No notifications available.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
