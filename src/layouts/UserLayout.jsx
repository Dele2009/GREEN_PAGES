// DashboardLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import UserSidebar from '../component/UserSidebar';
import UserHeader from '../component/UserHeader';

import { FaTachometerAlt, FaBuilding, FaBriefcase, FaPlusSquare } from 'react-icons/fa';


const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const SidebarLinks = [
    {
      name: 'Dashboard',
      icon: FaTachometerAlt,
      path: 'dashboard'
    },
    {
      name: 'Businesses',
      icon: FaBuilding,
      dropdown: [
        {
          name: 'Add Businesses',
          icon: FaPlusSquare,
          path: 'add-business'
        },
        {
          name: 'Manage Businesses',
          icon: FaBriefcase,
          path: 'all-businesses'
        },
        {
          name: 'Business Pending Approval',
          icon: FaBuilding,
          path: 'pending-businesses'
        },
      ]
    },
  ]

  return (
    <div className="overflow-hidden  flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <UserHeader  toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <UserSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setSidebarOpen={setIsSidebarOpen}
          SidebarLinks={SidebarLinks}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-scroll h-screen pt-[100px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
