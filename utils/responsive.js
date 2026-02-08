import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Breakpoints
export const isSmallPhone = screenWidth < 360;
export const isPhone = screenWidth >= 360 && screenWidth < 600;
export const isTablet = screenWidth >= 600;
export const isLargeTablet = screenWidth >= 800;

// Responsive scaling functions
export const scaleFont = (size) => {
  if (isLargeTablet) return size * 1.3;
  if (isTablet) return size * 1.15;
  if (isSmallPhone) return size * 0.9;
  return size;
};

export const scalePadding = (size) => {
  if (isLargeTablet) return size * 1.5;
  if (isTablet) return size * 1.3;
  if (isSmallPhone) return size * 0.9;
  return size;
};

export const scaleSize = (size) => {
  if (isLargeTablet) return size * 1.4;
  if (isTablet) return size * 1.2;
  if (isSmallPhone) return size * 0.9;
  return size;
};

// Max width for content on tablets
export const getMaxContentWidth = () => {
  if (isLargeTablet) return 800;
  if (isTablet) return 700;
  return '100%';
};

// Responsive values
export const responsive = {
  screenWidth,
  screenHeight,
  isSmallPhone,
  isPhone,
  isTablet,
  isLargeTablet,
  scaleFont,
  scalePadding,
  scaleSize,
  getMaxContentWidth,
};


