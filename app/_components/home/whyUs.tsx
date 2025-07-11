"use client";
import React from "react";
import { Gift, Wallet, Percent, HandHeart, Headset } from "lucide-react";
// import Image from 'next/image';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../_styles/animations";

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
          Hundreds of gaming enthusiasts trust CodeProjekt every month for
          authentic, high-quality merchandise inspired by their favorite games.
          Whether you are looking for stylish T-shirts, detailed action figures,
          collectible posters, or premium stickers, we deliver a seamless
          shopping experience backed by:
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-x-8 gap-y-4"
          variants={staggerContainer(0.1, 0.4)}
        >
          {/* Fast and Reliable Shipping */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.1)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <Gift size={42} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">FAST AND RELIABLE SHIPPING</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight ">
                Get your favorite merchandise delivered quickly and securely to your doorstep, anywhere in India.
              </p>
            </div>
          </motion.div>

          {/* Secure Payments */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.2)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3, type: "spring" },
                }}
              >
                <Wallet size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">SECURE PAYMENTS</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Pay safely via UPI, debit/credit cards, and net banking with trusted payment gateways.
              </p>
            </div>
          </motion.div>

          {/* Quality Assurance */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.3)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 15, transition: { duration: 0.3 } }}
              >
                <Percent size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">QUALITY ASSURANCE</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Every product is carefully checked to ensure you receive only the best quality merchandise.
              </p>
            </div>
          </motion.div>

          {/* Responsive Customer Support */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.4)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                <Headset size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">DEDICATED CUSTOMER SUPPORT</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Our responsive team is here to help you with any questions or issues—before and after your purchase.
              </p>
            </div>
          </motion.div>

          {/* Exclusive Drops */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.5)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{
                  rotate: [0, 360],
                  transition: { duration: 0.5 },
                }}
              >
                <HandHeart size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">EXCLUSIVE DROPS</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Shop exclusive merchandise from your favorite game franchises—available only at CodeProjekt.
              </p>
            </div>
          </motion.div>

          {/* New Collections & Limited Editions */}
          <motion.div
            className="flex items-start gap-3"
            variants={fadeIn("up", 0.6)}
            whileHover={{ x: 10, transition: { duration: 0.2 } }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                <Gift size={36} strokeWidth={1.5} />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md md:text-xl ">NEW COLLECTIONS & LIMITED EDITIONS</h3>
              <p className="-mt-0.5 text-sm md:text-base leading-tight">
                Discover new arrivals and limited-edition items—stay connected for the latest drops and updates!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhyUs;
