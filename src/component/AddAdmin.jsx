import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { AiOutlineLoading } from 'react-icons/ai'
import { showToast } from '../utils/Toast'

const AddAdmin = () => {
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        fullname: yup.string().required('Name is required'),
        email: yup.string().email('Email is not valid').required('Email is required'),
        password1: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        password2: yup.string().oneOf([yup.ref('password1')], 'Passwords must match').required('Confirmation is required')
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const submit = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/add-user/`, data, {
                params: {
                    user_type: 'staff'
                },
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                }
            })
            console.log(response)
            showToast('success', 'Admin account created successfully')
            reset()
        } catch (error) {
            showToast('error', error.response?.status === 400 ? 'Email already exists' : 'An error occurred. Please try again')
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-700 text-center">Add New Admin</h2>
                <p className="text-gray-500 text-center mt-2 mb-8">
                    Please fill in the details below to create a new admin account.
                </p>

                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            {...register('fullname')}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:border-main_color focus:ring focus:ring-main_color"
                            placeholder="Enter full name"
                        />
                        {errors.fullname && <p className="text-red-500 mt-1 text-sm">{errors.fullname.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:border-main_color focus:ring focus:ring-main_color"
                            placeholder="Enter email address"
                        />
                        {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            {...register('password1')}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:border-main_color focus:ring focus:ring-main_color"
                            placeholder="Enter password"
                        />
                        {errors.password1 && <p className="text-red-500 mt-1 text-sm">{errors.password1.message}</p>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            {...register('password2')}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:border-main_color focus:ring focus:ring-main_color"
                            placeholder="Re-enter password"
                        />
                        {errors.password2 && <p className="text-red-500 mt-1 text-sm">{errors.password2.message}</p>}
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex justify-center items-center w-full py-3 mt-6 bg-main_color text-white font-semibold rounded-lg shadow-md hover:bg-main_color_dark transition"                    >
                        {loading ? <AiOutlineLoading className="size-7 animate-spin" /> : ' Create Admin'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin
