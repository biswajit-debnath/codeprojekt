'use client';
import React from 'react';
import FirebaseImage from '../../_components/common/firebaseImage';
import styles from '../../_styles/Home.module.css';

const Hero = () => {
  return (
    <div className="relative md:px-10 lg:px-20 md:pt-5 font-['The-Last-Shuriken']">
      <div className="relative h-[180px] md:h-[300px] lg:h-[400px] max-w-[1550px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <FirebaseImage
          path="hero/hero-imageMain.jpg"
          alt="Hero Image"
          fill
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-8 lg:bottom-20 inset-x-0 flex flex-col items-center z-20">
          <h1 className="text-md:text-5xl lg:text-6xl font-bold text-white md:mb-8 text-center">
            PRESENT EVENT NAME
          </h1>
          <button className={`text-white transition-colors px-6 lg:px-20 py-1 md:py-3 lg:pt-5 lg:pb-4 text-[0.7rem] md:text-xl lg:text-3xl ${styles['custom-button']}`}>
            BUY DIAMONDS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;