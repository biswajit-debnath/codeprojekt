'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';

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

  return (
    <nav className="absolute top-0 left-0 right-0 p-4 z-50 sticky">
      <div className="">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Link href="/">
                <Image src="/logo-imageV4white.png" alt="Logo" width={115} height={160} />
              </Link>
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
              <Link href="/account">
                <div className={`rounded-full ${isAccountPage ? 'ring-2 ring-red-600 ring-offset-0' : ''}`}>
                  <Image src="/profile-image.png" alt="Circle Image" width={35} height={50} className="rounded-full" />
                </div>
              </Link>
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
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link href="/account">
                <div className={`rounded-full ${isAccountPage ? 'ring-2 ring-red-600 ring-offset-0' : ''}`}>
                  <Image src="/profile-image.png" alt="Circle Image" width={30} height={30} className="rounded-full" />
                </div>
              </Link>
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
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
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
  );
};

export default Navbar;