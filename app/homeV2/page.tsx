'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation Bar */}
      <nav className="bg-black p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                <span className="text-white font-bold">CODE PROJEKT</span>
              </div>
              
              <div className="flex space-x-6 text-white">
                <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                <button className="hover:text-gray-300 transition-colors">MERCH</button>
                <button className="hover:text-gray-300 transition-colors">MORE</button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="search here"
                  className="bg-gray-700 rounded-md px-4 py-1 text-white placeholder-gray-400"
                />
              </div>
              <button className="flex items-center space-x-2 bg-gray-700 rounded-md px-4 py-1 text-gray-300">
                <span>sign in/name</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              <span className="text-white font-bold">CODE PROJEKT</span>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 space-y-4">
              <div className="flex flex-col space-y-4 text-white">
                <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                <button className="hover:text-gray-300 transition-colors">MERCH</button>
                <button className="hover:text-gray-300 transition-colors">MORE</button>
              </div>
              <div className="space-y-4">
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
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {/* Hero SVG content from first artifact */}
            {/* <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#2a4365;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4a5568;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="characterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f6e05e;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#ed8936;stop-opacity:0.1" />
              </linearGradient>
            </defs> */}
            <rect width="100%" height="100%" fill="url(#heroGradient)"/>
            <path d="M600 200 Q750 250 800 400 T900 600" stroke="#fff" fill="none" strokeWidth="4"/>
            <circle cx="600" cy="300" r="100" fill="url(#characterGlow)"/>
            <g>
              <circle cx="300" cy="400" r="20" fill="#fff" opacity="0.3"/>
              <circle cx="900" cy="300" r="15" fill="#fff" opacity="0.2"/>
              <circle cx="700" cy="500" r="25" fill="#fff" opacity="0.4"/>
            </g>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-8 text-center px-4">
              PRESENT EVENT NAME
            </h1>
            <button className="bg-red-600 text-white px-8 md:px-12 py-2 md:py-3 rounded-md text-lg md:text-xl font-bold hover:bg-red-700 transition-colors">
              BUY DIAMONDS
            </button>
          </div>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="container mx-auto py-6 md:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Mobile Legends Card */}
          <div className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
              {/* Game Card SVG content from second artifact */}
              {/* <defs>
                <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#2d3748;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1a202c;stop-opacity:1" />
                </linearGradient>
              </defs> */}
              <rect width="100%" height="100%" fill="url(#cardGradient)"/>
              <rect x="50" y="100" width="200" height="150" fill="#4a5568" rx="10"/>
              <circle cx="150" cy="175" r="50" fill="#718096"/>
            </svg>
            <div className="absolute bottom-0 w-full p-4">
              <div className="bg-gray-900 text-white py-2 px-4 rounded">
                Mobile Legends: Bang Bang
              </div>
            </div>
          </div>

          {/* Coming Soon Cards */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                {/* Coming Soon Card SVG content */}
                {/* <defs>
                  <linearGradient id={`cardGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#2d3748;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a202c;stop-opacity:1" />
                  </linearGradient>
                </defs> */}
                <rect width="100%" height="100%" fill={`url(#cardGradient${index})`}/>
                <rect x="50" y="100" width="200" height="150" fill="#4a5568" rx="10"/>
                <circle cx="150" cy="175" r="50" fill="#718096"/>
                <text x="150" y="300" fontFamily="Arial" fontSize="24" fill="white" textAnchor="middle">
                  COMING SOON
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;