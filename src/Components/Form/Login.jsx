import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

// Validation Schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  // Show toast messages for validation errors
  useEffect(() => {
    Object.entries(errors).forEach(([key, value]) => {
      toast.dismiss(); // Clear existing toasts
      toast.error(value.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        toastId: key,
        icon: "⚠️",
      });
    });
  }, [errors]);

  const showErrorToast = (message) => {
    toast.error(message || "Something went wrong!", {
      position: "top-center",
      autoClose: 2500,
      theme: "colored",
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User:", userCredential.user);

      reset();
      navigate("/");
    } catch (error) {
      showErrorToast(error.message);
      setIsSubmitting(false);
    }
  };

  const mode = useSelector((state) => state.theme.mode);

  return (
    <section
      className={`w-full min-h-[100vh] flex items-center justify-center px-4 ${
        mode === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full sm:w-[80%] md:w-[60%] lg:w-[35%] max-w-md shadow-lg border px-6 md:px-8 py-10 rounded-xl ${
          mode === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <ToastContainer />
        <div className="mb-6 text-center">
          <h1
            className={`font-bold text-3xl mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Log in to Exclusive
          </h1>
          <p
            className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Enter your details below
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("email")}
          />

          {/* Password with toggle visibility */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full py-2.5 px-4 pr-11 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
                mode === "dark"
                  ? "bg-gray-700 text-white border border-gray-600"
                  : "bg-white text-gray-900 border border-gray-300"
              }`}
              {...register("password")}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <VisibilityOffIcon style={{ fontSize: 20 }} />
              ) : (
                <VisibilityIcon style={{ fontSize: 20 }} />
              )}
            </div>
          </div>

          {/* Forgot Password */}
          <Link
            to={"forgetpassword"}
            className="block text-sm text-start text-[#DB4444] hover:underline cursor-pointer"
          >
            Forget Password?
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold text-sm py-2.5 rounded-md transition-colors bg-[#DB4444] hover:bg-red-600 text-white"
          >
            {isSubmitting ? "Please wait for few seconds..." : "Log In"}
          </button>

          {/* Signup Link */}
          <div className="mt-4 text-center">
            <p
              className={`text-sm ${
                mode === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Don't have an account?{" "}
              <Link to={"signup"} className="text-red-500 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
