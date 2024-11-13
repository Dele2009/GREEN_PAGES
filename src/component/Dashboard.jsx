import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaBuilding, FaClipboardList, FaUserCog, FaPlusSquare } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', icon: FaUsers, value: 1200, color: 'bg-main_color' },
    { title: 'Total Businesses', icon: FaBuilding, value: 300, color: 'bg-main_color/70' },
  ];

  const actions = [
    { label: 'Business Pending Approval', icon: FaClipboardList, path: '/admin/pending-businesses' },
    { label: 'Manage Business', icon: FaUserCog, path: '/admin/all-businesses' },
    { label: 'Add New Business', icon: FaPlusSquare, path: '/admin/add-business' },
    { label: 'Manage User', icon: FaUsers, path: '/admin/all-users' },
  ];

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="text-left mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Overview and management at your fingertips</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${stat.color} text-white p-6 rounded-lg shadow-md hover:scale-105 transform transition`}
          >
            <stat.icon className="size-32 opacity-80" />
            <div className="text-right">
              <h2 className="text-2xl font-semibold">{stat.title}</h2>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            // onClick={() => navigate(`/admin/${action.label.toLowerCase().replace(/\s+/g, '-')}`)}
            className="flex flex-col items-center p-10 bg-white text-center border border-gray-200 rounded-lg shadow-md group hover:bg-main_color hover:text-white cursor-pointer transition transform hover:-translate-y-1"
          >
            <action.icon className="size-14 text-main_color group-hover:text-white mb-5" />
            <p className="font-semibold text-gray-700 group-hover:text-white">{action.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
