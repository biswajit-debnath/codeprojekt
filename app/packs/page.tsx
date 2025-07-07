"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../_styles/animations";
import { BackendApiClient } from "../_lib/services/backendApiClient";

const GiftPacksPage = () => {
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [giftPackCategories, setGiftPackCategories] = useState<{
    [category: string]: any;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGiftPacks = async () => {
      try {
        const data = await BackendApiClient.getInstance().getProductSPUs(
          "mobilelegends"
        );
        setGiftPackCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch gift packs"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftPacks();
  }, []);

  const verifyUserDetails = async () => {
    console.log("Verification started", { userId, zoneId });

    if (!userId || !zoneId) {
      setVerificationStatus("Please enter both User ID and Zone ID");
      return;
    }

    setIsVerifying(true);
    setVerificationStatus("");

    try {
      const data = await BackendApiClient.getInstance().getplayerIGN(
        userId,
        zoneId
      );

      setVerificationStatus(data.username || "Verification completed");
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus(
        error instanceof Error ? error.message : "Verification failed"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSelectPack = (index: number) => {
    setSelectedPack(index);
    console.log(`Selected pack ${index}:`, giftPackCategories[index]);

    if (!verificationStatus) {
      alert("Please verify your User ID and Zone ID first");
      return;
    }
  };

  return (
    <div className="pt-10 pb-16">
      {/* Main Content */}
      <motion.div
        className="max-w-[1550px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
      >
        {/* Input and Features Row */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-3 mb-8">
          {/* Left side - Input Game ID */}
          <motion.div
            className="md:w-3/6 md:pr-8 lg:pr-16"
            variants={fadeIn("right", 0.3)}
          >
            {/* Step 1: Input Game ID */}
            <div className="mb-6">
              <motion.div
                className="flex items-start mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-500 text-white flex items-center justify-center text-base md:text-lg mr-1"
                    style={{ transform: "translateY(-2px)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    1
                  </motion.div>
                  <motion.h2
                    className="text-lg md:text-xl font-['The-Last-Shuriken']"
                    style={{ lineHeight: "1" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    INPUT YOUR IN GAME ID
                  </motion.h2>
                </div>
                <motion.div
                  className="ml-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[--primaryColor] text-white flex items-center justify-center text-[10px] md:text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                >
                  i
                </motion.div>
              </motion.div>

              <motion.div className="space-y-2" variants={fadeIn("up", 0.4)}>
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-base md:text-lg font-medium text-gray-800 pl-1 dark:text-gray-400"
                  >
                    Enter User ID
                  </label>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <input
                      type="text"
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="1234567890"
                      className="w-full px-3 py-2 md:px-5 md:py-2 bg-gray-300 text-base md:text-lg"
                    />
                  </motion.div>
                </div>
                <div>
                  <label
                    htmlFor="zoneId"
                    className="block text-base md:text-lg font-medium text-gray-700 pl-1 dark:text-gray-400"
                  >
                    Enter Zone ID
                  </label>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      id="zoneId"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      placeholder="12345"
                      className="w-full px-3 py-2 md:px-5 md:py-2 bg-gray-300 text-base md:text-lg"
                    />
                  </motion.div>
                </div>
                <motion.button
                  onClick={verifyUserDetails}
                  disabled={isVerifying}
                  className="mt-3 md:mt-4 px-4 py-2 md:px-6 md:py-2 bg-[--primaryColor] text-white rounded disabled:opacity-50 text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {isVerifying ? "Verifying..." : "Verify Details"}
                </motion.button>
                {verificationStatus ? (
                  <motion.div
                    className="text-base md:text-lg text-gray-500 pl-2 pt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {verificationStatus}
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-base md:text-lg text-gray-500 pl-2 pt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    IGN : In Game Name
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            className="md:w-3/5 bg-gray-300 px-6 py-6 md:pl-10 md:pr-12 lg:pl-14 lg:pr-16 md:py-8 h-fit md:pb-24"
            variants={slideIn("left", 0.7)}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 },
            }}
          >
            <motion.h2
              className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              NEW FEATURES:
            </motion.h2>

            <motion.div
              className="text-base md:text-xl space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.div
                className="text-gray-800"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Wallet System Added
              </motion.div>
              <motion.div
                className="text-gray-800"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Through Wallet Get Gifts Instantly
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Step 2: Select Packs - Full Width */}
        <div>
          <motion.div
            className="flex items-start mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center">
              <motion.div
                className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-500 text-white flex items-center justify-center text-base md:text-lg mr-1"
                style={{ transform: "translateY(-4px)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.9,
                }}
              >
                2
              </motion.div>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-['The-Last-Shuriken']"
                style={{ lineHeight: "1" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                SELECT YOUR PACKS
              </motion.h2>
            </div>
            <motion.div
              className="ml-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[--primaryColor] text-white flex items-center justify-center text-[10px] md:text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.1,
              }}
              whileHover={{
                rotate: 360,
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
            >
              i
            </motion.div>
          </motion.div>

          {isLoading ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading gift packs...
            </motion.div>
          ) : error ? (
            <motion.div
              className="text-center py-8 text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          ) : (
            Object.keys(giftPackCategories).map((category) => (
              <div key={category} className="mb-10 w-full">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 mt-6 dark:text-gray-400">
                  {category}
                </h3>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 place-items-center md:place-items-start"
                  variants={staggerContainer(0.05)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  {giftPackCategories[category].map(
                    (pack: any, index: number) => (
                      <motion.button
                        key={pack.id}
                        onClick={() => handleSelectPack(index)}
                        className={`relative overflow-hidden text-white transition-all w-full max-w-[240px] ${
                          selectedPack === index ? "ring-2 ring-red-600" : ""
                        }`}
                        style={{
                          borderRadius: "0 0 40px 0",
                          backgroundColor: "var(--navBlack)",
                        }}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          show: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              type: "spring",
                              duration: 0.5,
                              delay: index * 0.03,
                            },
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="relative p-3 md:p-4">
                          <motion.div
                            className="absolute top-0 right-[-3px] md:right-[-5px]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.2 + index * 0.02,
                              duration: 0.3,
                            }}
                          >
                            <div className="w-8 h-10 md:w-10 md:h-12 flex">
                              <Image
                                src="/logo-imageV4white.png"
                                alt="Code Projekt Logo"
                                width={130}
                                height={40}
                                className="object-contain rotate-90"
                              />
                            </div>
                          </motion.div>
                          <div className="flex justify-between items-start">
                            <motion.span
                              className="text-xl md:text-2xl sm:text-3xl md:text-4xl pt-1 md:pt-2"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.3 + index * 0.02,
                                duration: 0.3,
                              }}
                            >
                              ₹ {pack.price_inr}
                            </motion.span>
                            <motion.div
                              className="ml-1 mr-2 md:mr-4"
                              animate={{
                                y: [0, -5, 0],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5 + (index % 3) * 0.2,
                                ease: "easeInOut",
                              }}
                            >
                              <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]">
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  preserveAspectRatio="xMidYMid meet"
                                >
                                  <path
                                    d="M16 2L3 10L16 18L29 10L16 2Z"
                                    fill="#4FC3F7"
                                  />
                                  <path
                                    d="M16 18L3 10L16 30L29 10L16 18Z"
                                    fill="#2196F3"
                                  />
                                  <path
                                    d="M16 2L8 7L16 12L24 7L16 2Z"
                                    fill="#4FC3F7"
                                  />
                                  <path
                                    d="M16 12L8 7L16 20L24 7L16 12Z"
                                    fill="#2196F3"
                                  />
                                  <path
                                    d="M16 2L10 6L16 10L22 6L16 2Z"
                                    fill="#E1F5FE"
                                  />
                                  <path
                                    d="M16 2L13 4L16 6L19 4L16 2Z"
                                    fill="#FFFFFF"
                                  />
                                  <path
                                    d="M8 18L3 10L8 25L13 10L8 18Z"
                                    fill="#1565C0"
                                  />
                                  <path
                                    d="M24 18L29 10L24 25L19 10L24 18Z"
                                    fill="#1565C0"
                                  />
                                </svg>
                              </div>
                            </motion.div>
                          </div>
                          <motion.div
                            className="text-md md:text-2xl mt-1 flex items-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.4 + index * 0.02,
                              duration: 0.3,
                            }}
                          >
                            {typeof pack.spu === "string"
                              ? pack.spu.replace(/diamond/gi, "gift pack")
                              : pack.spu}
                          </motion.div>
                        </div>
                      </motion.button>
                    )
                  )}
                </motion.div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GiftPacksPage;
