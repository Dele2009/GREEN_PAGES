import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showToast } from '../utils/Toast';
import { AiOutlineLoading } from 'react-icons/ai';

const AdminLogin = () => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/admin/`, data);
      console.log(response)
      if (response.data && response.data.key) {
        Cookies.set('token', response.data.key);
        Cookies.set('is_staff', response.data.user.is_staff);
        Cookies.set('email', response.data.user.email);
        Cookies.set('full_name', response.data.user.fullname);
        showToast('success', 'You have successfully logged in');
        // setModalType('success');
        setIsLoggedIn(true);
      } else {
        showToast('error', 'Login failed. Please check your credentials.');
        // setModalType('error');
      }
    } catch (error) {
      showToast('error', error.response?.data?.detail || 'An error occurred. Please try again later.');
      // setModalType('error');
    } finally {
      setLoading(false);
    }
  };

  // if (Cookies.get('token')) {
  //   showToast('warning', 'You are currently logged-in, Logout to proceed')
  //   return <Navigate to='/admin/dashboard' replace={true} />
    
  // }

  if (isLoggedIn) {
    return <Navigate to='/admin/dashboard' replace={true} />;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <img src='/images/header-logo.jpg' alt="Header Logo" className="mb-6 h-12" />
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              name='email'
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-main_color`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name='password'
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-main_color`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button disabled={loading} type="submit" className="w-full bg-main_color disabled:bg-main_color/50 flex items-center justify-center text-white py-2 rounded-lg  transition">
            {loading ? <AiOutlineLoading className="size-7 animate-spin" /> : 'Log In'}
          </button>
        </form>

        {isModalOpen && (
          <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 absolute top-2 right-2">&times;</button>
              <p className={`text-center ${modalType === 'success' ? 'text-main_color' : 'text-red-500'}`}>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
