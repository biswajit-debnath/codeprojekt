"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import GoogleSignIn from '../_components/login/GoogleSignIn';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '../_styles/animations';

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
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4 sm:px-5 md:px-16 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.main 
        className="flex flex-1 max-w-[1550px] mx-auto w-full"
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="show"
      >
        {/* Left side with Image - Visible only on md+ screens */}
        <motion.div 
          className="hidden md:block w-[450px] relative overflow-hidden"
          variants={slideIn("right", 0.3)}
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Image 
              src="/hero-image.png" 
              alt="Game Character" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right side with Form and Logo - Takes full width on mobile, 4/6 on md+ */}
        <motion.div 
          className="w-full md:w-4/6 pt-0 px-4 sm:px-8 md:px-12 flex items-start justify-between relative"
          variants={fadeIn("left", 0.4)}
        >
          <div className="w-full max-w-3xl md:pr-14">
            <motion.div 
              className="flex flex-col mb-4 md:mb-6"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold tracking-wider uppercase leading-none mb-0 font-['The-Last-Shuriken']"
                variants={fadeIn("down", 0.1)}
              >
                SIGN IN
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-sm sm:text-md -mt-1 leading-tight"
                variants={fadeIn("down", 0.2)}
              >
                Login to your account
              </motion.p>
            </motion.div>

            {/* Image for mobile view - hidden on md+ */}
            <motion.div 
              className="my-4 md:my-6 block md:hidden"
              variants={fadeIn("up", 0.3)}
            >
              <div className="relative w-full">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src="/hero-image.png" 
                    alt="Game Character" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {error && (
              <motion.div 
                className="mt-4 text-red-600 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <motion.form 
              className="space-y-5 mt-6 md:mt-10 w-full" 
              onSubmit={handleSubmit}
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              animate="show"
            >
              <motion.div 
                className="space-y-3 md:space-y-5"
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={fadeIn("up", 0.1)}>
                  <label htmlFor="email" className="block text-md font-medium text-gray-800">
                    email
                  </label>
                  <motion.input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your email"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div variants={fadeIn("up", 0.2)}>
                  <label htmlFor="password" className="block text-md font-medium text-gray-800">
                    password
                  </label>
                  <motion.input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-300 border-0 py-3 px-4 focus:outline-none focus:ring-0"
                    placeholder="enter your password"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex justify-end"
                variants={fadeIn("up", 0.3)}
              >
                <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                  forgot password?
                </Link>
              </motion.div>

              <motion.div 
                className="pt-6 md:pt-8"
                variants={fadeIn("up", 0.4)}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-[190px] flex justify-start py-3 px-8 border border-transparent rounded-full text-white bg-[var(--foreground)] hover:bg-[var(--foreground)] focus:outline-none shadow-md shadow-gray-500/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Signing in...' : 'sign in'}
                </motion.button>
              </motion.div>

              <motion.div 
                className="flex items-center"
                variants={fadeIn("up", 0.5)}
              >
                <div className="relative">
                  <motion.input
                    id="staySignedIn"
                    name="staySignedIn"
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none bg-gray-300 checked:bg-gray-800 focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <label htmlFor="staySignedIn" className="ml-2 block text-sm text-gray-400 font-medium">
                  stay signed in
                </label>
              </motion.div>

              <motion.div 
                className="text-left pt-1"
                variants={fadeIn("up", 0.6)}
              >
                <GoogleSignIn />
              </motion.div>
            </motion.form>
          </div>

          {/* Logo on the right */}
          <motion.div 
            className="hidden sm:block pt-10 z-10 pointer-events-none absolute right-4 sm:right-10 top-0"
            variants={fadeIn("left", 0.7)}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              <motion.div 
                className="transform origin-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image 
                  src="/logo-imageV4.png" 
                  alt="CODE PROJEKT" 
                  width={150} 
                  height={70}
                  className="p-3 rounded rotate-90"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default LoginPage; 