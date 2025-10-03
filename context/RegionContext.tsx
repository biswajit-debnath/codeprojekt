'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Define the region types
export type Region = 'IND' | 'INT';

// Define the shape of the Region context
interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  isHydrated: boolean;
}

// URL param key for region
const REGION_PARAM_KEY = 'region';

// Create the Region context
const RegionContext = createContext<RegionContextType | undefined>(undefined);

// Create the RegionProvider component
export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Always start with 'IND' for SSR and initial render to avoid hydration mismatch
  const [region, setRegionState] = useState<Region>('IND');
  const [isHydrated, setIsHydrated] = useState(false);

  // After mount, read from URL and update state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlRegion = new URLSearchParams(window.location.search).get(REGION_PARAM_KEY);
      if (urlRegion === 'IND' || urlRegion === 'INT') {
        setRegionState(urlRegion);
      }
      setIsHydrated(true);
    }
  }, []);

  // Wrapper function to update both state and URL
  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    
    if (typeof window !== 'undefined') {
      // Create new URLSearchParams from current URL
      const params = new URLSearchParams(window.location.search);
      
      // Update the region parameter
      params.set(REGION_PARAM_KEY, newRegion);
      
      // Update URL without page reload
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, isHydrated }}>
      {children}
    </RegionContext.Provider>
  );
};

// Custom hook to use the Region context
export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
