'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface NavItemProps {
  id: string;
  label: string;
}

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState('id');

  const NavItem: React.FC<NavItemProps> = ({ id, label }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`block w-full text-left py-3 px-6 text-sm transition-colors hover:opacity-80 font-['Rentukka-Regular']
        ${activeSection === id ? 'opacity-100' : 'opacity-70'}`}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'id':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70">CODEPRO ID</h2>
            <div className="bg-[#1c1a1b] text-white rounded-lg overflow-hidden">
              <div className="flex items-center p-6">
                <div className="relative w-24 h-24 mr-8">
                  <Image
                    src="/api/placeholder/96/96"
                    alt="Profile"
                    className="rounded-full"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 bg-[#262626] p-4 rounded">
                  <div className="flex justify-between">
                    <span>ACCOUNT NAME</span>
                    <span>ACCOUNT ID (CODEPRO11111)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70">MY WALLET</h2>
            <div className="bg-[#1c1a1b] text-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">WALLET BALANCE - Codepro coins</p>
                  <p className="text-3xl mt-2">00.00</p>
                </div>
                <button className="bg-[#e70012] hover:bg-red-700 text-white px-6 py-3 rounded">
                  + ADD WALLET BALANCE
                </button>
              </div>
              <div className="mt-6">
                <p className="text-gray-400">Wallet Transactions</p>
              </div>
            </div>
          </div>
        );
      case 'personal':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70">PERSONAL INFORMATION</h2>
            <div className="bg-[#1c1a1b] text-white p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-2">EMAIL</p>
                  <p>user@example.com</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">PHONE NO</p>
                  <p>+91 1234567890</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">COUNTRY</p>
                  <p>India</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">DOB</p>
                  <p>01/01/1990</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70">ACHIEVEMENT</h2>
            <div className="bg-[#1c1a1b] text-white p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-2">INVITES</p>
                  <p className="text-3xl">12</p>
                  <div className="w-full bg-gray-700 h-2 rounded mt-3">
                    <div className="bg-blue-500 h-2 rounded" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">PURCHASE</p>
                  <p className="text-3xl">128</p>
                  <div className="w-full bg-gray-700 h-2 rounded mt-3">
                    <div className="bg-blue-500 h-2 rounded" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold px-6 py-4 font-['The-Last-Shuriken']">YOUR ACCOUNT</h1>
        
        <div className="flex rounded-lg overflow-hidden">
          {/* Left Navigation */}
          <div className="w-64">
            <div className="flex flex-col py-4">
              <NavItem id="id" label="CODEPROJEKT ID" />
              <NavItem id="wallet" label="MY WALLET" />
              <NavItem id="personal" label="PERSONAL INFORMATION" />
              <NavItem id="achievements" label="ACHIEVEMENTS" />
              <NavItem id="history" label="TRANSACTION HISTORY" />
              <NavItem id="rewards" label="REWARDS" />
              <NavItem id="logout" label="LOG OUT" />
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;