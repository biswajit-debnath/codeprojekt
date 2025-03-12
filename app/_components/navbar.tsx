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

  // Auth pages (login/signup) get a simplified header
  if (isAuthPage) {
    return (
      <nav className="text-white py-4 z-50 sticky top-0">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">WELCOME TO CODE PROJEKT</h1>
          <div className="flex items-center space-x-2">
            {pathname === '/signup' && (
              <>
                <span className="text-gray-300">Already have an account</span>
                <Link href="/login">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-full">
                    sign in
                  </button>
                </Link>
              </>
            )}
            {pathname === '/login' && (
              <>
                <span className="text-gray-300">Don&apos;t have an account?</span>
                <Link href="/signup">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-full">
                    sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Regular navigation for other pages
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
              <Link href="/diamond-packs" className="relative">
                <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                {pathname === '/diamond-packs' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
              <Link href="/event-pre-order" className="relative">
                <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                {pathname === '/event-pre-order' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
              <Link href="/redeem-code" className="relative">
                <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                {pathname === '/redeem-code' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
              <Link href="/esports" className="relative">
                <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                {pathname === '/esports' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
              <Link href="/merch" className="relative">
                <button className="hover:text-gray-300 transition-colors">MERCH</button>
                {pathname === '/merch' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
              <Link href="/more" className="relative">
                <button className="hover:text-gray-300 transition-colors">MORE</button>
                {pathname === '/more' && (
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                )}
              </Link>
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
                <Link href="/diamond-packs" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">DIAMOND PACKS</button>
                  {pathname === '/diamond-packs' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
                <Link href="/event-pre-order" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">EVENT PRE-ORDER</button>
                  {pathname === '/event-pre-order' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
                <Link href="/redeem-code" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">REDEEM CODE</button>
                  {pathname === '/redeem-code' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
                <Link href="/esports" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">ESPORTS</button>
                  {pathname === '/esports' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
                <Link href="/merch" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">MERCH</button>
                  {pathname === '/merch' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
                <Link href="/more" className="relative inline-block">
                  <button className="hover:text-gray-300 transition-colors">MORE</button>
                  {pathname === '/more' && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"></div>
                  )}
                </Link>
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