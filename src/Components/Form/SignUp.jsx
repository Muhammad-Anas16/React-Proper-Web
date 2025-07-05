import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import { addUser } from "../../Firebase/firebaseFunctions";
import LoginGoogleBtn from "./LoginGoogle";

// Schema
const schema = yup.object({
  username: yup
    .string()
    .required("Name is required")
    .min(3, "At least 3 characters required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    Object.entries(errors).forEach(([key, value]) => {
      toast.dismiss();
      toast.error(value.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        icon: "⚠️",
        toastId: key,
        theme: "colored",
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
    const { username, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL:
          "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
      });

      await addUser({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      })

      toast.success("🎉 Account created successfully!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        onClose: () => navigate("/"),
      });

      reset();
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
            Create an account
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
          {/* Username */}
          <input
            type="text"
            placeholder="Name"
            className={`w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-500 ${
              mode === "dark"
                ? "bg-gray-700 text-white border border-gray-600"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
            {...register("username")}
          />

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

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold text-sm py-2.5 rounded-md transition-colors bg-[#DB4444] hover:bg-red-600 text-white"
          >
            {isSubmitting ? "Please wait..." : "Create Account"}
          </button>

          {/* Google Signup */}
          <LoginGoogleBtn />

          {/* navigate to Login */}
          <p
            className={`text-sm text-center pt-2 ${
              mode === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
