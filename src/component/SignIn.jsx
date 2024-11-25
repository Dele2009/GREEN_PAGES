import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { BiX } from "react-icons/bi";
import { showToast } from "../utils/Toast";
import { AiOutlineLoading } from "react-icons/ai";
import { TestTable } from "./h";
import { TextInput } from "flowbite-react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const resetSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Provide your email address here"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: resetRegister,
    handleSubmit: resetHandleSubmit,
    reset: resetReset,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const signSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/login/`,
        data
      );
      console.log(response)
      if (response.data && response.data.key) {
        Cookies.set("token", response.data.key);
        Cookies.set("is_staff", response.data.user.is_staff);
        Cookies.set("email", response.data.user.email);
        Cookies.set("full_name", response.data.user.fullname);
        // setSuccess('Successfully logged in');
        // setError('');
        showToast("success", "Successfully logged in");
        navigate("/member/dashboard");
      } else {
        showToast("error", "Login failed. Check your credentials.");
        // setError('Login failed. Check your credentials.');
      }
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "An error occurred. Please try again."
      );
      // setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (resetdata) => {
    setResetLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/forgot-password/`,
        resetdata
      );
      console.log(data);
      Cookies.set("isVerifyingOTP", true);
      resetReset();
      setShowForgotPassword(false);
      showToast("success", "Password reset email sent. Check your inbox.");
      navigate(`/auth/verify-otp?email=${resetdata.email}`);
    } catch (err) {
      console.log(err);
      showToast("error", err.response?.data?.message || err.message);
      // setError(err.response?.data?.message || 'Error sending password reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[100dvh] h-full bg-gray-50 p-4">
        <Link to="/">
          <img
            src="/images/header-logo.jpg"
            alt="Carousel Item"
            className="h-[50px] my-10 mx-auto"
          />
        </Link>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
            Sign In
          </h1>
          {success && (
            <div className="text-green-600 text-center mb-4">{success}</div>
          )}
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit(signSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
              />
              {errors.email && (
                <i className="text-red-500 text-xs">{errors.email.message}</i>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-main_color"
              />
              {errors.password && (
                <i className="text-red-500 text-xs">
                  {errors.password.message}
                </i>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-main_color disabled:bg-main_color/50 flex items-center justify-center text-white py-2 rounded-lg  transition"
            >
              {loading ? (
                <AiOutlineLoading className="size-7 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
            <p
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-green-600 cursor-pointer text-center mt-2"
            >
              Forgot Password?
            </p>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        {showForgotPassword && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                <BiX
                  className="bg-gray-100 rounded-full mb-4"
                  size={30}
                  onClick={() => {
                    resetReset();
                    setShowForgotPassword(false);
                  }}
                />
              </div>
              <p className="mb-4">
                Enter your email to receive a password reset link:
              </p>
              <form
                onSubmit={resetHandleSubmit(handleForgotPassword)}
                className="space-y-4"
              >
                <TextInput
                  {...resetRegister("email")}
                  type="text"
                  placeholder="Your email"
                  color={resetErrors.email ? "failure" : ""}
                  helperText={resetErrors.email?.message}
                  //   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
                />

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-2 bg-main_color text-white text-center font-bold rounded-md disabled:bg-green-400 transition duration-300"
                >
                  {resetLoading ? (
                    <AiOutlineLoading className="size-7 animate-spin inline-block" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* // <TestTable/> */}
    </>
  );
};

export default SignIn;
