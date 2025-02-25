'use client';
import React, { useEffect } from 'react';
import FirebaseImage from '../common/firebaseImage';
import FirebaseImageService from '@/services/firebaseStorage';

const GameCard = ({ imagePath, alt, isComingSoon }: { imagePath: string; alt: string; isComingSoon?: boolean }) => (
  <div className="relative aspect-[9/20] max-w-[150px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4">
    <FirebaseImage
      path={imagePath}
      alt={alt}
      fill
      objectFit="cover"
    />
    {isComingSoon && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="text-center">
          <h3 className="text-white text-lg md:text-lg font-bold tracking-wider">
            COMING<br /> SOON
          </h3>
        </div>
      </div>
    )}
  </div>
);

const GameCards = () => {
  // Preload images
  useEffect(() => {
    const imagePaths = [
      'games/menu-image0.jpeg',
      'games/menu-image1.png',
      'games/menu-image2.png',
      'games/menu-image3.png'
    ];
    FirebaseImageService.preloadImages(imagePaths);
  }, []);

  return (
    <div className="px-5 md:px-10 lg:px-20 py-6 md:py-12">
      <div className="max-w-[1550px] mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          <GameCard 
            imagePath="games/menu-image0.jpeg"
            alt="Mobile Legends: Bang Bang"
          />

          {[1, 2, 3].map((index) => (
            <GameCard
              key={index}
              imagePath={`games/menu-image${index}.png`}
              alt="Coming Soon"
              isComingSoon
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCards;