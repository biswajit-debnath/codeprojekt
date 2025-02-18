'use client';
import React, { useState, useEffect, useRef  } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 p-4 z-50 sticky ">
        <div className="">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between px-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Image src="/logo-imageV4white.png" alt="Logo" width={115} height={160} />
              </div>
              
              <div className="flex space-x-10 text-white text-lg pl-6">
                <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                <button className="hover:text-gray-300 transition-colors">MERCH</button>
                <button className="hover:text-gray-300 transition-colors">MORE</button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="search here"
                  className="bg-gray-700 rounded-full px-4 py-1 text-white placeholder-gray-400" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/profile-image.png" alt="Circle Image" width={35} height={50} className="rounded-full" />
              </div>
              <button className="flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-1 text-gray-300 pr-20">
                <span>sign in/name</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/logo-imageV4white.png" alt="Logo" width={100} height={50} />
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
              
              {/* Menu */}
              <div 
                ref={menuRef}
                className="fixed top-0 right-0 h-screen w-64 bg-gray-900 p-6 z-50 transform transition-transform duration-300 ease-in-out"
              >
                <div className="flex flex-col space-y-6 text-white mt-16">
                  <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                  <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                  <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                  <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                  <button className="hover:text-gray-300 transition-colors">MERCH</button>
                  <button className="hover:text-gray-300 transition-colors">MORE</button>
                </div>
                <div className="space-y-4 mt-8">
                  <input
                    type="text"
                    placeholder="search here"
                    className="w-full bg-gray-700 rounded-md px-4 py-1 text-white placeholder-gray-400"
                  />
                  <button className="w-full bg-gray-700 rounded-md px-4 py-1 text-gray-300">
                    sign in/name
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative px-5 md:px-10 lg:px-20 pt-2 md:pt-5">
        <div className="relative h-[200px] md:h-[300px] lg:h-[400px] max-w-[1550px] mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <Image
            src="/hero-imageMain.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"/>
            <div className="absolute bottom-10 lg:bottom-20 inset-x-0 flex flex-col items-center z-20">
              <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-8 text-center">
                PRESENT EVENT NAME
              </h1>
              <button className={`text-white hover:bg-red-700 transition-colors   px-8 lg:px-20 py-2 md:py-3 lg:py-5 md:text-xl lg:text-3xl   ${styles['custom-button']}`}>
                BUY DIAMONDS
              </button>
            </div>
        </div>
      </div>

       {/* Game Cards Section */}
      <div className="px-5 md:px-10 lg:px-20 py-6 md:py-12">
        <div className="max-w-[1550px] mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap gap-12">
            {/* Mobile Legends Card */}
            <div className="relative aspect-[9/20] max-w-[150px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4">
              <Image
                src="/menu-image0.jpeg"
                alt="Mobile Legends: Bang Bang"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Coming Soon Cards */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative aspect-[9/20] max-w-[150px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4"
              >
                <Image
                  src={`/menu-image${index}.png`}
                  alt="Coming Soon"
                  layout="fill"
                  objectFit="cover"
                />
                {/* Full overlay with centered text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <h3 className="text-white text-lg md:text-lg font-bold tracking-wider">
                      COMING<br /> SOON
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;