'use client';
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-6 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Left Section - Links: Center items on mobile, align end on medium screens */}
          <div className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right mt-2 order-2 md:order-1">
            <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
            <a href="/contact" className="hover:text-gray-300 transition-colors">Contact Us</a>
            <a href="/about" className="hover:text-gray-300 transition-colors">About Codeprojekt</a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="/refund" className="hover:text-gray-300 transition-colors">Refund And Cancel</a>
          </div>

          {/* Middle Section - Logo: Center items, remove rotation on mobile */}
          <div className="flex items-center order-1 md:order-2">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/logo-imageV4white.png"
                  alt="Code Projekt Logo"
                  width={130}
                  height={40}
                  className="object-contain w-[90px] md:w-[130px] h-auto md:rotate-90"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Payment Methods: Center items on mobile, align start on medium screens */}
          <div className="flex flex-col items-center md:items-start order-3 md:order-3">
            <h3 className="text-lg mb-4">Payment Method Supported</h3>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center font-['The-Last-Shuriken']">
                <span className="text-sm">CODEPRO COINS</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Paytm</span>
                <span className="text-sm">PhonePe</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">G Pay</span>
                <span className="text-sm">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;