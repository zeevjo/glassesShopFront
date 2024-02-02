import { useState, useEffect } from 'react';

const useTime = () => {
  const [time, setTime] = useState(new Date()); // Current time state

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    return () => {
      clearInterval(timerId); // Clear interval on cleanup
    };
  }, []);

  return time;
};

export default useTime;
