import {useContext, useEffect, useState} from 'react';
import {Storage} from '../assets/services/storage.service';
import {SignInContext} from '../contexts/authContext';

export const useCheckAuth = () => {
  //

  const {setIsWelcome} = useContext(SignInContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const appData = await Storage.getItem('isWelcome');

      if (appData == null) {
        setIsWelcome(true);
        Storage.setItem('isWelcome', 'false');
      } else {
        setIsWelcome(false);
      }
    })();
  }, [setIsWelcome]);

  useEffect(() => {
    (async () => {
      setTimeout(async () => setIsLoading(false), 1350);
    })();
  }, []);

  return {isLoading};
};
