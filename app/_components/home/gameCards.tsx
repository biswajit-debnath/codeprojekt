"use client";

import React, { useEffect } from "react";
import FirebaseImage from "../common/firebaseImage";
import FirebaseImageService from "@/app/_lib/services/firebaseStorage";
import { motion } from "framer-motion";
import { fadeIn, cardHover, staggerContainer } from "../../_styles/animations";
import Link from "next/link";
import { useRegion, Region } from "../../../context/RegionContext";

// Game Card Configuration
type GameCardConfig = {
  imagePath: string;
  label: string;
  link?: string;
  isComingSoon?: boolean;
  showInRegions: Region[]; // Which regions should show this card
};

const GAME_CARDS_CONFIG: GameCardConfig[] = [
  {
    imagePath: "games/menu-image_ml.jpeg",
    label: "MOBA LEGENDS 5v5",
    link: "/packs",
    isComingSoon: false,
    showInRegions: ["INT"], // Only show in international
  },
  {
    imagePath: "games/menu-image0.png",
    label: "BUY TSHIRT",
    link: "/merch",
    isComingSoon: false,
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    imagePath: "games/menu-image1.png",
    label: "BUY FIGURINES",
    link: "/merch",
    isComingSoon: false,
    showInRegions: ["IND", "INT"], // Show in both regions
  },
  {
    imagePath: "games/menu-image2.png",
    label: "COMING SOON",
    isComingSoon: true,
    showInRegions: ["INT"], // Only show in international
  },
  {
    imagePath: "games/menu-image3.png",
    label: "COMING SOON",
    isComingSoon: true,
    showInRegions: ["INT"], // Only show in international
  },
];

const GameCard = ({
  imagePath,
  label,
  link,
  isComingSoon,
  index,
}: {
  imagePath: string;
  label: string;
  link?: string;
  isComingSoon?: boolean;
  index: number;
}) => {
  const hasLink = link && !isComingSoon;
  const cardContent = (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      variants={cardHover}
    >
      <FirebaseImage path={imagePath} alt={label} fill objectFit="cover" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/50 font-['The-Last-Shuriken'] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="text-center w-full">
          <motion.h3
            className="text-white text-[0.7rem] md:text-lg font-bold tracking-wider"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            {label.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < label.split(' ').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h3>
        </div>
      </motion.div>
    </motion.div>
  );

  const card = (
    <motion.div
      className="relative aspect-[9/15] md:aspect-[9/20] max-w-[110px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4"
      variants={fadeIn("up", 0.3 + index * 0.2)}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      initial="hidden"
      animate="show"
    >
      {hasLink ? (
        <Link
          href={link!}
          className="block w-full h-full"
          tabIndex={0}
          aria-label={label}
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
  
  return card;
};

const GameCards = () => {
  // Get region from context
  const { region, isHydrated } = useRegion();
  
  // Filter game cards based on current region
  // Before hydration, show IND cards as default
  const visibleCards = GAME_CARDS_CONFIG.filter(card => 
    !isHydrated 
      ? card.showInRegions.includes('IND')
      : card.showInRegions.includes(region)
  );
  
  // Preload images
  useEffect(() => {
    const imagePaths = GAME_CARDS_CONFIG.map(card => card.imagePath);
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
          {visibleCards.map((card, index) => (
            <GameCard
              key={`${card.imagePath}-${index}`}
              imagePath={card.imagePath}
              label={card.label}
              link={card.link}
              isComingSoon={card.isComingSoon}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCards;
