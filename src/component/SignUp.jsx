import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/Toast";
import { AiOutlineLoading } from "react-icons/ai";
import { TextInput } from "flowbite-react";
import Cookies from 'js-cookie'

const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const schema = yup.object().shape({
    fullname: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password1: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password1")], "Password must match"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signSubmit = async (formdata) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/register/`,
        formdata
      );
      showToast("success", data.message ||"Please check your mail to verify your account.");
      reset();
      Cookies.set('isVerifyingOTP', true)
      navigate(`/auth/verify-otp?email=${formdata.email}`)
    } catch (error) {
      showToast("error", error?.response?.data?.message || error.message);
      // reset("password1");
      // reset("password2");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100dvh] h-full bg-gray-50 p-4">
      <Link to="/">
        <img
          src="/images/header-logo.jpg"
          alt="Carousel Item"
          className="h-[50px] my-10 mx-auto"
        />
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-4">
          Sign Up
        </h1>

        {/* {successMessage && <div className="text-main_color text-center mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>} */}

        <form onSubmit={handleSubmit(signSubmit)} className="space-y-4">
          <div>
            <TextInput
              type="text"
              placeholder="Full Name"
              {...register("fullname")}
              color={errors.fullname ? "failure" : ""}
              helperText={
                errors?.fullname ? (
                  <i className="text-red-500 text-xs">
                    {errors.fullname.message}
                  </i>
                ) : (
                  ""
                )
              }
              // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
            />
          </div>

          <div>
            <TextInput
              type="email"
              placeholder="Email"
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={
                errors?.email ? (
                  <i className="text-red-500 text-xs">{errors.email.message}</i>
                ) : (
                  ""
                )
              }
            />
          </div>

          <div>
            <TextInput
              type="password"
              placeholder="Password"
              {...register("password1")}
              color={errors.password1 ? "failure" : ""}
              helperText={
                errors?.password1 ? (
                  <i className="text-red-500 text-xs">
                    {errors.password1.message}
                  </i>
                ) : (
                  ""
                )
              }
            />
          </div>

          <div>
            <TextInput
              type="password"
              placeholder="Confirm Password"
              {...register("password2")}
              color={errors.password2 ? "failure" : ""}
              helperText={
                errors?.password2 ? (
                  <i className="text-red-500 text-xs">
                    {errors.password2.message}
                  </i>
                ) : (
                  ""
                )
              }
            />
          </div>

          {/* <button
            type="submit"
            className="w-full bg-main_color text-white py-2 rounded-lg  transition"
          >
            Sign Up
          </button> */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-main_color disabled:bg-main_color/50 flex items-center justify-center text-white py-2 rounded-lg  transition"
          >
            {loading ? (
              <AiOutlineLoading className="size-7 animate-spin" />
            ) : (
              " Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-main_color font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
