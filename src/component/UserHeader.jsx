// UserHeader.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { Modal, Badge } from 'flowbite-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserHeader = ({ isSidebarOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const loggedInEmail = Cookies.get('email');

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/notifications/`, {
        headers: { Authorization: `Token ${Cookies.get('token')}` },
      });
      console.log('notifi', response, response.data, Cookies.get('token'), import.meta.env.REACT_APP_API_URL)
      setNotifications(response.data);
      setNotificationCount(response.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotificationModal = () => {
    if (!isNotificationOpen) setNotificationCount(0);
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-green-900 text-white">
      {!isSidebarOpen && <img src='/images/header-logo.jpg' className='h-9 m-auto' alt="logo" />}
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="flex items-center space-x-6">
        <span className="text-sm font-medium">
          Welcome, {loggedInEmail}!
        </span>
        <Link to="/" className="hover:text-green-200">View Site</Link>
        <button onClick={toggleNotificationModal} className="relative">
          <FaBell className="text-4xl" />
          <Badge color="failure" className="absolute top-0 right-0 -mt-1 -mr-5">
            {notificationCount}
          </Badge>
        </button>
      </div>

      <Modal show={isNotificationOpen} onClose={toggleNotificationModal} size="lg">
        <Modal.Header>Notifications</Modal.Header>
        <Modal.Body>
          {/* {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-md">
                  {notification.notification_message}
                </div>
              ))}
            </div>
          ) : (
            <p>No notifications available.</p>
          )} */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={toggleNotificationModal} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default UserHeader;
