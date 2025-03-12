"use client"
import React from 'react';
import Image from 'next/image';

const SignupPage = () => {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex flex-1 max-w-6xl mx-auto w-full my-8" style={{ maxHeight: '800px' }}>
        {/* Left side with Image */}
        <div className="hidden md:block w-2/5 relative overflow-hidden">
          <Image 
            src="/hero-image.png" 
            alt="Game Character" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Right side with Form */}
        <div className="w-full md:w-3/5 pt-0 px-8 md:px-12 flex flex-col items-start justify-start relative">
          <div className="w-full max-w-lg">
            <div className="mt-0">
              <h2 className="text-4xl font-extrabold tracking-wider uppercase">SIGN UP</h2>
              <p className="text-gray-600">Register your account</p>
            </div>

            <form className="space-y-5 mt-10">
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label htmlFor="terms1" className="ml-2 block text-sm text-gray-600">
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
                  <label htmlFor="terms2" className="ml-2 block text-sm text-gray-600">
                    i agree to terms and conditions
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-2/5 flex justify-start py-3 px-8 border border-transparent rounded-full shadow-sm text-white bg-gray-800 hover:bg-black focus:outline-none"
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
                <p className="text-sm text-gray-600">
                  or quick log in - google
                </p>
              </div>
            </form>
          </div>

          {/* Logo on the right */}
          <div className="absolute right-0 top-0 h-full flex items-start justify-start pt-6 pr-6">
            <div className="relative">
              <div className="transform origin-center">
                <Image 
                  src="/logo-imageV4.png" 
                  alt="CODE PROJEKT" 
                  width={150} 
                  height={80}
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
