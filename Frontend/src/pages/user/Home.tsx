import React from 'react';
import Navbar from '../../components/user/Navbar';
import homeImg1 from '../../assets/Home1.jpg';

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background image */}
      <img
        src={homeImg1}
        alt="Home"
        className="h-full w-full object-cover"
      />

      {/* Transparent navbar on top of image */}
      <Navbar />
    </div>
  );
};

export default Home;
