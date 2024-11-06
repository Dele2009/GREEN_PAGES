import React, { useState } from 'react';
import '../assets/signIn.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import FooterCarousel from './FooterCarousel';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SignIn = () => {
    const [showMail, setShowMail] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('Email is not valid').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const signSubmit = async (data) => {
        try {
            console.log(import.meta.env.REACT_APP_API_URL)
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/login/`, data);
            if (response.data && response.data.key) {
                Cookies.set('token', response.data.key);
                Cookies.set('email', data.email);
                Cookies.set('is_staff', response.data.is_staff);
                setSuccess('You have successfully logged in');
                setError('');
                navigate('/user-dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
                setShowModal(true);
            }
        } catch (err) {
            setSuccess('');
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('An error occurred. Please try again later.');
            }
            setShowModal(true);
        }
    };

    const handleClick = () => {
        setShowMail(!showMail);
    };

    const closeModal = () => {
        setShowModal(false);
        setSuccess('');
        setError('');
        setShowForgotPassword(false);
    };

    const handleForgotPassword = async (email) => {
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/password-reset/`, { email });
            setSuccess('Password reset email sent. Please check your inbox.');
            setError('');
            setShowForgotPassword(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending password reset email.');
            setSuccess('');
        } finally {
            setShowModal(true);
        }
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
    };

    return (
        <div>
            <Header />
            <div className='sign'>
                <div className='section-con'>
                    <h1>Sign In</h1>
                    <div className='sign-in'>
                        <div className='gmail'>
                            {success && <div style={{ color: 'green', fontSize: '17px' }} className='s-e'>{success}</div>}
                            <button onClick={handleClick}>
                                <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
                                Sign in with Email
                            </button>

                            <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
                                <div className='input-img-sign-in'>
                                    <input
                                        placeholder='Email'
                                        name='email'
                                        type='email'
                                        {...register("email")}
                                    />
                                    <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
                                </div>
                                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.email?.message}</p>
                                <div className='input-img-sign-in'>
                                    <input
                                        placeholder='Password'
                                        name='password'
                                        type='password'
                                        {...register("password")}
                                    />
                                    <img src='/images/carbon_password.png' alt='Password Icon' />
                                </div>
                                <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password?.message}</p>
                                <button type='submit'>Submit</button>
                                <p onClick={() => setShowForgotPassword(true)} style={{ cursor: 'pointer', color: 'green', marginTop: '10px', marginLeft: '10px' }}>Forgot Password?</p>
                            </form>
                        </div>

                        <div className='alreadylogged'>
                            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
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
                        <p style={{ color: 'red' }}>{error}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {showForgotPassword && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Reset Password</h2>
                        <p>Enter your email to receive a password reset link:</p>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.elements.email.value;
                            handleForgotPassword(email);
                        }}>
                            <input type="email" name="email" placeholder="Your email" required />
                            <button type="submit">Send Reset Link</button>
                        </form>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default SignIn;



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