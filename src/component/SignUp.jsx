import React, { useState } from 'react';
import '../assets/signIn.css';
import Header from './Header';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SignUp = () => {
  const [showMail, setShowMail] = useState(false);
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
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/register/`, data);
      if (response.data.is_active === false) {
        setSuccessMessage('Please check your mail to verify your account.');
      } else {
        setSuccessMessage('Account created successfully! Please check your mail to verify.');
      }
    } catch (error) {
      if (!error.response) {
        setErrorMessage('Network error. Please try again later.');
      } else if (error.response.status === 400 && error.response.data.email) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        setErrorMessage('Error creating account. Please try again.');
      }
    } finally {
      setShowModal(true);
    }
  };

  const handleClick = () => {
    setShowMail(!showMail);
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }

  return (
    <div>
      <Header />
      <div className='sign'>
        <div className='section-con'>
          <h1>SignUp</h1>
          <div className='sign-in'>
            <div className='gmail'>
              <button onClick={handleClick}>
                <img src='/images/mdi_email-edit-outline.png' alt="Email" /> Sign up with Email
              </button>

              <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
                <div className='input-img-sign-in'>
                  <input
                    placeholder='Full Name'
                    name='fullname'
                    type='text'
                    {...register("fullname")}
                  />
                  <img src='images/name.png' alt="Name" />
                </div>
                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.fullname?.message}</p>

                <div className='input-img-sign-in'>
                  <input
                    placeholder='Email'
                    name='email'
                    type='email'
                    {...register("email")}
                  />
                  <img src='/images/mdi_email-edit-outline.png' alt="Email" />
                </div>
                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.email?.message}</p>

                <div className='input-img-sign-in'>
                  <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    {...register("password1")}
                  />
                  <img src='/images/carbon_password.png' alt="Password" />
                </div>
                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password1?.message}</p>

                <div className='input-img-sign-in'>
                  <input
                    placeholder='Confirm Password'
                    name='password'
                    type='password'
                    {...register("password2")}
                  />
                  <img src='/images/carbon_password.png' alt="Confirm Password" />
                </div>
                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password2?.message}</p>

                <button type='submit'>Submit</button>
              </form>
            </div>
            <div className='alreadylogged'>
              <p>Already have an account?<Link to='/signin'> Log in</Link></p>
            </div>
          </div>
        </div>
        <Carousel {...settings}>
          <img src='/images/header-logo.jpg' />
          <img src='/images/logo.png' />
          <img src='/images/header-logo.jpg' />
          <img src='/images/logo.png' />
          <img src='/images/header-logo.jpg' />
          <img src='/images/logo.png' />
          <img src='/images/header-logo.jpg' />
          <img src='/images/logo.png' />
          <img src='/images/header-logo.jpg' />
          <img src='/images/logo.png' />
        </Carousel>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{successMessage || errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SignUp;

const Carousel = styled(Slider)`
    padding-top: 160px;
    padding-bottom: 20px;
    color: #fff;
    cursor: pointer;
    width: 100%;

    img{
        width: 70% !important;
        height: 40px;
        padding: 0 50px;

        @media(max-width:600px){
            width: 20%;
            padding: 0 20px;
      }
    }

    ul li button{
        &:before{
            display: none;
        }
        display: none;
    }

    li.slick-active button:before{
        color: white;
        display: none;
    }

    .slick-list{
        overflow: hidden;
    }

    .slick-prev{
      display: none;
    }
    .slick-next{
      display: none;
      right: 0;
    }
    .slick-prev::before{
        display: none;
    }
    .slick-prev::after {
      display: none;
  }
    .slick-next::before{
        display: none;
    }

    .slick-next::after {
      display: none;
    }

`