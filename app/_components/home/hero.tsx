'use client';
import React from 'react';
import Image from 'next/image';
import styles from '../../_styles/Home.module.css';

const Hero = () => {
  return (
    <div className="relative px-5 md:px-10 lg:px-20 pt-2 md:pt-5">
      <div className="relative h-[200px] md:h-[300px] lg:h-[400px] max-w-[1550px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <Image
          src="/hero-imageMain.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-10 lg:bottom-20 inset-x-0 flex flex-col items-center z-20">
          <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-8 text-center">
            PRESENT EVENT NAME
          </h1>
          <button className={`text-white hover:bg-red-700 transition-colors px-8 lg:px-20 py-2 md:py-3 lg:py-5 md:text-xl lg:text-3xl ${styles['custom-button']}`}>
            BUY DIAMONDS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;