import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/Home";
import SignUp from "./Components/Form/SignUp";
import Login from "./Components/Form/Login";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import { Route, Routes, useParams } from "react-router";
import Page404 from "./Pages/PageNotFound";
import { Shop } from "./TenStack/Shop";
import ProductDetail from "./Pages/ProductDetail";
import BillingDetail from "./Pages/BillingDetail";
import Product from "./Pages/Product";
import ForgotPassword from "./Pages/ForgetPassword";

const App = () => {

  Shop();
  
  return (
    <>
    
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product" element={<Product />} />
        {/* <Route path=":id" element={<ProductDetail />} /> */}
        {/* <Route path=":id/:name" element={<BillingDetail />} /> */}
        <Route path="/:id">
          <Route index element={<ProductDetail />} />
          <Route path="billing" element={<BillingDetail />} />
        </Route>
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forgetpassword" element={<ForgotPassword />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
