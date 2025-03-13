"use client"
import React from 'react';
import Image from 'next/image';

const SignupPage = () => {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full my-8" style={{ maxHeight: '800px' }}>
        {/* Left side with Image */}
        <div className="hidden md:block w-2/6 relative overflow-hidden ">
          <Image 
            src="/hero-image.png" 
            alt="Game Character" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Right side with Form and Logo */}
        <div className="w-full md:w-4/6 pt-0 px-8 md:px-12 flex items-start justify-between relative">
          <div className="w-full max-w-2xl pr-14">
            <div className="flex flex-col">
              <h2 className="text-4xl font-extrabold tracking-wider uppercase leading-none mb-0">SIGN UP</h2>
              <p className="text-gray-600 text-md font-['Rentukka-Regular'] -mt-1 leading-tight">Register your account</p>
            </div>

            <form className="space-y-5 mt-10 font-['Rentukka-Regular'] w-full">
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="block text-md font-medium text-gray-700">
                    user name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full bg-gray-200 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-md font-medium text-gray-700">
                    email/phone no
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="block w-full bg-gray-200 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your email/phone no"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-md font-medium text-gray-700">
                    password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full bg-gray-200 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="set your password"
                  />
                </div>
              </div>

              <div className="space-y-8 py-6">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      id="terms1"
                      name="terms1"
                      type="checkbox"
                      className="peer h-5 w-5 appearance-none bg-gray-200 checked:bg-gray-800 focus:outline-none relative"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <label htmlFor="terms1" className="ml-2 block text-md text-gray-600">
                    i agree to terms and conditions
                  </label>
                </div>

                <div className="flex items-center">
                  <div className="relative">
                    <input
                      id="terms2"
                      name="terms2"
                      type="checkbox"
                      className="peer h-5 w-5 appearance-none bg-gray-200 checked:bg-gray-800 focus:outline-none relative"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  <label htmlFor="terms2" className="ml-2 block text-md text-gray-600">
                    i agree to terms and conditions
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-[190px] flex justify-start py-3 px-8 border border-transparent rounded-full text-white bg-[var(--navBlack)] hover:bg-gray-700 focus:outline-none shadow-lg shadow-gray-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-500/60"
                >
                  sign up
                </button>
              </div>

              <div className="flex items-center pt-2">
                <div className="relative">
                  <input
                    id="staySignedIn"
                    name="staySignedIn"
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none bg-gray-200 checked:bg-gray-800 focus:outline-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <label htmlFor="staySignedIn" className="ml-2 block text-sm text-gray-600">
                  stay signed in
                </label>
              </div>

              <div className="text-left pt-4">
                <p className="text-md text-gray-600">
                  or quick log in - google
                </p>
              </div>
            </form>
          </div>

          {/* Logo on the right */}
          <div className="pt-10 z-10 pointer-events-none absolute right-10 top-0">
            <div className="relative">
              <div className="transform origin-center">
                <Image 
                  src="/logo-imageV4.png" 
                  alt="CODE PROJEKT" 
                  width={150} 
                  height={70}
                  className="p-3 rounded rotate-90"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
