import React, { useState } from 'react';
import axios from 'axios';
import '../assets/add-admin.css';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';

const AddAdmin = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    const schema = yup.object().shape({
        fullname: yup.string().required('Name is required'),
        email: yup.string().email('Email is not valid').required('Email is required'),
        password1: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
        password2: yup.string().required('Required').oneOf([yup.ref('password1')], 'Passwords must match'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const submit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/add-admin/`, data, {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                }
            });
            console.log(response)
            setModalType('success');
            setModalMessage('Account created successfully');
            setModalVisible(true);
        } catch (error) {
            if (!error.response) {
                setModalType('error');
                setModalMessage('Network error. Please try again later.');
            } else if (error.response.status === 400 && error.response.data.message) {
                setModalType('error');
                setModalMessage('Email already exists. Please use a different email.');
            } else {
                setModalType('error');
                setModalMessage('Error creating account. Please try again.');
            }
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage('');
    };

    return (
        <div>
            <AdminHeader />
            <AdminSidebar />
            <div className="add-admin-container">
                <h2>Add Admin</h2>
                <form onSubmit={handleSubmit(submit)} className="admin-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" {...register('fullname')} />
                        {errors.fullname && <p className="error">{errors.fullname.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" {...register('email')} />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" {...register('password1')} />
                        {errors.password1 && <p className="error">{errors.password1.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" {...register('password2')} />
                        {errors.password2 && <p className="error">{errors.password2.message}</p>}
                    </div>
                    <button type="submit" className="submit-button">Create Admin</button>
                </form>
            </div>

            {modalVisible && (
                <div className="modal">
                    <div className={`modal-content ${modalType}`}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAdmin;

