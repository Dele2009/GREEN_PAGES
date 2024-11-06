import React, { useState } from 'react';
import '../assets/All-users.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import Cookies from 'js-cookie'

const AddUser = () => {
  const [navigate, setNavigate] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/add-user/`, {
        fullname: data.fullname,
        email: data.email,
        password1: data.password1,
        password2: data.password2
      }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        }
      });
      console.log(response)
      setSuccessMessage('Account created successfully');
      setErrorMessage('');
      setShowModal(true);
    } catch (error) {
      if (!error.response) {
        setErrorMessage('Network error. Please try again later.');
      } else if (error.response.status === 400 && error.response.data.email) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        setErrorMessage('Error creating account. Please try again.');
      }
      setSuccessMessage('');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="add-user">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit(signSubmit)}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name='name'
              {...register('fullname')}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name='email'

              {...register('email')}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name='password1'
              {...register('password1')}

            />
            <p>{errors.password1?.message}</p>
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name='passwor2'
              {...register('password2')}

            />
            <p>{errors.password2?.message}</p>
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{successMessage || errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
