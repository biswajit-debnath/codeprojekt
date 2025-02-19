// components/common/FirebaseImage.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FirebaseImageService from '@/services/firebaseStorage';

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
      try {
        const url = await FirebaseImageService.getImageURL(path);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [path]);

  if (isLoading || !imageUrl) {
    return <div className={`animate-pulse bg-gray-200 ${className}`} style={{ width, height }} />;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      priority={priority}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      style={objectFit ? { objectFit } : undefined}
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGPDhGNzZINzQvRVhES1BPT0FCNz5BQ0j/2wBDAR"
      placeholder="blur"
    />
  );
};

export default FirebaseImage;