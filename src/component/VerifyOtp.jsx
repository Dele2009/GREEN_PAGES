import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/Toast";
import { AiOutlineLoading } from "react-icons/ai";

const OTPPage = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  // Validation schema
  const schema = yup.object().shape({
    otp: yup
      .array()
      .of(yup.string().required("Required").length(1, "Enter one digit"))
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits"),

    email: yup.string().email("Invalid email").required("Email is required"),
  });

  // Form setup with validation
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: Array(6).fill(""), email },
  });

  // Refs for OTP input fields
  const otpRefs = useRef(Array(6).fill(null));

  // Handle OTP input focus and backspace
  const handleOTPChange = (value, index) => {
    // console.log(typeof value, value.slice(0, 1))
    if (value.length > 1) {
      // If pasted, split value and cascade
      value
        .split("")
        .slice(0, 6)
        .forEach((val, i) => {
          setValue(`otp[${i}]`, val);
          if (otpRefs.current[i]) otpRefs.current[i].focus();
        });
    } else {
      // Handle single character input
      setValue(`otp[${index}]`, value);
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
      //else if (value === '' && index > 0) {
      //      otpRefs.current[index - 1].focus();
      // }
    }
  };

  const handleDelete = (e, index) => {
    const formValues = watch();
    // const {log} = console
    // log(formValues)
    // console.log(e, e.key)
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      !formValues.otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1].focus();
    }
  };

  //098765

  const onSubmit = async ({ otp, email }) => {
    console.log("OTP and Email:", otp, email);
    console.log("OTP and Email errors:", errors);
    // Implement further OTP verification
    let OTPtoken = "";
    otp.forEach((token) => {
      OTPtoken += token;
    });
    console.log(OTPtoken, email);
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/verify-account/${email}/`,
        {
          otp: OTPtoken,
        }
      );
      console.log(data)
      Cookies.remove("isVerifyingOTP");
      navigate("/auth/signin");
      showToast("success", "OTP verification successfull");
    } catch ({ response, message }) {
      console.error(response);
      showToast("error", response?.data?.message || message);
    } finally {
      setLoading(false)
    }
  };

  if (!email) {
    return navigate("/auth/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-main_color mb-4">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter the 6-digit OTP sent to your email:{" "}
          <span className="font-semibold text-main_color">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between">
            {Array.from({ length: 6 }).map((_, index) => (
              <Controller
                key={index}
                name={`otp[${index}]`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => (otpRefs.current[index] = el)}
                    id={`otp-${index}`}
                    type="text"
                    // maxLength={1}
                    onChange={(e) => handleOTPChange(e.target.value, index)}
                    onKeyDown={(e) => handleDelete(e, index)}
                    className="w-12 !text-center border-gray-300 rounded-lg focus:outline-none !focus:border-main_color"
                  />
                )}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-sm text-red-500 text-center">
              {errors.otp.message}
            </p>
          )}

          <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <Button
            type="submit"
            className="w-full text-center bg-main_color text-white mt-6"
          >
            {loading ? (
              <AiOutlineLoading className="size-7 animate-spin inline-block" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default OTPPage;
