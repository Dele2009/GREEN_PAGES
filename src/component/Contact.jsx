import React, { useState } from 'react'
import '../assets/Contact.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'


const Contact = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    email: yup.string().email('Email is not valid').required('Email is required!'),
    phonenumber: yup.string().required('Phone number is required').matches(/^\d{11}$/, "Phone number is not valid"),
    message: yup.string().required('Required!')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const contactForm = async (data) => {
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/contact-us/`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      setModalMessage('Message sent successfully!');

    } catch (error) {
      setModalMessage('An error occurred while sending your message.');
    }
  };

  const closeModal = () => {
    setModalMessage('')
  };

 

  return (
    <div>
      <div className='con-body'>
        <div className='contact'>

          <div className='contact-container'>

            <div className='contact-info'>
              <h2 style={{ textAlign: 'left', fontSize: '26px', fontWeight: '600', marginLeft: '35px', color: '#000', marginBottom: '20px' }}>Contact Us</h2>
              <div className='infos'>

                <div className='icon'>
                  <img src='' />
                </div>
                <div className='contact-text'>
                  <h3>Address</h3>
                  <p> Corporate Office: 18, M K O Abiola way, Ring Road,
                    By Bolumole Junction, Challenge, Ibadan, Oyo State, Nigeria</p>
                </div>
              </div>

              <div className='infos'>
                <div className='icon'>
                  <img src='images/bi_phone-fill.png' />
                </div>
                <div className='contact-text'>
                  <h3>Phone</h3>
                  <p>0805-949-3021, 0806-418-2031, 02-7518154,
                    0803-421-7292, 02-2022177, 02-2005445</p>
                </div>
              </div>
            </div>
          </div>
          <div className='contact-form'>
            <form onSubmit={handleSubmit(contactForm)}>
              <h2>Send Message</h2>
              <div className='input'>
                <input type='text'
                  name='name'
                  placeholder='Name'
                  {...register("name")}
                />
                <p>{errors.name?.message}</p>
              </div>
              <div className='input'>
                <input type='text'
                  name='email'
                  placeholder='Email'
                  {...register("email")}
                />
              </div>
              <p>{errors.email?.message}</p>
              <div className='input'>
                <input type='text'
                  name='phonenumber'
                  placeholder='Phone number'
                  {...register("phonenumber")}
                />
              </div>
              <p>{errors.phonenumber?.message}</p>
              <div className='input'>
                <textarea type='text'
                  name='text'
                  placeholder='Enter your message'
                  {...register("message")} />
              </div>

              <div className='input'>
                <input type='submit' value='submit' />
              </div>
            </form>

          </div>
        </div>
      </div>
      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact

