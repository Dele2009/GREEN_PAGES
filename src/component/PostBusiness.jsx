import React, { useState } from 'react';
import axios from 'axios';
import '../assets/post.css';
import Header from './Header';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import FooterCarousel from './FooterCarousel';

const PostBusiness = () => {
    const [image, setImage] = useState('images/upload.png');
    const [productImage, setProductImage] = useState('images/upload.png');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const schema = yup.object().shape({
        companyname: yup.string().required('Name is required!'),
        email: yup.string().email('Email is not valid').required('Email is required!'),
        state: yup.string().required('State is required'),
        localgovernment: yup.string().required('This field is required!'),
        town: yup.string().required('Please enter your town'),
        phonenumber: yup.string().required('Phone number is required').matches(/^\d{11}$/, "Phone number is not valid"),
        whatsappnumber: yup.string().matches(/^\d{11}$/, 'Number is not valid'),
        categoryofbusiness: yup.string().required('Input a Business Category'),
        website: yup.string(),
        ceoImg: yup.string(),
        productImage: yup.string(),
        staffstrength: yup.string().required('Required!'),
        address: yup.string().required('Required!'),
        isAuthorized: yup.boolean().oneOf([true], 'You must authorize to proceed'),
    });

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {
        setLoading(true);
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        const ceoImageFile = document.getElementById('imgs').files[0];
        const productImageFile = document.getElementById('productImg').files[0];

        if (ceoImageFile) {
            formData.append('ceoImg', ceoImageFile);
        }
        if (productImageFile) {
            formData.append('logo', productImageFile);
        }

        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/add-business/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${Cookies.get('token')}`,
                },
            });
            setMessage('Business Submitted For Approval')
            setIsSuccess(true);
            reset()
            setImage('images/upload.png');
            setProductImage('images/upload.png');
        } catch (err) {
            setMessage(err.message);
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setMessage('');
    };

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleProduct = (e) => {
        setProductImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className='post'>
            <Header />
            <div className='form'>
                <h1>Data Collation Form</h1>
                <form onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor='companyname'>Company Name</label>
                    <input type='text' name='companyname' {...register("companyname")} />
                    <p>{errors.companyname?.message}</p>

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' {...register("email")} />
                    <p>{errors.email?.message}</p>

                    <label htmlFor='state'>State</label>
                    <input type='text' name='state' {...register("state")} />
                    <p>{errors.state?.message}</p>

                    <label htmlFor='localgovernment'>Local Government</label>
                    <input type='text' name='localgovernment' {...register("localgovernment")} />
                    <p>{errors.localgovernment?.message}</p>

                    <label htmlFor='town'>Town/City</label>
                    <input type='text' name='town' {...register("town")} />
                    <p>{errors.town?.message}</p>

                    <label htmlFor='phonenumber'>Phone Number</label>
                    <input type='text' name='phonenumber' {...register("phonenumber")} />
                    <p>{errors.phonenumber?.message}</p>

                    <label htmlFor='whatsappnumber'>WhatsApp Number</label>
                    <input type='text' name='whatsappnumber' {...register("whatsappnumber")} />
                    <p>{errors.whatsappnumber?.message}</p>

                    <label htmlFor='categoryofbusiness'>Category Of Business</label>
                    <input type='text' name='categoryofbusiness' {...register("categoryofbusiness")} />
                    <p>{errors.categoryofbusiness?.message}</p>

                    <label htmlFor='website'>Website</label>
                    <input type='text' name='website' {...register("website")} />
                    <p>{errors.website?.message}</p>

                    <label htmlFor='staffstrength'>Staff Strength</label>
                    <input type='text' name='staffstrength' {...register("staffstrength")} />
                    <p>{errors.staffstrength?.message}</p>

                    <label htmlFor='ceoImg'>Selfie photo of CEO</label>
                    <div className='upload'>
                        <input
                            type='file'
                            id='imgs'
                            style={{ display: 'none' }}
                            onChange={handleImage}
                        />
                        <img src={image} alt='CEO' />
                        <label htmlFor='imgs'>Upload a photo</label>
                    </div>

                    <label htmlFor='logo'>Product/Signboard's photo</label>
                    <div className='upload'>
                        <input
                            type='file'
                            id='productImg'
                            style={{ display: 'none' }}
                            onChange={handleProduct}
                        />
                        <img src={productImage} alt='Product/Signboard' />
                        <label htmlFor='productImg'>Upload a photo</label>
                    </div>

                    <label htmlFor='address'>Address</label>
                    <textarea name='address' {...register("address")}></textarea>
                    <p>{errors.address?.message}</p>

                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="isAuthorized"
                            {...register("isAuthorized")}
                            checked={isAuthorized}
                            onChange={() => setIsAuthorized(!isAuthorized)}
                        />
                        <label>I, the CEO of <strong>{watch("companyname")}</strong>, authorize National Greenpages business directory to publish my business on their page and website.</label>
                    </div>
                    <p>{errors.isAuthorized?.message}</p>

                    <button type='submit'>Submit</button>
                </form>
            </div>
            <FooterCarousel />
            <Footer />

            {message && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{message}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostBusiness;
