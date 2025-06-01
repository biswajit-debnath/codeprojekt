"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../_styles/animations";
import { BackendApiClient } from "../_lib/services/backendApiClient";

type ContentRefKeys =
  | "id"
  | "wallet"
  | "personal"
  | "achievements"
  | "history"
  | "rewards"
  | "logout";
interface NavItemProps {
  id: ContentRefKeys;
  label: string;
  onClick: (id: ContentRefKeys) => void;
  isActive?: boolean;
}

const AccountPage = () => {
  type ContentRefKeys = keyof typeof contentRefs;
  const [userProfile, setUserProfile] = useState({
    displayName: "",
    email: "",
    photoURL: "/profile-image.png",
    phoneNumber: "",
  });
  const [profileData, setProfileData] = useState<any>(null); // Save profile data fetched from backend
  const [activeSection, setActiveSection] = useState<ContentRefKeys>("id");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Firebase user:", user); // Debug log
      if (user) {
        setUserProfile({
          displayName: user.displayName || "Not set",
          email: user.email || "Not set",
          photoURL: user.photoURL || "/profile-image.png",
          phoneNumber: user.phoneNumber || "Not set",
        });

        // Call backend API to get user profile
        try {
          const userProfile =
            await BackendApiClient.getInstance().getUserProfile(
              "TIu48HSiYFW52nSPnKOkF8Obk9e2" //replace with uid from firebase
            );

          console.log("Fetched backend profile:", userProfile);
          setProfileData(userProfile);
        } catch (err) {
          console.error("Failed to fetch backend profile:", err);
        }
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
    logout: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (id: ContentRefKeys) => {
    const contentContainer = document.getElementById("content-container");
    const targetElement = contentRefs[id]?.current;

    if (contentContainer && targetElement) {
      // Calculate the scroll position relative to the container
      const scrollPosition = targetElement.offsetTop;

      // Smooth scroll the container to the target element
      contentContainer.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
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

  const NavItem: React.FC<NavItemProps> = ({
    id,
    label,
    onClick,
    isActive,
  }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`block w-full text-left py-3 px-6 text-md transition-colors hover:opacity-80 ${
        isActive ? "font-bold bg-gray-100" : "opacity-70"
      } hover:opacity-100`}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );

  return (
    <motion.div
      className="flex flex-col h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main container with padding top for header space */}
      <motion.div
        className="flex-1 flex flex-col mt-20 px-4 sm:px-8 md:px-16 pb-16 overflow-hidden max-w-[1550px] mx-auto w-full"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-lg font-['The-Last-Shuriken'] text-black"
          variants={fadeIn("down", 0.1)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          YOUR ACCOUNT
        </motion.h1>

        {/* Content area with navigation and content sections */}
        {/* Layout changes: flex-col on mobile, flex-row on md+ */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Navigation - Hidden on mobile, shown on md+ */}
          <motion.div
            className="hidden md:block w-80 flex-shrink-0"
            variants={slideIn("right", 0.2)}
          >
            <motion.div
              className="flex flex-col py-1"
              variants={staggerContainer(0.05, 0.1)}
              initial="hidden"
              animate="show"
            >
              <NavItem
                id="id"
                label="CODEPROJEKT ID"
                onClick={scrollToSection}
                isActive={activeSection === "id"}
              />
              <NavItem
                id="wallet"
                label="MY WALLET"
                onClick={scrollToSection}
                isActive={activeSection === "wallet"}
              />
              <NavItem
                id="personal"
                label="PERSONAL INFORMATION"
                onClick={scrollToSection}
                isActive={activeSection === "personal"}
              />
              <NavItem
                id="achievements"
                label="ACHIEVEMENTS"
                onClick={scrollToSection}
                isActive={activeSection === "achievements"}
              />
              <NavItem
                id="history"
                label="TRANSACTION HISTORY"
                onClick={scrollToSection}
                isActive={activeSection === "history"}
              />
              <NavItem
                id="rewards"
                label="REWARDS"
                onClick={scrollToSection}
                isActive={activeSection === "rewards"}
              />
              <NavItem
                id="logout"
                label="LOG OUT"
                onClick={scrollToSection}
                isActive={activeSection === "logout"}
              />
            </motion.div>
          </motion.div>

          {/* Container with margin bottom & conditional left margin */}
          {/* Takes full width on mobile, adds margin on md+ */}
          <motion.div
            className="flex-1 mb-16 relative md:ml-8"
            variants={fadeIn("left", 0.4)}
          >
            {/* Right Content Area - Scrollable with internal padding */}
            {/* Padding adjusted: No right padding on mobile, added on md+ */}
            <div
              id="content-container"
              className="absolute inset-0 overflow-y-auto overflow-x-hidden pr-0 md:pr-4"
            >
              {/* ID Section - Stacks on mobile, row on md+ */}
              <motion.div
                ref={contentRefs.id}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[--navBlack] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6 flex flex-col pb-4 md:pb-14 items-center md:items-start"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl mb-2 font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      CODEPRO ID
                    </motion.h2>
                    <div className="w-full flex justify-center">
                      <motion.div
                        className="relative w-24 h-24 md:w-32 md:h-32"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.3,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={userProfile.photoURL || "/profile-image.png"}
                          alt=""
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex-1 p-6"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <h3 className="text-gray-400 mb-1">ACCOUNT ID</h3>
                      <p className="text-xl">CODEPRO11111</p>

                      <h3 className="text-gray-400 mb-1">Display Name</h3>
                      <p className="text-xl">
                        {userProfile.displayName || "Not set"}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <h3 className="text-gray-400 mb-1">Email</h3>
                      <p className="text-xl">
                        {userProfile.email || "Not set"}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Wallet Section - Stacks on mobile, row on md+ */}
              <motion.div
                ref={contentRefs.wallet}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6 flex flex-col pb-4 md:pb-14 items-center md:items-start"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl mb-6 font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      MY WALLET
                    </motion.h2>
                    <div className="w-full flex justify-center">
                      <motion.div
                        className="relative w-24 h-24 md:w-32 md:h-32"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src="/profile-image.png"
                          alt="Profile"
                          className="rounded-full"
                          fill
                          objectFit="cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    <div>
                      <motion.p
                        className="text-gray-400 pl-0 md:pl-7 text-center md:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        WALLET BALANCE - Codepro coins
                      </motion.p>
                      {/* Button layout stacks on mobile */}
                      <motion.div
                        className="flex flex-col md:flex-row justify-between items-center mt-2 bg-[#2c2c2c] p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <p className="text-2xl pl-0 md:pl-4 mb-4 md:mb-0">
                          00.00
                        </p>
                        <motion.button
                          className="bg-[--primaryColor] text-white px-4 md:px-6 py-3 md:py-4 flex items-center text-md md:text-lg w-full md:w-auto justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="mr-2 md:mr-4 text-2xl md:text-4xl">
                            +
                          </span>{" "}
                          ADD WALLET BALANCE
                        </motion.button>
                      </motion.div>
                    </div>
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <p className="text-gray-400 pl-0 md:pl-7 text-lg text-center md:text-left">
                        Wallet Transactions
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Personal Information Section - Stacks on mobile, row/grid on md+ */}
              <motion.div
                ref={contentRefs.personal}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      PERSONAL INFORMATION
                    </motion.h2>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    {/* Grid stacks on mobile */}
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2c2c2c] mb-3 p-4 md:pl-4"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.3)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">EMAIL</p>
                        <p>{userProfile.email || "Not set"}</p>
                      </motion.div>
                      <motion.div
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.4)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">PHONE NO</p>
                        <p>{userProfile.phoneNumber || "Not set"}</p>
                      </motion.div>
                    </motion.div>
                    {/* Grid stacks on mobile */}
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2c2c2c] p-4 md:pl-4"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.5)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">COUNTRY</p>
                        <p>India</p>
                      </motion.div>
                      <motion.div
                        className="p-4 rounded"
                        variants={fadeIn("up", 0.6)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-gray-400 mb-2">DOB</p>
                        <p>01/01/1990</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Achievements Section - Stacks on mobile, row/grid on md+ */}
              <motion.div
                ref={contentRefs.achievements}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      ACHIEVEMENT
                    </motion.h2>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    {/* Grid stacks on mobile */}
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={staggerContainer(0.1, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div
                        className="flex flex-col"
                        variants={fadeIn("up", 0.3)}
                      >
                        <motion.div
                          className="bg-[#2c2c2c] p-6 mb-2"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-gray-400 mb-4 font-medium">
                            INVITES
                          </p>
                          <motion.p
                            className="text-4xl font-semibold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            12
                          </motion.p>
                        </motion.div>
                        <div className="w-full bg-gray-800 h-[0.7rem] mt-1 border-2 border-white">
                          <motion.div
                            className="bg-white h-[0.6rem]"
                            style={{ width: "10%" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "10%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex flex-col"
                        variants={fadeIn("up", 0.4)}
                      >
                        <motion.div
                          className="bg-[#2c2c2c] p-6 mb-2"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-gray-400 mb-4 font-medium">
                            PURCHASE
                          </p>
                          <motion.p
                            className="text-4xl font-semibold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            128
                          </motion.p>
                        </motion.div>
                        <div className="w-full bg-gray-800 h-[0.7rem] mt-1 border-2 border-white">
                          <motion.div
                            className="bg-white h-[0.6rem]"
                            style={{ width: "10%" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "10%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Transaction History Section - Stacks on mobile, row on md+ */}
              <motion.div
                ref={contentRefs.history}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      TRANSACTION HISTORY
                    </motion.h2>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div
                      className="bg-[#2c2c2c] p-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.p
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        No transactions found
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Rewards Section - Stacks on mobile, row on md+ */}
              <motion.div
                ref={contentRefs.rewards}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      REWARDS
                    </motion.h2>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    <motion.div
                      className="bg-[#2c2c2c] p-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.p
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        No rewards available
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Logout Section - Stacks on mobile, row on md+ */}
              <motion.div
                ref={contentRefs.logout}
                className="mb-6"
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                animate="show"
              >
                <div className="flex flex-col md:flex-row bg-[#1c1a1b] text-white overflow-hidden">
                  <motion.div
                    className="w-full md:w-64 bg-[#2c2c2c] p-6"
                    variants={slideIn("right", 0.2)}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-['The-Last-Shuriken'] opacity-70 text-center md:text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      LOG OUT
                    </motion.h2>
                  </motion.div>
                  {/* Padding adjusts for mobile */}
                  <motion.div
                    className="flex-1 px-4 md:px-10 py-12"
                    variants={fadeIn("left", 0.3)}
                  >
                    {/* Button width adjusts for mobile */}
                    <motion.button
                      onClick={handleLogout}
                      className="bg-[--primaryColor] hover:bg-red-700 text-white px-6 py-3 w-full md:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      CONFIRM LOGOUT
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Empty div at the bottom to create scrolling space */}
              <div className="h-16"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountPage;
