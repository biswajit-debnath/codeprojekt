'use client';
import React from 'react';
import Image from 'next/image';

const GameCard = ({ imageSrc, alt, isComingSoon }: { imageSrc: string; alt: string; isComingSoon?: boolean }) => (
  <div className="relative aspect-[9/20] max-w-[150px] md:max-w-[200px] lg:max-w-[280px] w-full sm:w-full md:w-1/2 lg:w-1/4">
    <Image
      src={imageSrc}
      alt={alt}
      layout="fill"
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
  return (
    <div className="px-5 md:px-10 lg:px-20 py-6 md:py-12">
      <div className="max-w-[1550px] mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          {/* Mobile Legends Card */}
          <GameCard 
            imageSrc="/menu-image0.jpeg"
            alt="Mobile Legends: Bang Bang"
          />

          {/* Coming Soon Cards */}
          {[1, 2, 3].map((index) => (
            <GameCard
              key={index}
              imageSrc={`/menu-image${index}.png`}
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