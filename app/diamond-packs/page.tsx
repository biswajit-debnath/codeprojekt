'use client';
import React, { useState } from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen pt-8 pb-16">
      {/* Main Content */}
      <div className="max-w-[1550px] mx-auto px-5 md:px-20">
        {/* Input and Features Row */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          {/* Left side - Input Game ID */}
          <div className="md:w-3/6 pr-16">
            {/* Step 1: Input Game ID */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-xl">INPUT YOUR IN GAME ID</h2>
                <div className="ml-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                  i
                </div>
              </div>
              
              <div className="space-y-3 font-['Rentukka-Regular']">
                <div>
                  <label htmlFor="userId" className="block text-lg font-medium text-gray-700 mb-1">
                    Enter User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-5 py-2 bg-gray-300 text-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="zoneId" className="block text-lg font-medium text-gray-700 mb-1">
                    Enter Zone ID
                  </label>
                  <input
                    type="text"
                    id="zoneId"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="12345"
                    className="w-full px-5 py-2 bg-gray-300 text-lg "
                  />
                </div>
                
                <div className="text-lg text-gray-500">
                  IGN : In Game Name
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Features */}
          <div className="md:w-3/5 bg-gray-300 p-6 pr-16 rounded-md font-['Rentukka-Regular']">
            <h2 className="text-xl font-bold text-red-600 mb-8">NEW FEATURES:</h2>
            
            <div className="text-xl pl-4">
              <div className="text-gray-800 ">
                Wallet System Added
              </div>
              <div className="text-gray-800">
                Through Wallet Get Diamonds Instantly
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 2: Select Packs - Full Width */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold mr-3">
              2
            </div>
            <h2 className="text-4xl">SELECT YOUR PACKS</h2>
            <div className="ml-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
              i
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 font-['Rentukka-Regular']">
            {diamondPacks.map((pack, index) => (
              <button
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
              >
                <div className="relative p-4">
                  <div className="absolute top-0 right-[-5px]">
                    <div className="w-10 h-12 flex">
                        <Image
                            src="/logo-imageV4white.png"
                            alt="Code Projekt Logo"
                            width={130}
                            height={40}
                            className="object-contain rotate-90"
                            />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-4xl pt-2">{pack.price}</span>
                    <div className="ml-1 mr-4">
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
                    </div>
                  </div>
                  <div className="text-2xl mt-1 flex items-start">{pack.amount}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondPacksPage;