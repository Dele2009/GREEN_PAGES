// DashboardLayout.js
import React, { useState } from 'react';
import {Outlet} from 'react-router-dom'
import UserSidebar from '../component/UserSidebar';
import UserHeader from '../component/UserHeader';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
     <UserSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UserHeader isSidebarOpen={isSidebarOpen}/>

        {/* Page Content */}
        <main className="overflow-y-auto p-4 bg-gray-100 flex-1">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
