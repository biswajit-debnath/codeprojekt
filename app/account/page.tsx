'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';


type ContentRefKeys = 'id' | 'wallet' | 'personal' | 'achievements' | 'history' | 'rewards' | 'logout';
interface NavItemProps {
  id: ContentRefKeys;
  label: string;
  onClick: (id: ContentRefKeys) => void;
}

const AccountPage = () => {
  type ContentRefKeys = keyof typeof contentRefs;
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    email: '',
    photoURL: '/profile-image.png',
    phoneNumber: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Firebase user:', user); // Debug log
      if (user) {
        setUserProfile({
          displayName: user.displayName || 'Not set',
          email: user.email || 'Not set',
          photoURL: user.photoURL || '/profile-image.png',
          phoneNumber: user.phoneNumber || 'Not set',
        });
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

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
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
        router.push("/login"); // or use window.location
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
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
      <div className="flex-1 flex flex-col mt-20 px-4 sm:px-8 md:px-16 pb-16 overflow-hidden max-w-[1550px] mx-auto w-full">
        <h1 className="text-lg font-['The-Last-Shuriken'] text-black">YOUR ACCOUNT</h1>

        {/* Content area with navigation and content sections */}
        {/* Layout changes: flex-col on mobile, flex-row on md+ */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Navigation - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block w-80 flex-shrink-0">
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

          {/* Container with margin bottom & conditional left margin */}
          {/* Takes full width on mobile, adds margin on md+ */}
          <div className="flex-1 mb-16 relative md:ml-8">
            {/* Right Content Area - Scrollable with internal padding */}
            {/* Padding adjusted: No right padding on mobile, added on md+ */}
            <div id="content-container" className="absolute inset-0 overflow-y-auto overflow-x-hidden pr-0 md:pr-4">
              {/* ID Section - Stacks on mobile, row on md+ */}
              <div ref={contentRefs.id} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[--navBlack] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6 flex flex-col pb-4 md:pb-14 items-center md:items-start">
                    <h2 className="text-xl md:text-2xl mb-2 font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">CODEPRO ID</h2>
                    <div className="w-full flex justify-center">
                      <div className="relative w-24 h-24 md:w-32 md:h-32">
                        <Image
                          src={userProfile.photoURL || '/profile-image.png'}
                          alt=""
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-gray-400 mb-1">ACCOUNT ID</h3>
                      <p className="text-xl">CODEPRO11111</p>

                      <h3 className="text-gray-400 mb-1">Display Name</h3>
                      <p className="text-xl">{userProfile.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 mb-1">Email</h3>
                      <p className="text-xl">{userProfile.email || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Section - Stacks on mobile, row on md+ */}
              <div ref={contentRefs.wallet} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6 flex flex-col pb-4 md:pb-14 items-center md:items-start">
                    <h2 className="text-xl md:text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">MY WALLET</h2>
                    <div className="w-full flex justify-center">
                      <div className="relative w-24 h-24 md:w-32 md:h-32">
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
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    <div>
                      <p className="text-gray-400 pl-0 md:pl-7 text-center md:text-left">WALLET BALANCE - Codepro coins</p>
                      {/* Button layout stacks on mobile */}
                      <div className="flex flex-col md:flex-row justify-between items-center mt-2 bg-[#2c2c2c] p-4">
                        <p className="text-2xl pl-0 md:pl-4 mb-4 md:mb-0">00.00</p>
                        <button className="bg-[--primaryColor] text-white px-4 md:px-6 py-3 md:py-4 flex items-center text-md md:text-lg w-full md:w-auto justify-center">
                          <span className="mr-2 md:mr-4 text-2xl md:text-4xl">+</span> ADD WALLET BALANCE
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-400 pl-0 md:pl-7 text-lg text-center md:text-left">Wallet Transactions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section - Stacks on mobile, row/grid on md+ */}
              <div ref={contentRefs.personal} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">PERSONAL INFORMATION</h2>
                  </div>
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    {/* Grid stacks on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2c2c2c] mb-3 p-4 md:pl-4">
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">EMAIL</p>
                        <p>{userProfile.email || 'Not set'}</p>
                      </div>
                      <div className="p-4 rounded">
                        <p className="text-gray-400 mb-2">PHONE NO</p>
                        <p>{userProfile.phoneNumber || 'Not set'}</p>
                      </div>
                    </div>
                    {/* Grid stacks on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2c2c2c] p-4 md:pl-4">
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

              {/* Achievements Section - Stacks on mobile, row/grid on md+ */}
              <div ref={contentRefs.achievements} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">ACHIEVEMENT</h2>
                  </div>
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    {/* Grid stacks on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Transaction History Section - Stacks on mobile, row on md+ */}
              <div ref={contentRefs.history} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">TRANSACTION HISTORY</h2>
                  </div>
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    <div className="bg-[#2c2c2c] p-4">
                      <p className="text-gray-400">No transactions found</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards Section - Stacks on mobile, row on md+ */}
              <div ref={contentRefs.rewards} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">REWARDS</h2>
                  </div>
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    <div className="bg-[#2c2c2c] p-4">
                      <p className="text-gray-400">No rewards available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Section - Stacks on mobile, row on md+ */}
              <div ref={contentRefs.logout} className="mb-6">
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <div className="w-full md:w-64 bg-[#2c2c2c] p-6">
                    <h2 className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left">LOG OUT</h2>
                  </div>
                  {/* Padding adjusts for mobile */}
                  <div className="flex-1 px-4 md:px-10 py-12">
                    {/* Button width adjusts for mobile */}
                    <button onClick={handleLogout} className="bg-[--primaryColor] hover:bg-red-700 text-white px-6 py-3 w-full md:w-auto">
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