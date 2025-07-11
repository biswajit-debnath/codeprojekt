// components/common/FirebaseImage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FirebaseImageService from '@/app/_lib/services/firebaseStorage';

interface FirebaseImageProps {
  path: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({
  path,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  objectFit
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const url = await FirebaseImageService.getImageURL(path);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [path]);

  const containerStyle = {
    position: 'relative' as const,
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    overflow: 'hidden'
  };

  const placeholderStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'gray',
    objectFit
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Placeholder */}
      <div 
        className={`animate-pulse transition-opacity duration-300 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={placeholderStyle}
      />
      
      {/* Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={alt}
          className={`transition-opacity duration-300 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          style={objectFit ? { objectFit } : undefined}
          sizes={fill ? "100vw" : undefined}
          loading={priority ? "eager" : "lazy"}
          onLoadingComplete={() => setIsLoading(false)}
          quality={100}
        />
      )}
    </div>
  );
};

export default FirebaseImage;