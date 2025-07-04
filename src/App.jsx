import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/Home";
import SignUp from "./Components/Form/SignUp";
import Login from "./Components/Form/Login";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import { Route, Routes, useLocation } from "react-router";
import Page404 from "./Pages/PageNotFound";
import { Shop } from "./TenStack/Shop";
import ProductDetail from "./Pages/ProductDetail";
import BillingDetail from "./Pages/BillingDetail";
import Product from "./Pages/Product";
import ForgotPassword from "./Pages/ForgetPassword";
import { auth } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setIsLogin } from "./Redux/IsLogin/IsLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCustomProducts } from "./Redux/CustomProduct/CustomProductSlice";
import { customProductData } from "./Components/CustomProduct/cutomProductsData";
import { Box } from "@mui/material";

const App = () => {
  Shop();

  let dispatch = useDispatch();

  const mode = useSelector((state) => state.theme.mode);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      dispatch(setIsLogin(uid));
      // setDetail(user);
      // ...
    } else {
      dispatch(setIsLogin(null));

      // console.log("user is Not Login");
    }
  });

  useEffect(() => {
    dispatch(setCustomProducts(customProductData));
  }, [dispatch]);

  // console.log(mode)

  const location = useLocation();
  const hideHeaderPath = ["/auth", "/auth/signup", "/auth/forgetpassword"];
  const whenHideHeader = hideHeaderPath.includes(location?.pathname);

  return (
    <Box
      sx={{
        backgroundColor: mode === "light" ? "#FEFEFE" : "#121212",
      }}
    >
      {whenHideHeader ? null : <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product" element={<Product />} /> {/* For all Products */}
        <Route path="/product/:category" element={<Product />} />
        <Route path="/:id">
          <Route index element={<ProductDetail />} />
          <Route path="billing" element={<BillingDetail />} />
        </Route>
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forgetpassword" element={<ForgotPassword />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Box>
  );
};

export default App;
