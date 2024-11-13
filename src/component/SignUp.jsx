import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/Toast';
import { AiOutlineLoading } from "react-icons/ai";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const schema = yup.object().shape({
    fullname: yup.string().required('Name is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    password1: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    password2: yup.string().required('Required').oneOf([yup.ref('password1')], 'Password must match'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const signSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/register/`, data);
      if (response.data.is_active === false) {
        // setSuccessMessage('Please check your mail to verify your account.');
        showToast('success', 'Please check your mail to verify your account.')
      } else {
        // setSuccessMessage('Account created successfully! Please check your mail to verify.');
        showToast('success', 'Account created successfully! Please check your mail to verify.')

      }
    } catch (error) {
      if (!error.response) {
        // setErrorMessage('Network error. Please try again later.');
        showToast('error', 'Network error. Please try again later.')

      } else if (error.response.status === 400 && error.response.data.email) {
        // setErrorMessage('Email already exists. Please use a different email.');
        showToast('error', 'Email already exists. Please use a different email.')

      } else {
        // setErrorMessage('Error creating account. Please try again.');
        showToast('error', 'Error creating account. Please try again.')

      }
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-[100dvh] h-full bg-gray-50 p-4">
      <Link to='/'>
        <img src="/images/header-logo.jpg" alt="Carousel Item" className="h-[50px] my-10 mx-auto" />
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-4">Sign Up</h1>

        {/* {successMessage && <div className="text-main_color text-center mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>} */}

        <form onSubmit={handleSubmit(signSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
            />
            {errors.fullname && <i className="text-red-500 text-xs">{errors.fullname.message}</i>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
            />
            {errors.email && <i className="text-red-500 text-xs">{errors.email.message}</i>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password1")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
            />
            {errors.password1 && <i className="text-red-500 text-xs">{errors.password1.message}</i>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("password2")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
            />
            {errors.password2 && <i className="text-red-500 text-xs">{errors.password2.message}</i>}
          </div>

          {/* <button
            type="submit"
            className="w-full bg-main_color text-white py-2 rounded-lg  transition"
          >
            Sign Up
          </button> */}
          <button disabled={loading} type="submit" className="w-full bg-main_color disabled:bg-main_color/50 flex items-center justify-center text-white py-2 rounded-lg  transition">
            {loading ? <AiOutlineLoading className="size-7 animate-spin" /> : ' Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/auth/signin" className="text-main_color font-semibold">Log in</Link>
        </p>
      </div>


    </div>
  );
};

export default SignUp;
