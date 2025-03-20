'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../_styles/animations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auth pages (login/signup) get a simplified header
  if (isAuthPage) {
    return (
      <motion.nav 
        className="absolute top-0 left-0 right-0 p-4 z-50 sticky"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="">
          {/* Desktop Auth Navigation */}
          <div className="hidden lg:flex items-center justify-between px-6">
            <motion.div 
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center">
                <h1 className="text-3xl tracking-wider text-white font-['The-Last-Shuriken'] pl-2">WELCOME TO CODE PROJEKT</h1>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 ml-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {pathname === '/signup' && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">Already have an account</span>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/login">
                      <button className="bg-[#303030] hover:bg-gray-600 text-gray-400 py-1 rounded-full w-36 text-left pl-4">
                        sign in
                      </button>
                    </Link>
                  </motion.div>
                </div>
              )}
              {pathname === '/login' && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">Don&apos;t have an account?</span>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/signup">
                      <button className="bg-[#303030] hover:bg-gray-600 text-gray-400 py-1 rounded-full w-36 text-left pl-4">
                        sign up
                      </button>
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile Auth Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-lg font-bold tracking-wider text-white font-['The-Last-Shuriken']">CODE PROJEKT</h1>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {pathname === '/signup' && (
                <Link href="/login">
                  <button className="bg-[#303030] hover:bg-gray-600 text-gray-300 px-4 py-1.5 rounded-full w-28 text-sm text-left pl-5">
                    sign in
                  </button>
                </Link>
              )}
              {pathname === '/login' && (
                <Link href="/signup">
                  <button className="bg-[#303030] hover:bg-gray-600 text-white px-4 py-1.5 rounded-full w-28 text-sm text-left pl-5">
                    sign up
                  </button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.nav>
    );
  }

  // Regular navigation for other pages
  return (
    <motion.nav 
      className={`absolute top-0 left-0 right-0 p-4 z-50 sticky ${
        isScrolled ? "bg-foreground shadow-md" : "bg-foreground"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/">
                <Image src="/logo-imageV4white.png" alt="Logo" width={115} height={160} />
              </Link>
            </motion.div>
            
            <motion.div
              className="flex space-x-10 text-white text-lg pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Link href="/diamond-packs" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    DIAMOND PACKS
                  </motion.button>
                  {pathname === '/diamond-packs' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <Link href="/event-pre-order" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    EVENT PRE-ORDER
                  </motion.button>
                  {pathname === '/event-pre-order' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/redeem-code" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    REDEEM CODE
                  </motion.button>
                  {pathname === '/redeem-code' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <Link href="/esports" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    ESPORTS
                  </motion.button>
                  {pathname === '/esports' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link href="/merch" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    MERCH
                  </motion.button>
                  {pathname === '/merch' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <Link href="/more" className="relative">
                  <motion.button 
                    className="hover:text-gray-300 transition-colors"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    MORE
                  </motion.button>
                  {pathname === '/more' && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    ></motion.div>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex items-center space-x-3 ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AnimatePresence>
              {showSearchBar ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="search here"
                    className="bg-gray-700 rounded-full px-4 py-1 text-white placeholder-gray-400 w-full"
                    autoFocus
                  />
                  <motion.button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowSearchBar(false)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowSearchBar(true)}
                  className="text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/account">
                <div className={`rounded-full ${isAccountPage ? 'ring-2 ring-red-600 ring-offset-0' : ''}`}>
                  <Image src="/profile-image.png" alt="Circle Image" width={35} height={50} className="rounded-full" />
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/signup">
                <motion.button 
                  className="flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-1 text-gray-300 pr-20"
                  whileHover={{ backgroundColor: "#333" }}
                  transition={{ duration: 0.2 }}
                >
                  <span>sign in/name</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/">
              <Image src="/logo-imageV4white.png" alt="Logo" width={100} height={50} />
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/account">
                <div className={`rounded-full ${isAccountPage ? 'ring-2 ring-red-600 ring-offset-0' : ''}`}>
                  <Image src="/profile-image.png" alt="Circle Image" width={30} height={30} className="rounded-full" />
                </div>
              </Link>
            </motion.div>
            
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 z-50"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="lg:hidden fixed inset-0 bg-black pt-20 z-40"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <motion.div
                className="flex flex-col items-center space-y-6 p-8"
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={fadeIn('right', 0.1)}>
                  <Link href="/diamond-packs">
                    <div className={`text-xl font-medium ${pathname === '/diamond-packs' ? 'text-red-600' : 'text-white'}`}>
                      DIAMOND PACKS
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn('right', 0.2)}>
                  <Link href="/event-pre-order">
                    <div className={`text-xl font-medium ${pathname === '/event-pre-order' ? 'text-red-600' : 'text-white'}`}>
                      EVENT PRE-ORDER
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn('right', 0.3)}>
                  <Link href="/redeem-code">
                    <div className={`text-xl font-medium ${pathname === '/redeem-code' ? 'text-red-600' : 'text-white'}`}>
                      REDEEM CODE
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn('right', 0.4)}>
                  <Link href="/esports">
                    <div className={`text-xl font-medium ${pathname === '/esports' ? 'text-red-600' : 'text-white'}`}>
                      ESPORTS
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn('right', 0.5)}>
                  <Link href="/merch">
                    <div className={`text-xl font-medium ${pathname === '/merch' ? 'text-red-600' : 'text-white'}`}>
                      MERCH
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn('right', 0.6)}>
                  <Link href="/more">
                    <div className={`text-xl font-medium ${pathname === '/more' ? 'text-red-600' : 'text-white'}`}>
                      MORE
                    </div>
                  </Link>
                </motion.div>
                <motion.div
                  className="w-full pt-6"
                  variants={fadeIn('up', 0.7)}
                >
                  <input
                    type="text"
                    placeholder="Search here"
                    className="bg-gray-700 rounded-full text-gray-300 w-full px-4 py-2"
                  />
                </motion.div>
                <motion.div
                  variants={fadeIn('up', 0.8)}
                  whileHover={{ scale: 1.05 }}
                  className="w-full"
                >
                  <Link href="/signup" className="w-full">
                    <button className="w-full flex items-center justify-center bg-red-600 rounded-md px-4 py-3 text-white mt-4">
                      SIGN IN / REGISTER
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;