import React from 'react'
import { Outlet } from 'react-router-dom'
import ImgDisplay from '../components/ImgDisplay/ImgDisplay';
import HelpCard from '../components/HelpCard/HelpCard';
import AboutUs from '../components/About Us/AboutUs';
import Vision from '../components/Our Visison/Vision';
import Partner from '../components/Partner/Partner';


function RootLayout() {
  return (
    <div>
    <ImgDisplay />
      <AboutUs />
      <HelpCard />
      <Vision />
      <Partner />
    </div>
  )
}

export default RootLayout