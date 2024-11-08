import React from 'react';
import { FaFileAlt, FaBuilding, FaPlusSquare } from 'react-icons/fa';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="text-2xl font-bold text-green-800 mb-6">Welcome to your dashboard!</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card onClick={() => navigate('/member/user-pending')} className="cursor-pointer flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
            <FaFileAlt className="text-green-600 text-4xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Business Pending Approval</h2>
            <p className="text-sm text-gray-500 text-center">View and manage businesses that are awaiting approval.</p>
          </Card>

          <Card onClick={() => navigate('/member/user-all')} className="cursor-pointer flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
            <FaBuilding className="text-green-600 text-4xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Manage Business</h2>
            <p className="text-sm text-gray-500 text-center">Edit or update information for your existing businesses.</p>
          </Card>

          <Card onClick={() => navigate('/member/user-add')} className="cursor-pointer flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow">
            <FaPlusSquare className="text-green-600 text-4xl mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Add New Business</h2>
            <p className="text-sm text-gray-500 text-center">Register a new business to be added to the system.</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
