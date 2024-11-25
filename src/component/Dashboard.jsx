import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaUserCog,
  FaPlusSquare,
  FaSpinner,
  FaUserShield,
} from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineLoading } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statValue, setStatValue] = useState({
    total_admins: 0,
    total_users: 0,
    total_verified_businesses: 0,
    total_pending_businesses: 0,
    total_rejected_businesses: 0,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/admin-stats/`,
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = [
    {
      title: "Total Admins",
      icon: FaUserShield,
      value: statValue.total_admins,
      color: "bg-main_color",
    },
    {
      title: "Total Users",
      icon: FaUsers,
      value: statValue.total_users,
      color: "bg-main_color/70",
    },
    {
      title: "Total Businesses",
      icon: FaBuilding,
      value: statValue.total_verified_businesses,
      color: "bg-main_color",
    },
  ];

  const actions = [
    {
      label: "Manage Business",
      icon: FaUserCog,
      path: "/admin/all-businesses",
    },
    {
      label: "Business Pending Approval",
      icon: FaClipboardList,
      path: "/admin/pending-businesses",
      count: statValue.total_pending_businesses,
    },
    {
      label: "Add New Business",
      icon: FaPlusSquare,
      path: "/admin/add-business",
    },
    { label: "Manage User", icon: FaUsers, path: "/admin/all-users" },
  ];

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="text-left mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">
          Overview and management at your fingertips
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 w-full mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${stat.color} text-white p-6 rounded-lg shadow-md hover:scale-105 transform transition`}
          >
            <stat.icon className="size-32 opacity-80" />
            <div className="text-right">
              <h2 className="text-2xl font-semibold">{stat.title}</h2>
              <p className="text-4xl font-bold">
                {loading ? (
                  <AiOutlineLoading className="animate-spin inline-block" />
                ) : (
                  stat.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            // onClick={() => navigate(`/admin/${action.label.toLowerCase().replace(/\s+/g, '-')}`)}
            className="relative flex flex-col items-center p-10 bg-white text-center border border-gray-200 rounded-lg shadow-md group hover:bg-main_color hover:text-white cursor-pointer transition transform hover:-translate-y-1"
          >
            {action.count > 0 && (
              <div className="absolute -top-1 -right-1 px size-8 font-bold grid place-items-center text-white rounded-full bg-[#ff0000]">
                {loading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  <span>{action.count}</span>
                )}
              </div>
            )}
            <action.icon className="size-14 text-main_color group-hover:text-white mb-5" />
            <p className="font-semibold text-gray-700 group-hover:text-white">
              {action.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
