'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

type ContentRefKeys = 'id' | 'wallet' | 'personal' | 'achievements' | 'history' | 'rewards' | 'logout';
interface NavItemProps {
  id: ContentRefKeys;
  label: string;
  onClick: (id: ContentRefKeys) => void;
}

const AccountPage = () => {
  type ContentRefKeys = keyof typeof contentRefs;

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
    }
  };

  const NavItem: React.FC<NavItemProps> = ({ id, label, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className="block w-full text-left py-3 px-6 text-md transition-colors hover:opacity-80 opacity-100 hover:opacity-100"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Main container with padding top for header space */}
      <div className="flex-1 flex flex-col mt-20 px-16 pb-16 overflow-hidden max-w-[1550px] mx-auto w-full">
        <h1 className="text-lg  font-['The-Last-Shuriken'] text-black">YOUR ACCOUNT</h1>
        
        {/* Content area with navigation and content sections */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation - Fixed */}
          <div className="w-80 flex-shrink-0">
            <div className="flex flex-col py-1">
              <NavItem id="id" label="CODEPROJEKT ID" onClick={scrollToSection} />
              <NavItem id="wallet" label="MY WALLET" onClick={scrollToSection} />
              <NavItem id="personal" label="PERSONAL INFORMATION" onClick={scrollToSection} />
              <NavItem id="achievements" label="ACHIEVEMENTS" onClick={scrollToSection} />
              <NavItem id="history" label="TRANSACTION HISTORY" onClick={scrollToSection} />
              <NavItem id="rewards" label="REWARDS" onClick={scrollToSection} />
              <NavItem id="logout" label="LOG OUT" onClick={scrollToSection} />
            </div>
          </div>

          {/* Container with margin bottom to create space above footer */}
          <div className="flex-1 mb-16 relative">
            {/* Right Content Area - Scrollable with internal padding */}
            <div id="content-container" className="absolute inset-0 overflow-y-auto overflow-x-hidden pr-4">
              {/* ID Section */}
              <div ref={contentRefs.id} className="mb-6">
                <div className="flex bg-[--navBlack] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6 flex flex-col pb-14">
                    <h2 className="text-2xl mb-2 font-['The-Last-Shuriken'] opacity-70 text-left">CODEPRO ID</h2>
                    <div className="w-full flex justify-center">
                      <div className="relative w-32 h-32">
                        <Image
                          src="/profile-image.png"
                          alt="Profile"
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="bg-[#2c2c2c] p-4 px-10 pb-12">
                      <div className="flex justify-between">
                        <span>ACCOUNT NAME</span>
                        <span>ACCOUNT ID (CODEPRO11111)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Section */}
              <div ref={contentRefs.wallet} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6 flex flex-col pb-14">
                    <h2 className="text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70 text-left">MY WALLET</h2>
                    <div className="w-full flex justify-center">
                      <div className="relative w-32 h-32">
                        <Image
                          src="/profile-image.png"
                          alt="Profile"
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <div>
                      <p className="text-gray-400 pl-7">WALLET BALANCE - Codepro coins</p>
                      <div className="flex justify-between items-center mt-2 bg-[#2c2c2c] p-4">
                        <p className="text-2xl pl-4">00.00</p>
                        <button className="bg-[--primaryColor] text-white px-6 py-4 flex items-center text-lg">
                          <span className="mr-4 text-4xl">+</span> ADD WALLET BALANCE
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-400 pl-7 text-lg">Wallet Transactions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div ref={contentRefs.personal} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-2xl font-['The-Last-Shuriken'] opacity-70">PERSONAL INFORMATION</h2>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <div className="grid grid-cols-2 gap-6 bg-[#2c2c2c] mb-3 pl-4">
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">EMAIL</p>
                        <p>user@example.com</p>
                      </div>
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">PHONE NO</p>
                        <p>+91 1234567890</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 bg-[#2c2c2c] pl-4">
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">COUNTRY</p>
                        <p>India</p>
                      </div>
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">DOB</p>
                        <p>01/01/1990</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div ref={contentRefs.achievements} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-2xl font-['The-Last-Shuriken'] opacity-70">ACHIEVEMENT</h2>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <div className="bg-[#2c2c2c] p-6 mb-2">
                          <p className="text-gray-400 mb-4 font-medium">INVITES</p>
                          <p className="text-4xl font-semibold">12</p>
                        </div>
                        <div className="w-full bg-gray-800 h-[0.7rem] mt-1 border-2 border-white">
                          <div className="bg-white h-[0.6rem]" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="bg-[#2c2c2c] p-6 mb-2">
                          <p className="text-gray-400 mb-4 font-medium">PURCHASE</p>
                          <p className="text-4xl font-semibold">128</p>
                        </div>
                        <div className="w-full bg-gray-800 h-[0.7rem] mt-1 border-2 border-white">
                          <div className="bg-white h-[0.6rem]" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History Section */}
              <div ref={contentRefs.history} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-2xl font-['The-Last-Shuriken'] opacity-70">TRANSACTION HISTORY</h2>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <div className="bg-[#2c2c2c] p-4">
                      <p className="text-gray-400">No transactions found</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards Section */}
              <div ref={contentRefs.rewards} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-2xl font-['The-Last-Shuriken'] opacity-70">REWARDS</h2>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <div className="bg-[#2c2c2c] p-4">
                      <p className="text-gray-400">No rewards available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Section */}
              <div ref={contentRefs.logout} className="mb-6">
                <div className="flex bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-2xl font-['The-Last-Shuriken'] opacity-70">LOG OUT</h2>
                  </div>
                  <div className="flex-1 px-10 py-12">
                    <button className="bg-[--primaryColor] hover:bg-red-700 text-white px-6 py-3">
                      CONFIRM LOGOUT
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty div at the bottom to create scrolling space */}
              <div className="h-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;