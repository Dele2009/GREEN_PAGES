import React, { useState } from "react";
import { Modal } from "flowbite-react";
import Cookies from "js-cookie";
import { FaCheckCircle, FaExclamationCircle, FaBell } from "react-icons/fa";
import axios from "axios";

const NotificationsModal = ({
  notifications,
  isNotificationOpen,
  toggleNotificationModal,
}) => {
  const [selectedNotification, setSelectedNotification] = useState({});
  const [showSelected, setShowSelected] = useState(false);

  const readNotification = async (id) => {
    await axios.get(
      `${import.meta.env.REACT_APP_API_URL}/api/read-notification/${id}/`
    );
  };
  
  const getNotificationStyles = (type, isRead) => {
    const baseStyles = isRead
      ? "bg-gray-100 text-gray-700"
      : "bg-green-50 text-gray-800 font-semibold";

    const borderStyles =
      type === "success"
        ? "border-l-4 border-main_color"
        : "border-l-4 border-red-500";

    const icon =
      type === "success" ? (
        <FaCheckCircle className="text-main_color text-lg" />
      ) : type === "error" ? (
        <FaExclamationCircle className="text-[#ff0000] text-lg" />
      ) : (
        <FaBell className="text-gray-500 text-lg" />
      );

    return {
      styles: `${baseStyles} ${borderStyles} p-3 rounded-md flex items-center gap-3`,
      icon,
    };
  };

  return (
    <>
      {/* Main Notifications Modal */}
      <Modal
        position="center"
        show={isNotificationOpen}
        onClose={toggleNotificationModal}
        size="2xl"
      >
        <Modal.Header className="font-bold font-sans">
          Notifications
        </Modal.Header>
        <Modal.Body>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification, index) => {
                const { styles, icon } = getNotificationStyles(
                  notification.notification_type,
                  notification.is_read
                );
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setShowSelected(true);
                      setSelectedNotification(notification);
                      readNotification(notification.id);
                    }}
                    className={`${styles} cursor-pointer hover:bg-gray-200`}
                  >
                    {icon}
                    <p className="truncate">
                      {notification.notification_message}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No notifications available.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={toggleNotificationModal}
            className="px-4 py-2 text-white bg-main_color rounded-lg hover:bg-green-700"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Full Notification Details Modal */}
      {/* Notification Details Modal */}
      <Modal
        position="center"
        show={showSelected}
        onClose={() => {
          setSelectedNotification({});
          setShowSelected(false);
        }}
        size="lg"
        className="rounded-lg shadow-lg"
        popup
      >
        <Modal.Header className="flex justify-between items-center font-bold text-xl">
          Notification Details
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-800 mb-4">
              {selectedNotification.notification_message}
            </p>
            <p className="text-sm text-gray-500">
              {selectedNotification.date_created}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setSelectedNotification({});
              setShowSelected(false);
            }}
            className="px-4 py-2 text-white bg-main_color rounded-lg hover:bg-green-700 transition"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationsModal;
