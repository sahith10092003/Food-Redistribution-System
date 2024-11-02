import React from "react";

import ImgDisplay from "../components/ImgDisplay/ImgDisplay";
import AboutUs from "../components/About Us/AboutUs";
import HelpCard from "../components/HelpCard/HelpCard";
import Vision from "../components/Our Visison/Vision";
import Partner from "../components/Partner/Partner";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Home;
