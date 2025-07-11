"use client";

import React, { useEffect } from "react";
import FirebaseImage from "../common/firebaseImage";
import FirebaseImageService from "@/app/_lib/services/firebaseStorage";
import { motion } from "framer-motion";
import { fadeIn, cardHover, staggerContainer } from "../../_styles/animations";
import Link from "next/link";

const GameCard = ({
  imagePath,
  alt,
  isComingSoon,
  index,
}: {
  imagePath: string;
  alt: string;
  isComingSoon?: boolean;
  index: number;
}) => {
  // Determine if this card should show the BUY MERCH overlay
  const isBuyTshirt = alt === "Buy Tshirt";
  const isBuyFigurines = alt === "Buy Figurines";
  const card = (
    <motion.div
      className="relative aspect-[9/15] md:aspect-[9/20] max-w-[110px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4"
      variants={fadeIn("up", 0.3 + index * 0.2)}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="w-full h-full relative overflow-hidden"
        variants={cardHover}
      >
        <FirebaseImage path={imagePath} alt={alt} fill objectFit="cover" />
        {isComingSoon && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50 font-['The-Last-Shuriken']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="text-center">
              <motion.h3
                className="text-white text-[0.7rem] md:text-lg font-bold tracking-wider"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                COMING
                <br />
                SOON
              </motion.h3>
            </div>
          </motion.div>
        )}
        {isBuyTshirt && (
          <Link
            href="/merch"
            className="absolute inset-0 flex items-center justify-center bg-black/50 font-['The-Last-Shuriken'] z-10"
            tabIndex={0}
            aria-label="Buy Tshirt"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-center w-full">
                <motion.h3
                  className="text-white text-[0.7rem] md:text-lg font-bold tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  BUY
                  <br />
                  TSHIRT
                </motion.h3>
              </div>
            </motion.div>
          </Link>
        )}
        {isBuyFigurines && (
          <Link
            href="/merch"
            className="absolute inset-0 flex items-center justify-center bg-black/50 font-['The-Last-Shuriken'] z-10"
            tabIndex={0}
            aria-label="Buy Figurines"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-center w-full">
                <motion.h3
                  className="text-white text-[0.7rem] md:text-lg font-bold tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  BUY
                  <br />
                  FIGURINES
                </motion.h3>
              </div>
            </motion.div>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
  return card;
};

const GameCards = () => {
  // Preload images
  useEffect(() => {
    const imagePaths = [
      "games/menu-image0.png",
      "games/menu-image1.png",
      "games/menu-image2.png",
      "games/menu-image3.png",
    ];
    FirebaseImageService.preloadImages(imagePaths);
  }, []);

  return (
    <motion.div
      className="px-5 md:px-10 lg:px-20 py-6 md:py-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer(0.1, 0.1)}
    >
      <div className="max-w-[1550px] mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 md:gap-12">
          <GameCard
            imagePath="games/menu-image0.png"
            alt="Buy Tshirt"
            isComingSoon={false}
            index={0}
          />
          <GameCard
            imagePath="games/menu-image1.png"
            alt="Buy Figurines"
            isComingSoon={false}
            index={1}
          />

          {[2, 3].map((index) => (
            <GameCard
              key={index}
              imagePath={`games/menu-image${index}.png`}
              alt="Coming Soon"
              isComingSoon
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCards;
