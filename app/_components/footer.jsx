"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../_styles/animations";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#1A1A1A] text-white py-6 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="container mx-auto px-4"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Left Section - Links: Center items on mobile, align end on medium screens */}
          <motion.div
            className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right mt-2 order-2 md:order-1"
            variants={fadeIn("right", 0.2)}
          >
            <motion.div
              whileHover={{ x: -5, color: "#d51722" }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/about"
                className="hover:text-gray-300 transition-colors"
              >
                About Us
              </a>
            </motion.div>
            {/* {<motion.div whileHover={{ x: -5, color: "#d51722" }} transition={{ duration: 0.2 }}>
              <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
            </motion.div>} */}
            <motion.div
              whileHover={{ x: -5, color: "#d51722" }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/contact"
                className="hover:text-gray-300 transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
            <motion.div
              whileHover={{ x: -5, color: "#d51722" }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/refund"
                className="hover:text-gray-300 transition-colors"
              >
                Refund Policy
              </a>
            </motion.div>

            <motion.div
              whileHover={{ x: -5, color: "#d51722" }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/privacy"
                className="hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
            </motion.div>
            <motion.div
              whileHover={{ x: -5, color: "#d51722" }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
            </motion.div>
          </motion.div>

          {/* Middle Section - Logo: Center items, remove rotation on mobile */}
          <motion.div
            className="flex items-center order-1 md:order-2"
            variants={fadeIn("up", 0.3)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <Link href="/">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src="/logo-imageV4white.png"
                      alt="Code Projekt Logo"
                      width={130}
                      height={40}
                      className="object-contain w-[90px] md:w-[130px] h-auto md:rotate-90"
                    />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Payment Methods: Center items on mobile, align start on medium screens */}
          <motion.div
            className="flex flex-col items-center md:items-start order-3 md:order-3"
            variants={fadeIn("left", 0.2)}
          >
            <motion.h3
              className="text-lg mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Payment Method Supported
            </motion.h3>
            <div className="flex flex-col items-center md:items-start gap-2">
              <motion.div
                className="flex items-center font-['The-Last-Shuriken']"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">CODEPRO COINS</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">Paytm</span>
                <span className="text-sm">PhonePe</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">G Pay</span>
                <span className="text-sm">UPI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center text-sm mt-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} CodeProjekt. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-500">
            Made with <span className="text-red-500">♥</span> by{" "}
            <a
              href="https://backendandbeyond.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-400"
            >
              Backend and Beyond
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
