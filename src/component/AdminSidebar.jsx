import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaList, FaUserPlus, FaBuilding, FaBriefcase, FaPlusCircle, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';
import '../assets/sidebar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const AdminSidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const navigate = useNavigate();

  const toggleUsers = () => setIsUsersOpen(prev => !prev);
  const toggleBusinesses = () => setIsBusinessesOpen(prev => !prev);
  const toggleAdmin = () => setIsAdminOpen(prev => !prev)
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);


  const handleAdminCick = () => {
    Cookies.remove('token');
    navigate('/admin');
};

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>NationalGreenPages</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">
              <FaTachometerAlt style={{marginRight:'10px'}}/> Admin Dashboard
            </Link>
          </li>
          <li>
            <div onClick={toggleBusinesses} className="dropdown-toggle">
              <FaBuilding style={{marginRight:'10px'}}/> Businesses <FaCaretDown style={{ marginLeft: '8px' }} />
            </div>
            <ul className={`dropdown-menu ${isBusinessesOpen ? 'open' : ''}`}>
              <li>
                <Link to="/all-business">
                  <FaBriefcase style={{marginRight:'10px'}}/> Manage Businesses
                </Link>
              </li>
              <li>
                <Link to="/pending">
                  <FaBriefcase style={{marginRight:'10px'}}/> Business Pending Approval
                </Link>
              </li>
              <li>
                <Link to="/add">
                  <FaPlusCircle style={{marginRight:'10px'}}/> Add Business
                </Link>
              </li>
            </ul>
          </li>
          <li>

          <div onClick={toggleAdmin} className="dropdown-toggle">
              <FaUsers style={{marginRight:'10px'}}/> Admin <FaCaretDown style={{ marginLeft: '8px' }} />
            </div>
            <ul className={`dropdown-menu ${isAdminOpen ? 'open' : ''}`}>
              <li>
                <Link to="/manage-admin">
                  <FaList style={{marginRight:'10px'}}/> Manage Admin
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link to="/add-admin">
                  <FaUserPlus style={{marginRight:'10px'}}/> Add Admin
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div onClick={toggleUsers} className="dropdown-toggle">
              <FaUsers style={{marginRight:'10px'}}/> Users <FaCaretDown style={{ marginLeft: '8px' }} />
            </div>
            <ul className={`dropdown-menu ${isUsersOpen ? 'open' : ''}`}>
              <li>
                <Link to="/all-users">
                  <FaList style={{marginRight:'10px'}}/> Manage User
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link to="/add-users">
                  <FaUserPlus style={{marginRight:'10px'}}/> Add User
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/logout">
              <FaSignOutAlt style={{marginRight:'10px'}} onClick={handleAdminCick}/> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;




