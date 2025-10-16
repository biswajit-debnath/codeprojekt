"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../_styles/animations";
import { BackendApiClient } from "../_lib/services/backendApiClient";
import TransactionCard from "../_components/account/TransactionCard";

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
    uid: "",
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
        // Call backend API to get user profile
        try {
          // Get the Firebase ID token for authenticated request
          const idToken = await user.getIdToken();
          
          const userProfile: any =
            await BackendApiClient.getInstance().getUserProfile(
              user?.uid,
              idToken
            );
          setUserProfile({
            uid: userProfile.uid || "Not set",
            displayName: userProfile.profile.name || "Not set",
            email: userProfile.profile.email || "Not set",
            photoURL: userProfile.profile.photoURL || "/profile-image.png",
            phoneNumber: userProfile.profile.phoneNumber || "Not set",
          });

          console.log("Fetched backend profile:", userProfile);
          setProfileData(userProfile);
        } catch (err) {
          console.error("Failed to fetch backend profile:", err);
        }
      } else {
        redirect("/signin");
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
        router.push("/signin"); // or use window.location
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
        isActive ? "font-bold bg-gray-100 dark:text-gray-600" : "opacity-70"
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
            className="hidden md:block w-40 desktop:w-80 flex-shrink-0 tablet:w-56"
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
                id="personal"
                label="PERSONAL INFORMATION"
                onClick={scrollToSection}
                isActive={activeSection === "personal"}
              />
               <NavItem
                id="history"
                label="TRANSACTION HISTORY"
                onClick={scrollToSection}
                isActive={activeSection === "history"}
              />
              <NavItem
                id="wallet"
                label="MY WALLET"
                onClick={scrollToSection}
                isActive={activeSection === "wallet"}
              />
              <NavItem
                id="achievements"
                label="ACHIEVEMENTS"
                onClick={scrollToSection}
                isActive={activeSection === "achievements"}
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
                      <p className="text-xl">
                        {userProfile.uid
                          ? `CODEPRO-${userProfile.uid}`
                          : "Not set"}
                      </p>

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
                      {profileData?.transactions &&
                      profileData.transactions.length > 0 ? (
                        <div className="space-y-4">
                          {profileData.transactions.map(
                            (tx: any, idx: number) => (
                              <TransactionCard
                                key={tx.transactionId || idx}
                                transaction={tx}
                                index={idx}
                              />
                            )
                          )}
                        </div>
                      ) : (
                        <motion.p
                          className="text-gray-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          No transactions found
                        </motion.p>
                      )}
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
                    <div className="flex items-center justify-center h-40 bg-[#2c2c2c] p-6">
                      <motion.p
                        className="text-gray-300 text-xl"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        Coming soon
                      </motion.p>
                    </div>
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
                    <div className="flex items-center justify-center h-40 bg-[#2c2c2c] p-6">
                      <motion.p
                        className="text-gray-300 text-xl"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        Coming soon
                      </motion.p>
                    </div>
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
                    <div className="flex items-center justify-center h-40 bg-[#2c2c2c] p-6">
                      <motion.p
                        className="text-gray-300 text-xl"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        Coming soon
                      </motion.p>
                    </div>
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
