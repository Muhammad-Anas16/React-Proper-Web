import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router';

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success("✅ Reset link sent!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
      reset(); // Clear the form
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to reset your password
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
          <div className="mt-4 text-center">
            <span onClick={() => navigate("/auth")} className="text-sm text-red-500 hover:underline">
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
