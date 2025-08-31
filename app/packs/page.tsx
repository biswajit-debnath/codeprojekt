"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../_styles/animations";
import { BackendApiClient } from "../_lib/services/backendApiClient";

const GiftPacksPage = () => {
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [giftPackCategories, setGiftPackCategories] = useState<{
    [category: string]: any;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

  const handleSelectPack = (id: string) => {
    
    if (!verificationStatus) {
      alert("Please verify your User ID and Zone ID first");
      return;
    }
    setSelectedPack(id);
  };

  const handlePurchase = async (selectedPackDetails: any) => {
    if (!selectedPackDetails || !userId || !zoneId) {
      alert("Please ensure all details are entered before proceeding");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const purchaseData = {
        spuDetails: {
          product: "mobilelegends",
          price: parseFloat(selectedPackDetails.price)
        },
        spuType: "inGameItem",
        userDetails: {
          username: "temp-username-" + Math.random().toString(36).substr(2, 9),
          uid: "temp-uid-" + Math.random().toString(36).substr(2, 9)
        },
        playerDetails: {
          userid: userId,
          zoneid: zoneId
        },
        statusPageRedirectUrl: window.location.origin + "/transaction-status"
      };

      
      const response = await BackendApiClient.getInstance().purchaseSPU(
        selectedPackDetails.id,
        purchaseData
      );

      // Redirect to payment URL if provided
      if (response.phonePayRedirectUrl) {
        window.location.href = response.phonePayRedirectUrl;
      } else {
        alert("Payment URL not received. Please try again.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert(error instanceof Error ? error.message : "Purchase failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
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
                      className="w-full px-3 py-2 md:px-5 md:py-2 bg-gray-300 text-black md:text-lg"
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
                      className="w-full px-3 py-2 md:px-5 md:py-2 bg-gray-300 text-black md:text-lg"
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
                        onClick={() => handleSelectPack(pack.id)}
                        className={`relative overflow-hidden text-white transition-all w-full max-w-[240px] ${
                          selectedPack === pack.id ? "ring-2 ring-red-600" : ""
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
                              className="text-xl md:text-3xl sm:text-3xl pt-1 md:pt-2"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.3 + index * 0.02,
                                duration: 0.3,
                              }}
                            >
                              ₹{pack.price_inr}
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
                            className="text-md md:text-xl mt-1 flex items-start text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.4 + index * 0.02,
                              duration: 0.3,
                            }}
                          >
                            {typeof pack.spu === "string"
                              ? pack.spu.replace(/diamond/gi, "gift pack").replace(/mobilelegends BR ?/gi, "").replace(/&/gi, "+").replace(/mobile legends BR - /gi, "")
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

        {/* Step 3: Order Overview - Shows when pack is selected */}
        {selectedPack && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-start mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                    delay: 0.1,
                  }}
                >
                  3
                </motion.div>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-['The-Last-Shuriken']"
                  style={{ lineHeight: "1" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  ORDER OVERVIEW
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

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side - Summary Card */}
              <motion.div
                className="lg:flex-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {(() => {
                  // Find the selected pack details
                  let selectedPackDetails = null;
                  for (const category in giftPackCategories) {
                    const pack = giftPackCategories[category].find((p: any) => p.id === selectedPack);
                    if (pack) {
                      selectedPackDetails = pack;
                      break;
                    }
                  }

                  if (!selectedPackDetails) return null;

                  const packName = typeof selectedPackDetails.spu === "string"
                    ? selectedPackDetails.spu.replace(/diamond/gi, "gift pack").replace(/mobilelegends BR ?/gi, "").replace(/&/gi, "+").replace(/mobile legends BR - /gi, "")
                    : selectedPackDetails.spu;

                  return (
                    <div
                      className="bg-black text-white p-8 md:p-10 relative overflow-hidden"
                      style={{
                        borderRadius: "0 0 40px 0",
                      }}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full transform translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500 rounded-full transform -translate-x-12 translate-y-12"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-lg md:text-xl font-bold uppercase tracking-wider">
                            Your Selection
                          </span>
                        </div>
                        
                        <div className="mb-8">
                          <h4 className="text-2xl md:text-3xl font-bold mb-3">
                            {packName}
                          </h4>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-black text-red-500">
                              ₹{selectedPackDetails.price_inr}
                            </span>
                            <span className="text-gray-400">INR</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-gray-300">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Instant delivery</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Secure payment</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>24/7 support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>

              {/* Right side - Payment Button */}
              <motion.div
                className="lg:w-80"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {(() => {
                  // Find the selected pack details for button
                  let selectedPackDetails = null;
                  for (const category in giftPackCategories) {
                    const pack = giftPackCategories[category].find((p: any) => p.id === selectedPack);
                    if (pack) {
                      selectedPackDetails = pack;
                      break;
                    }
                  }

                  if (!selectedPackDetails) return null;

                  return (
                    <div className="h-full flex flex-col justify-center">
                      <motion.button
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 md:py-8 px-8 text-xl md:text-2xl rounded-2xl shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ 
                          scale: isProcessingPayment ? 1 : 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                        disabled={isProcessingPayment}
                        onClick={() => handlePurchase(selectedPackDetails)}
                      >
                        {/* Button background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Button content */}
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>{isProcessingPayment ? "PROCESSING..." : "PAY NOW"}</span>
                        </div>
                        
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      </motion.button>
                      
                      <motion.div
                        className="text-center mt-4 text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        Powered by secure payment gateway
                      </motion.div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GiftPacksPage;
