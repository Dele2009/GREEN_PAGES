// UserHeader.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { Modal, Badge } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";
import NotificationsModal from "../utils/NotificationModal";
import { showToast } from "../utils/Toast";

const UserHeader = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const loggedInEmail = Cookies.get("email");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_API_URL}/api/notifications/`,
        {
          headers: { Authorization: `Token ${Cookies.get("token")}` },
        }
      );
      setNotifications((prevNotifications) => {
        // Check for new notifications
        const newNotifications = response.data.filter(
          (item) => item.is_read === false
        );
        if (newNotifications.length > prevNotifications.length) {
          const newNotificationCount =
            newNotifications.length - prevNotifications.length;
          // showToast(
          //   "info",
          //   `You have ${newNotificationCount} new notifications`
          // );
        }
        console.log(response, newNotifications);
        return newNotifications;
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    console.log(notifications);

    const notificationInterval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(notificationInterval);
  }, []);

  const toggleNotificationModal = () => {
    // if (!isNotificationOpen) setNotificationCount(0);
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      <header className="flex justify-between items-center px-8 py-4 bg-main_color shadow-xl text-white">
        <div className="text-2xl flex items-center justify-center font-semibold">
          <Link to="/">
            <img
              src="/images/header-logo.jpg"
              className="h-9 m-auto"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium hidden lg:inline">
            Welcome, {loggedInEmail} !
          </span>
          {/* <Link to="/" className="hover:text-green-200">
            View Site
          </Link> */}
          <button onClick={toggleNotificationModal} className="relative">
            <FaBell className="text-3xl" />
            <Badge
              size="xs"
              className="bg-[#ff0000] absolute rounded-full top-0 right-0 -mt-1 -mr-2"
            >
              {notifications.length}
            </Badge>
          </button>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-green-300 lg:hidden"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        <NotificationsModal
          notifications={notifications}
          isNotificationOpen={isNotificationOpen}
          toggleNotificationModal={toggleNotificationModal}
        />
      </header>
    </nav>
  );
};

export default UserHeader;
