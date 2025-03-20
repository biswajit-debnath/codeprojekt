'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../_styles/animations';

const DiamondPacksPage = () => {
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  // Array of diamond packs
  const diamondPacks = Array(20).fill({
    price: '₹160',
    amount: '102+10 diamonds'
  });

  const handleSelectPack = (index: number) => {
    setSelectedPack(index);
  }; 

  return (
    <div className="pt-8 pb-16">
      {/* Main Content */}
      <motion.div 
        className="max-w-[1550px] mx-auto px-5 md:px-20"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
      >
        {/* Input and Features Row */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          {/* Left side - Input Game ID */}
          <motion.div 
            className="md:w-3/6 pr-16"
            variants={fadeIn("right", 0.3)}
          >
            {/* Step 1: Input Game ID */}
            <div className="mb-6">
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold mr-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                  }}
                >
                  1
                </motion.div>
                <motion.h2 
                  className="text-xl font-['The-Last-Shuriken']"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  INPUT YOUR IN GAME ID
                </motion.h2>
                <motion.div 
                  className="ml-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.5 }
                  }}
                >
                  i
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="space-y-3"
                variants={fadeIn("up", 0.4)}
              >
                <div>
                  <label htmlFor="userId" className="block text-lg font-medium text-gray-700 mb-1">
                    Enter User ID
                  </label>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <input
                      type="text"
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="1234567890"
                      className="w-full px-5 py-2 bg-gray-300 text-lg"
                    />
                  </motion.div>
                </div>
                
                <div>
                  <label htmlFor="zoneId" className="block text-lg font-medium text-gray-700 mb-1">
                    Enter Zone ID
                  </label>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      id="zoneId"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      placeholder="12345"
                      className="w-full px-5 py-2 bg-gray-300 text-lg "
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  className="text-lg text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  IGN : In Game Name
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side - Features */}
          <motion.div 
            className="md:w-3/5 bg-gray-300 p-6 pr-16 rounded-md"
            variants={slideIn("left", 0.7)}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.h2 
              className="text-xl font-bold text-red-600 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              NEW FEATURES:
            </motion.h2>
            
            <motion.div 
              className="text-xl pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.div 
                className="text-gray-800"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Wallet System Added
              </motion.div>
              <motion.div 
                className="text-gray-800"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Through Wallet Get Diamonds Instantly
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Step 2: Select Packs - Full Width */}
        <div>
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold mr-3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.9
              }}
            >
              2
            </motion.div>
            <motion.h2 
              className="text-4xl font-['The-Last-Shuriken']"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              SELECT YOUR PACKS
            </motion.h2>
            <motion.div 
              className="ml-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.1
              }}
              whileHover={{
                rotate: 360,
                scale: 1.2,
                transition: { duration: 0.5 }
              }}
            >
              i
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {diamondPacks.map((pack, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelectPack(index)}
                className={`relative overflow-hidden text-white transition-all ${
                  selectedPack === index ? 'ring-2 ring-red-600' : ''
                }`}
                style={{
                  borderRadius: "0 0 55px 0",
                  maxWidth: "240px",
                  backgroundColor: "var(--navBlack)"
                }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      duration: 0.5,
                      delay: index * 0.03,
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative p-4">
                  <motion.div 
                    className="absolute top-0 right-[-5px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.02, duration: 0.3 }}
                  >
                    <div className="w-10 h-12 flex">
                        <Image
                            src="/logo-imageV4white.png"
                            alt="Code Projekt Logo"
                            width={130}
                            height={40}
                            className="object-contain rotate-90"
                            />
                    </div>
                  </motion.div>
                  <div className="flex justify-between items-start">
                    <motion.span 
                      className="text-4xl pt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.02, duration: 0.3 }}
                    >
                      {pack.price}
                    </motion.span>
                    <motion.div 
                      className="ml-1 mr-4"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5 + (index % 3) * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <svg width="60" height="60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 2L3 10L16 18L29 10L16 2Z" fill="#4FC3F7" />
                          <path d="M16 18L3 10L16 30L29 10L16 18Z" fill="#2196F3" />
                          <path d="M16 2L8 7L16 12L24 7L16 2Z" fill="#4FC3F7" />
                          <path d="M16 12L8 7L16 20L24 7L16 12Z" fill="#2196F3" />
                          <path d="M16 2L10 6L16 10L22 6L16 2Z" fill="#E1F5FE" />
                          <path d="M16 2L13 4L16 6L19 4L16 2Z" fill="#FFFFFF" />
                          <path d="M8 18L3 10L8 25L13 10L8 18Z" fill="#1565C0" />
                          <path d="M24 18L29 10L24 25L19 10L24 18Z" fill="#1565C0" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="text-2xl mt-1 flex items-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.02, duration: 0.3 }}
                  >
                    {pack.amount}
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DiamondPacksPage;