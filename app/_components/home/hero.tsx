'use client';
import React, { useState, useEffect } from 'react';
import FirebaseImage from '../../_components/common/firebaseImage';
import styles from '../../_styles/Home.module.css';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '../../_styles/animations';
import Link from 'next/link';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative md:px-10 lg:px-20 md:pt-5 font-['The-Last-Shuriken']">
      <motion.div
        className="relative h-[160px] md:h-[300px] lg:h-[400px] max-w-[1550px] mx-auto"
        initial="hidden"
        animate="show"
        variants={fadeIn("up", 0.3)}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'} absolute top-0 left-0 right-0 bottom-0 bg-gray-500 animate-pulse`}></div>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <FirebaseImage
              path="hero/hero-imageMain.jpg"
              alt="Hero Image"
              fill
              objectFit="cover"
              priority
            />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 lg:bottom-20 inset-x-0 flex flex-col items-center z-20"
          variants={slideIn("up", 0.5)}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-md:text-5xl lg:text-6xl font-bold text-white md:mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            PRESENT EVENT NAME
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/diamond-packs">
              <button className={`text-white transition-colors px-6 lg:px-20 py-1 md:py-3 lg:pt-5 lg:pb-4 text-[0.7rem] md:text-xl lg:text-3xl ${styles['custom-button']}`}>
                BUY DIAMONDS
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;