import React, { useState } from 'react';
import '../assets/dashboard.css';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin/`, data);
      if (response.data && response.data.key) {
        Cookies.set('token', response.data.key);
        Cookies.set('is_staff', response.data.is_staff);
        setModalMessage('You have successfully logged in');
        setModalType('success');
        setIsLoggedIn(true);
      } else {
        setModalMessage('Login failed. Please check your credentials.');
        setModalType('error');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setModalMessage(error.response.data.detail);
      } else {
        setModalMessage('An error occurred. Please try again later.');
      }
      setModalType('error');
    } finally {
      setIsModalOpen(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/dashboard' replace={true} />;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='login-box-header'>
          <h2>Admin Login</h2>
          <img src='/images/header-logo.jpg' alt="Header Logo" />
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="login-form">
          <input
            type="email"
            placeholder="Email"
            name='email'
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            {...register('password')}
          />
          <button type="submit" className="login-button">Log In</button>
        </form>

        {isModalOpen && (
          <div className={`modal ${modalType}`}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
