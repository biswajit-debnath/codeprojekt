'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../_styles/animations';

type ContentRefKeys = 'id' | 'wallet' | 'personal' | 'achievements' | 'history' | 'rewards' | 'logout';
interface NavItemProps {
  id: ContentRefKeys;
  label: string;
  onClick: (id: ContentRefKeys) => void;
  isActive: boolean;
}

const AccountPage = () => {
  type ContentRefKeys = keyof typeof contentRefs;
  const [activeSection, setActiveSection] = useState<ContentRefKeys>('id');

  const contentRefs = {
    id: useRef<HTMLDivElement>(null),
    wallet: useRef<HTMLDivElement>(null),
    personal: useRef<HTMLDivElement>(null),
    achievements: useRef<HTMLDivElement>(null),
    history: useRef<HTMLDivElement>(null),
    rewards: useRef<HTMLDivElement>(null),
    logout: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (id: ContentRefKeys) => {
    const contentContainer = document.getElementById('content-container');
    const targetElement = contentRefs[id]?.current;
    
    if (contentContainer && targetElement) {
      // Calculate the scroll position relative to the container
      const scrollPosition = targetElement.offsetTop;
      
      // Smooth scroll the container to the target element
      contentContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      setActiveSection(id);
    }
  };

  const NavItem: React.FC<NavItemProps> = ({ id, label, onClick, isActive }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`block w-full text-left py-3 px-6 text-md transition-colors hover:opacity-80 ${isActive ? 'font-bold bg-gray-100' : 'opacity-70'} hover:opacity-100`}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );

  return (
    <motion.div 
      className="flex flex-col h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main container with padding top for header space */}
      <motion.div 
        className="flex-1 flex flex-col mt-20 px-12 pb-16 overflow-hidden max-w-[1550px] mx-auto w-full"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          className="text-lg font-bold py-4 font-['The-Last-Shuriken'] text-black"
          variants={fadeIn("down", 0.1)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          YOUR ACCOUNT
        </motion.h1>
        
        {/* Content area with navigation and content sections */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation - Fixed */}
          <motion.div 
            className="w-80 flex-shrink-0"
            variants={slideIn("right", 0.2)}
          >
            <motion.div 
              className="flex flex-col py-4"
              variants={staggerContainer(0.05, 0.1)}
              initial="hidden"
              animate="show"
            >
              <NavItem id="id" label="CODEPROJEKT ID" onClick={scrollToSection} isActive={activeSection === 'id'} />
              <NavItem id="wallet" label="MY WALLET" onClick={scrollToSection} isActive={activeSection === 'wallet'} />
              <NavItem id="personal" label="PERSONAL INFORMATION" onClick={scrollToSection} isActive={activeSection === 'personal'} />
              <NavItem id="achievements" label="ACHIEVEMENTS" onClick={scrollToSection} isActive={activeSection === 'achievements'} />
              <NavItem id="history" label="TRANSACTION HISTORY" onClick={scrollToSection} isActive={activeSection === 'history'} />
              <NavItem id="rewards" label="REWARDS" onClick={scrollToSection} isActive={activeSection === 'rewards'} />
              <NavItem id="logout" label="LOG OUT" onClick={scrollToSection} isActive={activeSection === 'logout'} />
            </motion.div>
          </motion.div>

          {/* Container with margin bottom to create space above footer */}
          <motion.div 
            className="flex-1 mb-16 relative"
            variants={fadeIn("left", 0.4)}
          >
            {/* Right Content Area - Scrollable with internal padding */}
            <div id="content-container" className="absolute inset-0 overflow-y-auto overflow-x-hidden pr-4">
              {/* ID Section */}
              <motion.div 
                ref={contentRefs.id} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6 flex flex-col pb-14"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl mb-2 font-['The-Last-Shuriken'] opacity-70 text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      CODEPRO ID
                    </motion.h2>
                    <div className="w-full flex justify-center">
                      <motion.div 
                        className="relative w-32 h-32"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.3
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src="/profile-image.png"
                          alt="Profile"
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div 
                      className="bg-[#262626] p-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          ACCOUNT NAME
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          ACCOUNT ID (CODEPRO11111)
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Wallet Section */}
              <motion.div 
                ref={contentRefs.wallet} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6 flex flex-col pb-14"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70 text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      MY WALLET
                    </motion.h2>
                    <div className="w-full flex justify-center">
                      <motion.div 
                        className="relative w-32 h-32"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "easeInOut"
                        }}
                      >
                        <Image
                          src="/profile-image.png"
                          alt="Profile"
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <div>
                      <motion.p 
                        className="text-gray-400 pl-7"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        WALLET BALANCE - Codepro coins
                      </motion.p>
                      <motion.div 
                        className="flex justify-between items-center mt-2 bg-[#262626] p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <p className="text-2xl pl-4">00.00</p>
                        <motion.button 
                          className="bg-[#e70012] hover:bg-red-700 text-white px-6 py-3 flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="mr-2">+</span> ADD WALLET BALANCE
                        </motion.button>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <p className="text-gray-400 pl-7">Wallet Transactions</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Personal Information Section */}
              <motion.div 
                ref={contentRefs.personal} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl font-['The-Last-Shuriken'] opacity-70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      PERSONAL INFORMATION
                    </motion.h2>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div 
                      className="grid grid-cols-2 gap-6 bg-[#262626] mb-3 pl-4"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div 
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.3)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">EMAIL</p>
                        <p>user@example.com</p>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.4)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">PHONE NO</p>
                        <p>+91 1234567890</p>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="grid grid-cols-2 gap-6 bg-[#262626] pl-4"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div 
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.5)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">COUNTRY</p>
                        <p>India</p>
                      </motion.div>
                      <motion.div 
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.6)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">DOB</p>
                        <p>01/01/1990</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Achievements Section */}
              <motion.div 
                ref={contentRefs.achievements} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl font-['The-Last-Shuriken'] opacity-70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      ACHIEVEMENT
                    </motion.h2>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div 
                      className="grid grid-cols-2 gap-6"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div 
                        className="bg-[#262626] p-4 rounded"
                        variants={fadeIn("up", 0.3)}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">INVITES</p>
                        <motion.p 
                          className="text-3xl"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          12
                        </motion.p>
                        <div className="w-full bg-gray-700 h-2 rounded mt-3">
                          <motion.div 
                            className="bg-blue-500 h-2 rounded" 
                            style={{ width: '40%' }}
                            initial={{ width: '0%' }}
                            animate={{ width: '40%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>
                      <motion.div 
                        className="bg-[#262626] p-4 rounded"
                        variants={fadeIn("up", 0.4)}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">PURCHASE</p>
                        <motion.p 
                          className="text-3xl"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          128
                        </motion.p>
                        <div className="w-full bg-gray-700 h-2 rounded mt-3">
                          <motion.div 
                            className="bg-blue-500 h-2 rounded" 
                            style={{ width: '80%' }}
                            initial={{ width: '0%' }}
                            animate={{ width: '80%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Transaction History Section */}
              <motion.div 
                ref={contentRefs.history} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl font-['The-Last-Shuriken'] opacity-70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      TRANSACTION HISTORY
                    </motion.h2>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div 
                      className="bg-[#262626] p-4 rounded"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        No transactions found
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Rewards Section */}
              <motion.div 
                ref={contentRefs.rewards} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl font-['The-Last-Shuriken'] opacity-70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      REWARDS
                    </motion.h2>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div 
                      className="bg-[#262626] p-4 rounded"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        No rewards available
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Logout Section */}
              <motion.div 
                ref={contentRefs.logout} 
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div 
                    className="w-64 bg-[#262626] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2 
                      className="text-2xl font-['The-Last-Shuriken'] opacity-70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      LOG OUT
                    </motion.h2>
                  </motion.div>
                  <motion.div 
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.button 
                      className="bg-[#e70012] hover:bg-red-700 text-white px-6 py-3 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      CONFIRM LOGOUT
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Empty div at the bottom to create scrolling space */}
              <div className="h-16"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountPage;