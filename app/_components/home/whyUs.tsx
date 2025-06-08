"use client"
import React from 'react';
import { Gift, Wallet, Percent } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../_styles/animations';

const WhyUs = () => {
  return (
    <motion.div 
      className="py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div 
        className="max-w-[1550px] mx-auto px-5 md:px-10 lg:px-20"
        variants={staggerContainer(0.1, 0.2)}
      >
        <motion.h2 
          className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 font-['The-Last-Shuriken']"
          variants={fadeIn("down", 0.1)}
        >
          WHY CODE PROJEKT
        </motion.h2>
        
        <motion.p 
          className="mb-12 max-w-6xl text-sm md:text-lg leading-tight"
          variants={fadeIn("down", 0.3)}
        >
          Hundreds of gamers count on codeprojekt every month for a seamless purchase experience when buying game credits or vouchers. 
          Purchases are added to your game account instantly. mlbb mobile, and more coming soon!
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-2 gap-x-8 gap-y-4"
          variants={staggerContainer(0.1, 0.4)}
        >
          {/* Easy and Fast */}
          <motion.div 
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.1)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                <Image src="/hand.png" alt="Logo" width={40} height={40} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">EASY AND FAST</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight ">
                It only takes a few seconds to complete a purchase on codepro
              </p>
            </div>
          </motion.div>

          {/* Instant Delivery */}
          <motion.div 
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.2)} 
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.2, transition: { duration: 0.3, type: "spring" } }}
              >
                <Gift size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">INSTANT DELIVERY</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                When you top-up on Codashop, your purchase is delivered directly to your game account as soon as your payment is complete.
              </p>
            </div>
          </motion.div>

          {/* Convenient Payment Methods */}
          <motion.div 
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.3)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 15, transition: { duration: 0.3 } }}
              >
                <Wallet size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">CONVENIENT PAYMENT METHODS</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                To ensure your convenience, we have partnered with the most popular providers in India.
              </p>
            </div>
          </motion.div>

          {/* Customer Support */}
          <motion.div 
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.4)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ 
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } 
                }}
              >
                <Image src="/headphones.png" alt="Logo" width={40} height={40} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">CUSTOMER SUPPORT</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Our friendly customer support team is always available to assist you. contact us
              </p>
            </div>
          </motion.div>

          {/* Exciting Promotions */}
          <motion.div 
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.5)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ 
                  rotate: [0, 360], 
                  transition: { duration: 0.5 } 
                }}
              >
                <Percent size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">EXCITING PROMOTIONS</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Keep a lookout for the best/free gifts deals for your favorite games at codeprojekt.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhyUs;