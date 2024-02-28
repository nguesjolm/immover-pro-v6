import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

// check internet connection
export const useNetworkUtills = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {isConnected};
};
