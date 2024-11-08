// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBuilding, FaBriefcase, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';
import LogoutModal from './LogoutModal';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [show, setShow] = useState(false);
    const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);

    const openLogoutModal = () => setShow(true);
    const closeLogoutModal = () => setShow(false)

    const toggleBusinesses = () => setIsBusinessesOpen(prev => !prev);

    return (
        <>
            {/* Overlay for mobile view */}

            <nav
                className={`fixed lg:relative z-20 h-full bg-green-700 transition-all duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-16'
                    } lg:translate-x-0 lg:w-60`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 bg-green-900 text-white">
                    {isSidebarOpen && <img src='/images/header-logo.jpg' className='h-9 m-auto' alt="logo"/>}
                    <button
                        onClick={toggleSidebar}
                        className="text-white hover:text-green-300 lg:hidden"
                    >
                        <FaBars className="text-2xl" />
                    </button>
                </div>

                {/* Sidebar Links */}
                <ul className="p-4 space-y-4">
                    {/* Dashboard Link */}
                    <li>
                        <Link
                            to='/member/dashboard'
                            className="flex items-center text-white space-x-2 p-2 rounded-lg hover:bg-green-800"
                        >
                            <FaTachometerAlt className="text-lg" />
                            {isSidebarOpen && <span>User Dashboard</span>}
                        </Link>
                    </li>

                    {/* Businesses Dropdown */}
                    <li>
                        <button
                            onClick={toggleBusinesses}
                            className="flex items-center justify-between w-full text-white p-2 rounded-lg hover:bg-green-800 focus:outline-none"
                        >
                            <span className="flex items-center space-x-2">
                                <FaBuilding className="text-lg" />
                                {isSidebarOpen && <span>Businesses</span>}
                            </span>
                            {isSidebarOpen && (
                                <FaCaretDown
                                    className={`transition-transform ${isBusinessesOpen ? 'rotate-180' : ''}`}
                                />
                            )}
                        </button>
                        {isSidebarOpen && isBusinessesOpen && (
                            <div className="mt-2 p-2 text-sm space-y-2 bg-green-900 rounded-md">
                                <Link
                                    to='/member/user-all'
                                    className="flex items-center text-white p-2 rounded-lg hover:bg-green-800"
                                >
                                    <FaBriefcase className="inline mr-2" />
                                    <span className="truncate whitespace-nowrap overflow-hidden">
                                        Manage Businesses
                                    </span>
                                    
                                </Link>
                                <Link
                                    to='/member/user-pending'
                                    className="flex items-center text-white p-2 rounded-lg hover:bg-green-800"
                                >
                                    <FaBriefcase className="inline mr-2" />
                                    <span className="truncate whitespace-nowrap overflow-hidden">
                                        Business Pending Approval
                                    </span>
                                </Link>
                            </div>
                        )}
                    </li>

                    {/* Logout Link */}
                    <li>
                        <a
                            onClick={openLogoutModal}
                            className=" cursor-pointer flex items-center text-white space-x-2 p-2 rounded-lg hover:bg-green-800"
                        >
                            <FaSignOutAlt className="text-lg" />
                            {isSidebarOpen && <span>Logout</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            <LogoutModal show={show} closeModal={closeLogoutModal} />
        </>
    );
};

export default Sidebar;
