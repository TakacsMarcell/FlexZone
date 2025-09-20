import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Motivation from "../components/Motivation";
import Tips from "../components/Tips";

const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Navbar />
      <Slider/>
      <Tips />
      <Motivation/>
      <Footer/>

    </div>
  );
};

export default Home;