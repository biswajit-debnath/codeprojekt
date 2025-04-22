"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import GoogleSignIn from '../components/GoogleSignIn';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/');
    } catch (err: unknown) {
      let errorMessage = 'An error occurred during login';
      if (typeof err === 'object' && err !== null && 'code' in err && typeof (err as { code: unknown }).code === 'string') {
        if ((err as { code: string }).code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message; // Use generic error message if code isn't available
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4 sm:px-5 md:px-16 py-10">
      <main className="flex flex-1 max-w-[1550px] mx-auto w-full">
        {/* Left side with Image - Visible only on md+ screens */}
        <div className="hidden md:block w-[450px] relative overflow-hidden ">
          <Image 
            src="/hero-image.png" 
            alt="Game Character" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Right side with Form and Logo - Takes full width on mobile, 4/6 on md+ */}
        <div className="w-full md:w-4/6 pt-0 px-4 sm:px-8 md:px-12 flex items-start justify-between relative">
          <div className="w-full max-w-3xl md:pr-14">
            <div className="flex flex-col mb-4 md:mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-wider uppercase leading-none mb-0 font-['The-Last-Shuriken']">SIGN IN</h2>
              <p className="text-gray-600 text-sm sm:text-md -mt-1 leading-tight">Login to your account</p>
            </div>

            {/* Image for mobile view - hidden on md+ */}
            <div className="my-4 md:my-6 block md:hidden">
              <div className="relative w-full">
                <Image 
                  src="/hero-image.png" 
                  alt="Game Character" 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-5 mt-6 md:mt-10 w-full" onSubmit={handleSubmit}>
              <div className="space-y-3 md:space-y-5">
                <div>
                  <label htmlFor="email" className="block text-md font-medium text-gray-800">
                    email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-md font-medium text-gray-800">
                    password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your password"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                  forgot password?
                </Link>
              </div>

              <div className="pt-6 md:pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-[190px] flex justify-start py-3 px-8 border border-transparent rounded-full text-white bg-[var(--foreground)] hover:bg-[var(--foreground)] focus:outline-none shadow-md shadow-gray-500/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'sign in'}
                </button>
              </div>

              <div className="flex items-center">
                <div className="relative">
                  <input
                    id="staySignedIn"
                    name="staySignedIn"
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none bg-gray-300 checked:bg-gray-800 focus:outline-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <label htmlFor="staySignedIn" className="ml-2 block text-sm text-gray-400 font-medium">
                  stay signed in
                </label>
              </div>

              <div className="text-left pt-1">
                <GoogleSignIn />
              </div>
            </form>
          </div>

          {/* Logo on the right */}
          <div className="hidden sm:block pt-10 z-10 pointer-events-none absolute right-4 sm:right-10 top-0">
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

export default LoginPage; 