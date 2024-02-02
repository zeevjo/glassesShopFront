import { useState, useEffect } from 'react';

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    screenSizeType: getSizeData(window.innerWidth),
  });

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
      setScreenSize({
        width: newWidth,
        height: window.innerHeight,
        screenSizeType: getSizeData(newWidth),
      });
    }

    // Add a window resize event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine the size data based on the provided width breakpoints with ranges
  function getSizeData(width:number) {
    if (width <= 320) return { 'smallPhone': '320 and below' };
    if (width > 320 && width <= 375) return { 'mediumPhone': '321-375' };
    if (width > 375 && width <= 425) return { 'largePhone': '376-425' };
    if (width > 425 && width <= 500) return { 'smallTablet': '426-500' };
    if (width > 500 && width <= 575) return { 'mediumTablet': '501-575' };
    if (width > 575 && width <= 768) return { 'largeTablet': '576-768' };
    if (width > 768 && width <= 1024) return { 'smallLaptop': '769-1024' };
    if (width > 1024 && width <= 1440) return { 'mediumLaptop': '1025-1440' };
    if (width > 1440 && width <= 2560) return { 'largeLaptop': '1441-2560' };
    return { 'large computer': '2561 and above' };
  }

  return screenSize;
}

export default useScreenSize;
