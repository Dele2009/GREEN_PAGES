import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Button, TextInput, Textarea, Modal } from 'flowbite-react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaSpinner, FaInfo } from 'react-icons/fa';
import { showToast } from '../utils/Toast';
import { AiOutlineLoading } from 'react-icons/ai';

const Contact = () => {
  
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    email: yup.string().email('Email is not valid').required('Email is required!'),
    phonenumber: yup.string().required('Phone number is required').matches(/^\d{11}$/, "Phone number is not valid"),
    message: yup.string().required('Message is required!')
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const contactForm = async (data) => {
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/contact-us/`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      reset()
      showToast('success', 'Message sent successfully!');
      // setModalVisible(true);
    } catch (error) {
      showToast('error', 'An error occurred while sending your message.');
      // setModalVisible(true);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-12 bg-gray-100 min-h-screen">
      {/* Contact Info Section */}
      <div className=" bg-white shadow-lg rounded-lg p-8 mb-8 h-fit">
        <h2 className="text-3xl font-bold text-gray-800 mb-6"> Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Info */}
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-main_color text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">
                Corporate Office: 18, M K O Abiola way, Ring Road, <br />
                By Bolumole Junction, Challenge, Ibadan, Oyo State, Nigeria
              </p>
            </div>
          </div>

          {/* Phone Info */}
          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="text-main_color text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600 flex flex-wrap gap-3">
                <a href='tel:08059493021' className='underline text-main_color'>0805-949-3021,</a>
                <a href='tel:08064182031' className='underline text-main_color'>0806-418-2031,</a>
                <a href='tel:08034217292' className='underline text-main_color'>0803-421-7292,</a>
                <a href='tel:08134318426' className='underline text-main_color'>0813-431-8426</a>
              </p>
            </div>
          </div>

          {/* Email Info */}
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-main_color text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">E-mail</h3>
              <p className="text-gray-600 flex flex-wrap">
                <a href="mailto:greenpagesdynamic@gmail.com" className='underline text-main_color'>greenpagesdynamic@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 h-fit">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Message</h2>

        <form onSubmit={handleSubmit(contactForm)} className="space-y-4">
          <div>
            <TextInput
              name="name"
              placeholder="Name"
              {...register("name")}
              color={errors.name ? "failure" : ""}
              helperText={errors.name?.message}
            />
          </div>
          <div>
            <TextInput
              name="email"
              placeholder="Email"
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <TextInput
              name="phonenumber"
              placeholder="Phone number"
              {...register("phonenumber")}
              color={errors.phonenumber ? "failure" : ""}
              helperText={errors.phonenumber?.message}
            />
          </div>
          <div>
            <Textarea
              name="message"
              placeholder="Enter your message"
              rows={5}
              {...register("message")}
              color={errors.message ? "failure" : ""}
              helperText={errors.message?.message}
            />
          </div>
          <Button type="submit" className="w-full flex items-center justify-center bg-main_color text-white mt-4 rounded-md">
            {loading ? <AiOutlineLoading className="animate-spin mr-2" /> : 'Submit'}
          </Button>
        </form>
      </div>

      
    </div>
  );
};

export default Contact;
