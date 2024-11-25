import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaBuilding,
  FaPlusSquare,
  FaClipboardList,
  FaChartLine,
  FaUser,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { Card } from "flowbite-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/Toast";
import { AiOutlineLoading } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [statValue, setStatValue] = useState({
    total_verified_businesses: 0,
    total_pending_businesses: 0,
    // total_rejected_businesses: 0,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/user-stats/`,
          {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          }
        );
        console.log(data);
        setStatValue({ ...data });
      } catch (error) {
        console.log("admin stats error", error);
        showToast("warning", "Dashboard statistics could not be loaded");
      } finally {
        setLoading(false);
      }

      // setTimeout(() => {
      //   setStatValue({ userCount: 10, businessesCount: 10 });
      //   setLoading(false)
      // }, 4000)
    })();
  }, []);

  // Example statistics data
  const stats = [
    {
      title: "Active Businesses",
      count: statValue.total_verified_businesses, // replace with actual data from backend
      icon: FaCheckCircle,
      color: "bg-main_color",
    },
    {
      title: "Pending Businesses",
      count: statValue.total_pending_businesses, // replace with actual data from backend
      icon: FaClock,
      color: "bg-main_color/70",
    },
  ];

  // Section data for main dashboard options
  const sections = [
    {
      title: "Add New Business",
      description: "Register a new business to be added to the system.",
      icon: FaPlusSquare,
      path: "/member/add-business",
    },
    {
      title: "Manage Business",
      description: "Edit or update information for your existing businesses.",
      icon: FaBuilding,
      path: "/member/all-businesses",
    },
    {
      title: "Business Pending Approval",
      description: "View and manage businesses that are awaiting approval.",
      icon: FaFileAlt,
      path: "/member/pending-businesses",
    },
    // {
    //   title: 'Reports & Analytics',
    //   description: 'Access business performance reports and analytics.',
    //   icon: FaChartLine,
    //   path: '/member/reports',
    // },
    // {
    //   title: 'Profile & Settings',
    //   description: 'Update your profile and account settings.',
    //   icon: FaUser,
    //   path: '/member/profile',
    // },
    // {
    //   title: 'Task Management',
    //   description: 'Track and manage tasks related to your business.',
    //   icon: FaClipboardList,
    //   path: '/member/tasks',
    // },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="text-2xl font-bold text-dash_main_color mb-6">
        Welcome to your dashboard!
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`!flex items-center justify-between text-white ${stat.color} p-6 shadow-lg rounded-lg`}
          >
            <stat.icon className="size-32 opacity-80" />
            <div className="text-right">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-3xl font-bold">
                {loading ? (
                  <AiOutlineLoading className="animate-spin inline-block" />
                ) : (
                  stat.count
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card
            key={index}
            onClick={() => navigate(section.path)}
            className="cursor-pointer flex flex-col items-center justify-center bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl group hover:bg-main_color hover:text-white transition transform hover:-translate-y-1"
          >
            <section.icon className="text-main_color m-auto text-4xl mb-4  group-hover:text-white" />
            <h2 className="text-lg text-center font-semibold text-gray-700 group-hover:text-white">
              {section.title}
            </h2>
            <p className="text-sm text-gray-500 text-center group-hover:text-white">
              {section.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
