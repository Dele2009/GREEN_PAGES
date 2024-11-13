import React, { useRef } from 'react';
import '../assets/dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const AdminHeader = () => {
  const myref = useRef()

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = myref.current.value;
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/find-business/?search=${searchTerm}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <div className='header-search-input'>
        <form className='search-menu' onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search Businesses"
            ref={myref}
          />
        </form>
      </div>
      <div className="header-right">
        <h3>WELCOME! ADMIN</h3>
        <Link to='/'>View Site</Link>
      </div>
    </header>
  );
};

export default AdminHeader;

