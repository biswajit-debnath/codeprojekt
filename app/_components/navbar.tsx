"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../_styles/animations";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRegion, Region } from "../../context/RegionContext";
import { Globe, ChevronDown } from "lucide-react";
import FlagIcon from "react-world-flags";

// Navigation Links Configuration
type NavLink = {
  href: string;
  label: string;
  showInRegions: Region[]; // Which regions should show this link
};

const NAV_LINKS_CONFIG: NavLink[] = [
  {
    href: "/packs",
    label: "DIAMOND PACKS",
    showInRegions: ["INT"], // Only show in international
  },
  {
    href: "/merch",
    label: "MERCH",
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    href: "/about",
    label: "ABOUT US",
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    href: "/contact",
    label: "CONTACT US",
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    href: "/refund",
    label: "REFUND POLICY",
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    href: "/privacy",
    label: "PRIVACY POLICY",
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  // Example: Add region-specific links
  // {
  //   href: "/india-exclusive",
  //   label: "INDIA EXCLUSIVE",
  //   showInRegions: ["IND"], // Only show in India
  // },
  // {
  //   href: "/global-offers",
  //   label: "GLOBAL OFFERS",
  //   showInRegions: ["INT"], // Only show internationally
  // },
];

const Navbar = () => {
  // Reusable custom select for region so we can show icons inside dropdown items
  const RegionSelect: React.FC<{
    region: Region;
    setRegion: (r: Region) => void;
    className?: string;
    iconSize?: number;
  }> = ({ region, setRegion, className = "", iconSize = 18 }) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const onDocClick = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const OPTIONS: { value: Region; label: string }[] = [
      { value: "IND", label: "India" },
      { value: "INT", label: "International" },
    ];

    const toggle = () => setOpen((v) => !v);

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
    };

    return (
      <div ref={wrapperRef} className={`relative ${className}`}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggle}
          onKeyDown={onKeyDown}
          className="w-full flex items-center justify-between bg-gray-700 text-white rounded-2xl pl-10 pr-4 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600 focus:outline-none"
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
            {region === "IND" ? (
              <div className="overflow-hidden rounded-sm" style={{ width: iconSize, height: Math.round(iconSize * 0.66) }}>
                <FlagIcon code="IN" height={Math.round(iconSize * 0.66)} />
              </div>
            ) : (
              <Globe size={iconSize} />
            )}
          </div>

          <span className="truncate text-left">{region === "IND" ? "India" : "International"}</span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <ul
            role="listbox"
            tabIndex={-1}
            className="absolute left-0 mt-2 w-full bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-700"
          >
            {OPTIONS.map((opt) => (
              <li key={opt.value} role="option" aria-selected={region === opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    setRegion(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-white hover:bg-gray-800 ${region === opt.value ? "bg-gray-800" : ""}`}
                  style={{ minWidth: 0 }}
                >
                  <span className="flex-shrink-0">
                    {opt.value === "IND" ? (
                      <div className="overflow-hidden rounded-sm" style={{ width: iconSize - 2, height: Math.round((iconSize - 2) * 0.66) }}>
                        <FlagIcon code="IN" height={Math.round((iconSize - 2) * 0.66)} />
                      </div>
                    ) : (
                      <Globe size={iconSize - 2} />
                    )}
                  </span>
                  <span className="flex-1 truncate">{opt.label}</span>
                  {region === opt.value && <span className="text-green-300">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  // using lucide-react icons (Globe, Flag) rendered absolutely inside the select wrapper
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAccountPage = pathname === "/account";
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const [currentUser, setCurrentUser] = useState<{
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
  }>({ uid: null, displayName: null, photoURL: null });
  const [profileImageError, setProfileImageError] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  // Get region context
  const { region, setRegion } = useRegion();

  // Filter navigation links based on current region
  const visibleNavLinks = NAV_LINKS_CONFIG.filter(link => 
    link.showInRegions.includes(region)
  );

  const closeMenuAndResetScroll = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser({
        uid: user?.uid || null,
        displayName: user?.displayName || null,
        photoURL: user?.photoURL || null,
      });
      setProfileImageError(false); // Reset error state when user changes
      setIsAuthLoading(false); // Auth loading complete
    });

    return () => unsubscribe();
  }, []);

  const handleImageError = () => {
    console.log("Image load error for:", currentUser.photoURL); // Debug log
    setProfileImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", currentUser.photoURL); // Debug log
    setProfileImageError(false);
  };

  const getProfileImageSrc = () => {
    // Always show the user's photo if available and no error occurred
    if (currentUser.photoURL && !profileImageError) {
      return currentUser.photoURL;
    }
    return "/profile-image.png";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenuAndResetScroll();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isAuthPage) {
    return (
      <motion.nav
        initial="hidden"
        animate="show"
        variants={fadeIn("down")}
        className="absolute top-0 left-0 right-0 p-4 z-50 sticky"
      >
        <div className="">
          {/* Desktop Auth Navigation */}
          <div className="hidden lg:flex items-center justify-between px-6">
            <motion.div
              variants={fadeIn("right", 0.2)}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center">
                <h1 className="text-3xl tracking-wider text-white font-['The-Last-Shuriken'] pl-2">
                  WELCOME TO CODE PROJEKT
                </h1>
              </div>
            </motion.div>

            {/*             <motion.div
              variants={fadeIn("left", 0.3)}
              className="flex items-center space-x-3 ml-auto"
            >
              {pathname === "/signup" && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">Already have an account</span>
                  <Link href="/signin">
                    <button className="bg-[#303030] hover:bg-gray-600 text-gray-400 py-1 rounded-full w-36 text-left pl-4">
                      sign in
                    </button>
                  </Link>
                </div>
              )}
              {pathname === "/signin" && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">
                    Don&apos;t have an account?
                  </span>
                  <Link href="/signup">
                    <button className="bg-[#303030] hover:bg-gray-600 text-gray-400 py-1 rounded-full w-36 text-left pl-4">
                      sign up
                    </button>
                  </Link>
                </div>
              )}
            </motion.div> */}
          </div>

          {/* Mobile Auth Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            <motion.div
              variants={fadeIn("right", 0.2)}
              className="flex items-center"
            >
              <h1 className="text-lg font-bold tracking-wider text-white font-['The-Last-Shuriken']">
                CODE PROJEKT
              </h1>
            </motion.div>

            {/* <motion.div
              variants={fadeIn("left", 0.3)}
              className="flex items-center"
            >
              {pathname === "/signup" && (
                <Link href="/signin">
                  <button className="bg-[#303030] hover:bg-gray-600 text-gray-300 px-4 py-1.5 rounded-full w-28 text-sm text-left pl-5">
                    sign in
                  </button>
                </Link>
              )}
              {pathname === "/signin" && (
                <Link href="/signup">
                  <button className="bg-[#303030] hover:bg-gray-600 text-white px-4 py-1.5 rounded-full w-28 text-sm text-left pl-5">
                    sign up
                  </button>
                </Link>
              )}
            </motion.div> */}
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial="hidden"
      animate="show"
      variants={fadeIn("down")}
      className="absolute top-0 left-0 right-0 p-4 z-50 sticky"
    >
      <div className="">
        {/* Desktop Navigation */}
        <div className="hidden desktop:flex items-center justify-between px-4">
          <motion.div
            variants={staggerContainer(0.1)}
            className="flex items-center space-x-8"
          >
            <motion.div
              variants={fadeIn("right", 0.1)}
              className="flex items-center"
            >
              <Link href="/">
                <Image
                  src="/logo-imageV4white.png"
                  alt="Logo"
                  width={115}
                  height={160}
                />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.05)}
              className="flex space-x-10 text-white text-lg pl-6"
            >
              {visibleNavLinks.map((link, index) => (
                <motion.div 
                  key={link.href} 
                  variants={fadeIn("up", 0.1 + index * 0.05)}
                >
                  <Link href={link.href} className="relative">
                    <button className="hover:text-gray-300 transition-colors">
                      {link.label}
                    </button>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-2 left-0 w-full h-1 bg-red-600"
                      ></motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.4)}
            className="flex items-center space-x-3 ml-auto"
          >
            {/* Search Input */}
            {/* <div className="relative">
              <input
                type="text"
                placeholder="search here"
                className="bg-gray-700 rounded-full px-4 py-1 text-white placeholder-gray-400"
              />
            </div> */}
            {/* Profile section - only show if user is logged in */}
            {/* Region Selector */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            className="flex items-center ml-6"
          >
            {/* fixed width so it doesn't resize based on text */}
            <RegionSelect region={region} setRegion={setRegion} className="w-44" />
          </motion.div>
            {currentUser.uid && (
              <div className="flex items-center space-x-2">
                <Link href="/account">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`rounded-full ${
                      isAccountPage ? "ring-2 ring-red-600 ring-offset-0" : ""
                    }`}
                  >
                    {isAuthLoading ? (
                      <div className="w-[35px] h-[35px] rounded-full bg-gray-600 animate-pulse"></div>
                    ) : (
                      <Image
                        src={getProfileImageSrc()}
                        alt="Circle Image"
                        width={35}
                        height={35}
                        className="rounded-full"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        key={`desktop-${currentUser.photoURL || "default"}`} // Force re-render when photoURL changes
                        unoptimized={!!currentUser.photoURL} // Disable optimization for external URLs
                      />
                    )}
                  </motion.div>
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-2"></div>
            {currentUser.uid ? (
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-1 text-gray-300 pr-10"
              >
                <span>{currentUser.displayName || "User"}</span>
              </motion.div>
            ) : (
              <Link href="/signin">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center space-x-2 bg-gray-700 rounded-full px-4 py-1 text-gray-300 pr-20"
                >
                  <span>sign in</span>
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="desktop:hidden flex items-center justify-between px-4">
          <motion.div
            variants={fadeIn("right", 0.1)}
            className="flex items-center"
          >
            <Link
              href="/"
              onClick={isMenuOpen ? closeMenuAndResetScroll : undefined}
            >
              <Image
                src="/logo-imageV4white.png"
                alt="Logo"
                width={90}
                height={100}
              />
            </Link>
          </motion.div>

          {/* Container for right-side icons */}
          <div className="flex items-center space-x-3">
            {/* Account Link - only show if user is logged in */}
            {currentUser.uid && (
              <Link
                href="/account"
                onClick={isMenuOpen ? closeMenuAndResetScroll : undefined}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`rounded-full ${
                    isAccountPage ? "ring-2 ring-red-600 ring-offset-0" : ""
                  }`}
                >
                  {isAuthLoading ? (
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-600 animate-pulse"></div>
                  ) : (
                    <Image
                      src={getProfileImageSrc()}
                      alt="Account"
                      width={30}
                      height={30}
                      className="rounded-full"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      key={`mobile-${currentUser.photoURL || "default"}`} // Force re-render when photoURL changes
                      unoptimized={!!currentUser.photoURL} // Disable optimization for external URLs
                    />
                  )}
                </motion.div>
              </Link>
            )}

            {/* Menu Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-white p-2 z-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-64 bg-gray-900 p-6 z-50 overflow-y-auto"
            >
              {/* Mobile Region Selector */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pb-6 mb-6 border-b border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <RegionSelect region={region} setRegion={setRegion} className="w-44" iconSize={16} />
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="show"
                className="flex flex-col space-y-6 text-white mt-2"
              >
                
                {visibleNavLinks.map((link, index) => (
                  <motion.div 
                    key={link.href} 
                    variants={fadeIn("right", 0.1 + index * 0.1)}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenuAndResetScroll}
                      className="relative inline-block"
                    >
                      <button className="hover:text-gray-300 transition-colors">
                        {link.label}
                      </button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              
              <motion.div
                variants={fadeIn("up", 0.8)}
                initial="hidden"
                animate="show"
                className="space-y-4 mt-8"
              >
                {/* Search Input */}
                {/* <input
                  type="text"
                  placeholder="search here"
                  className="w-full bg-gray-700 rounded-md px-4 py-1 text-white placeholder-gray-400"
                /> */}

                {currentUser.uid ? (
                  <motion.div className="w-full bg-gray-700 rounded-md px-4 py-1 text-gray-300">
                    {currentUser.displayName || "User"}
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="w-full bg-gray-700 rounded-md px-4 py-1 text-gray-300"
                  >
                    <Link href="/signin" onClick={closeMenuAndResetScroll}>
                      Sign In
                    </Link>
                  </motion.button>
                )}
                {/* <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="w-full bg-gray-700 rounded-md px-4 py-1 text-gray-300"
                >
                  <Link href="/signin" onClick={closeMenuAndResetScroll}>
                    Sign In
                  </Link>
                </motion.button> */}
                {/* <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="w-full bg-gray-700 rounded-md px-4 py-1 text-gray-300"
                >
                  <Link href="/signup" onClick={closeMenuAndResetScroll}>
                    Sign Up
                  </Link>
                </motion.button> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
