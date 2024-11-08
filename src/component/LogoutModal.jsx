import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/Toast';

const LogoutModal = ({ show, closeModal }) => {
     const navigate = useNavigate();

     const handleLogout = () => {
          Cookies.remove('token');
          Cookies.remove('email');
          Cookies.remove('is_staff');
          navigate('/auth/signin');
          showToast('success', 'Logged out successfuly')
     };

     return (
          <Modal show={show} onClose={closeModal} size="md" className="rounded-lg">
               <Modal.Header className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                         <FaSignOutAlt className="text-main_color" size={20} />
                         <span className="text-xl font-semibold text-gray-800">Log Out</span>
                    </div>
               </Modal.Header>

               <Modal.Body className="text-center py-8 px-6 bg-gray-50">
                    <p className="text-lg font-medium text-gray-700 mb-6">
                         Are you sure you want to log out?
                    </p>
                    <div className="flex justify-center items-center space-x-4">

                         <Button
                              color="gray"
                              onClick={closeModal}
                              className="flex items-center space-x-2 px-5 py-2 rounded-lg !bg-gray-200 hover:!bg-gray-300"
                         >
                              <FaTimes size={18} />
                              <span>Cancel</span>
                         </Button>
                         <Button
                              color="failure"
                              onClick={handleLogout}
                              className="flex items-center space-x-2 px-5 py-2 rounded-lg !bg-red-600 hover:!bg-red-700"
                         >
                              <FaSignOutAlt size={18} />
                              <span>Yes, log out</span>
                         </Button>
                    </div>
               </Modal.Body>
          </Modal>
     );
};

export default LogoutModal;
