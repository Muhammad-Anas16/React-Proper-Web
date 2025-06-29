import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

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

  const mode = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 ${
        mode === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <ToastContainer />
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md ${
          mode === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-2 ${
            mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Forgot Password
        </h2>
        <p
          className={`text-center mb-6 ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Enter your email to reset your password
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${
                mode === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : mode === "dark"
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-red-500"
                  : "bg-white text-gray-900 border-gray-300 focus:ring-red-500"
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
            <span
              onClick={() => navigate("/auth")}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
