import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Motivation from "../components/Motivation";

const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Navbar />
      <Slider/>
      <Motivation/>
      <Footer/>

    </div>
  );
};

export default Home;