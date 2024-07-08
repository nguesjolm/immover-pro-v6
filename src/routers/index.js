import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { OfflineStack } from './OfflineStack';
import { OnlineStack } from './OnlineStack';
import { ModalRouters } from '../components/modals';
import { Storage } from '../assets/services/storage.service';
import { THEME } from '../styles/theme';
import { LogoLoader } from '../components/atoms/LogoLoader';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { SignInContext } from '../contexts/authContext';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/auth';

export const AppRouter = () => {
  //
  const dispatch = useDispatch();
  const { isLoading } = useCheckAuth();
  const { isConnect, setIsConnect } = useContext(SignInContext);

  useEffect(() => {
    (async () => {
      const token = await Storage.getItem('token');
      const user = await Storage.getItem('user');
      const _token_ = JSON.parse(token);
      const _user_ = JSON.parse(user);
      setIsConnect(_token_ === null ? false : true);
      dispatch(setUser(_user_));
      dispatch(setToken(_token_));
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <LogoLoader bgcolor={THEME.colors.redLight} />
      ) : (
        <NavigationContainer>
          {isConnect ? <OnlineStack /> : <OfflineStack />}
          <ModalRouters />
        </NavigationContainer>
      )}
    </>
  );
};
