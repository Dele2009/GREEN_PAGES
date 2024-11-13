// DashboardLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/UserSidebar';
import Header from '../component/UserHeader';
import { FaTachometerAlt, FaBuilding, FaBriefcase, FaPlusSquare, FaList, FaUserPlus, FaUsers, FaUserShield } from 'react-icons/fa';

const AdminLayout = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

     const SidebarLinks = [
          {
               name: 'Admin Dashboard',
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
          {
               name: 'Admin',
               icon: FaUserShield,
               dropdown: [
                    {
                         name: 'Manage Admin',
                         icon: FaList,
                         path: 'manage-admin'
                    },
                    {
                         name: 'Add Admin',
                         icon: FaUserPlus,
                         path: 'add-admin'
                    }
               ]
          },
          {
               name: 'Users',
               icon: FaUsers,
               dropdown: [
                    {
                         name: 'Manage User',
                         icon: FaList,
                         path: 'all-users'
                    },
                    {
                         name: 'Add User',
                         icon: FaUserPlus,
                         path: 'add-users'
                    }
               ]
          },
     ];

     return (
          <div className="overflow-hidden  flex flex-col min-h-screen bg-gray-100">
               {/* Header */}
               <Header toggleSidebar={toggleSidebar} />

               {/* Main Content Area */}
               <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar
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

export default AdminLayout;
