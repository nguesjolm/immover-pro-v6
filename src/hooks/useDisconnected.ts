import {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {resetAuth} from '../redux/auth';
import {Storage} from '../assets/services/storage.service';
import {SignInContext} from '../contexts/authContext';

export const useDisconnected = () => {
  //

  const dispatch = useDispatch();
  const {setIsConnect} = useContext(SignInContext);

  const handleDisconnected = async () => {
    await Storage.removeItem('token');
    await Storage.removeItem('user');
    await Storage.removeItem('offerer');
    dispatch(resetAuth());
    setIsConnect(false);
  };

  return {handleDisconnected};
};
