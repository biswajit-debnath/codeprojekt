"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../_styles/animations';

const SignupPage = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-5 md:px-16 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content */}
      <motion.main 
        className="flex flex-1 max-w-[1550px] mx-auto w-full" 
        style={{ maxHeight: '800px' }}
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="show"
      >
        {/* Left side with Image */}
        <motion.div 
          className="hidden md:block w-[450px] relative overflow-hidden"
          variants={slideIn("right", 0.3)}
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Image 
              src="/hero-image.png" 
              alt="Game Character" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right side with Form and Logo */}
        <motion.div 
          className="w-full md:w-4/6 pt-0 px-8 md:px-12 flex items-start justify-between relative"
          variants={fadeIn("left", 0.4)}
        >
          <div className="w-full max-w-3xl pr-14">
            <motion.div 
              className="flex flex-col"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.h2 
                className="text-4xl font-bold tracking-wider uppercase leading-none mb-0 font-['The-Last-Shuriken']"
                variants={fadeIn("down", 0.1)}
              >
                SIGN UP
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-md -mt-1 leading-tight"
                variants={fadeIn("down", 0.2)}
              >
                Register your account
              </motion.p>
            </motion.div>

            <motion.form 
              className="space-y-5 mt-10 w-full"
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              animate="show"
            >
              <motion.div 
                className="space-y-5"
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={fadeIn("up", 0.1)}>
                  <label htmlFor="username" className="block text-md font-medium text-gray-800">
                    user name
                  </label>
                  <motion.input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your name"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div variants={fadeIn("up", 0.2)}>
                  <label htmlFor="email" className="block text-md font-medium text-gray-800">
                    email/phone no
                  </label>
                  <motion.input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your email/phone no"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div variants={fadeIn("up", 0.3)}>
                  <label htmlFor="password" className="block text-md font-medium text-gray-800">
                    password
                  </label>
                  <motion.input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="set your password"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-8 py-6"
                variants={staggerContainer(0.1, 0.4)}
                initial="hidden"
                animate="show"
              >
                <motion.div 
                  className="flex items-center"
                  variants={fadeIn("up", 0.1)}
                >
                  <div className="relative">
                    <motion.input
                      id="terms1"
                      name="terms1"
                      type="checkbox"
                      className="peer h-5 w-5 appearance-none bg-gray-300 checked:bg-gray-800 focus:outline-none relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <label htmlFor="terms1" className="ml-2 block text-md text-gray-600">
                    i agree to terms and conditions
                  </label>
                </motion.div>

                <motion.div 
                  className="flex items-center"
                  variants={fadeIn("up", 0.2)}
                >
                  <div className="relative">
                    <motion.input
                      id="terms2"
                      name="terms2"
                      type="checkbox"
                      className="peer h-5 w-5 appearance-none bg-gray-300 checked:bg-gray-800 focus:outline-none relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <label htmlFor="terms2" className="ml-2 block text-md text-gray-600">
                    i agree to terms and conditions
                  </label>
                </motion.div>
              </motion.div>

              <motion.div 
                className="pt-8"
                variants={fadeIn("up", 0.5)}
              >
                <motion.button
                  type="submit"
                  className="w-[190px] flex justify-start py-3 px-8 border border-transparent rounded-full text-white bg-[var(--foreground)] focus:outline-none shadow-md shadow-gray-500/50 transition-all duration-300"
                  whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  sign up
                </motion.button>
              </motion.div>

              <motion.div 
                className="flex items-center"
                variants={fadeIn("up", 0.6)}
              >
                <div className="relative">
                  <motion.input
                    id="staySignedIn"
                    name="staySignedIn"
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none bg-gray-300 checked:bg-gray-800 focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <label htmlFor="staySignedIn" className="ml-2 block text-sm text-gray-400 font-medium">
                  stay signed in
                </label>
              </motion.div>

              <motion.div 
                className="text-left pt-1"
                variants={fadeIn("up", 0.7)}
              >
                <p className="text-md text-gray-600">
                  or quick log in - google
                </p>
              </motion.div>
            </motion.form>
          </div>

          {/* Logo on the right */}
          <motion.div 
            className="pt-10 z-10 pointer-events-none absolute right-10 top-0"
            variants={fadeIn("left", 0.7)}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              <motion.div 
                className="transform origin-center"
                animate={{
                  rotate: [90, 90.5, 90],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <Image 
                  src="/logo-imageV4.png" 
                  alt="CODE PROJEKT" 
                  width={150} 
                  height={70}
                  className="p-3 rounded rotate-90"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default SignupPage;
