import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { auth } from "../../Firebase/Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router";

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

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(user);
  //   } else {
  //     console.log("User is signed out");
  //   }
  // });

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

  // Handle form submission
  const onSubmit = async (data) => {
    let { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("✅ Logged in successfully!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
      console.log(user);
      reset();

      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
      reset();
    }
  };

  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[35%] max-w-md bg-white shadow-lg border border-gray-200 px-6 md:px-8 py-10 rounded-xl">
        <ToastContainer />

        <div className="mb-6 text-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-2">
            Log in to Exclusive
          </h1>
          <p className="text-sm text-gray-500">Enter your details below</p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className="w-full py-2.5 px-4 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
            {...register("email")}
          />

          {/* Password */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full py-2.5 px-4 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500"
            {...register("password")}
          />

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
            className="w-full bg-[#DB4444] text-white font-semibold text-sm py-2.5 rounded-md hover:bg-red-600 transition-colors"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              {/* <span
                onClick={() => navigate("/auth/signup")}
                className="text-red-500 hover:underline"
              >
                Create one
              </span> */}
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
