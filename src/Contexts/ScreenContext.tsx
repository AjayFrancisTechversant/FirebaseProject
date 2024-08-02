import React, {createContext, ReactNode, useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';

export type ScreenContextType = {
  height: number;
  width: number;
  isPortrait: boolean;
  isTypeTablet: boolean;
  scale: number;
  fontScale: number;
};

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();

  const isTypeTablet = isTablet();

  const isPortrait = height > width;

  const value = {
    height,
    width,
    isPortrait,
    isTypeTablet,
    scale,
    fontScale,
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export const useScreenContext = (): ScreenContextType => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreenContext must be used within a ScreenProvider');
  }
  return context;
};
