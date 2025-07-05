import React from "react";
import { useSelector } from "react-redux";
import { Google } from "../../Firebase/firebaseFunctions";
import { useNavigate } from "react-router";

const LoginGoogleBtn = () => {
  const mode = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const GoogleLogin = async () => {
    try {
      const user = await Google();
      if (user) {
        console.log("User Login Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={GoogleLogin}
      className={`w-full text-sm font-medium py-2.5 rounded-md flex items-center justify-center gap-2 border transition-colors ${
        mode === "dark"
          ? "border-white text-white hover:bg-gray-700"
          : "border-black text-black hover:bg-gray-100"
      }`}
    >
      <img
        className="w-5 h-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1200px-Google_Favicon_2025.svg.png"
        alt="Google Icon"
      />
      Sign up with Google
    </button>
  );
};

export default LoginGoogleBtn;
