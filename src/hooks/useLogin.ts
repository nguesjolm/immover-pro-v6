import {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  generateOTPCode,
  loginOfferor,
  updatePassword,
  userConnectState,
  verifyOTPCode,
} from '../assets/api/auth.api';
import {setOffreur, setToken, setUser} from '../redux/auth';
import {Storage} from '../assets/services/storage.service';
import {
  setErrorModalAction,
  setErrorTextAction,
  setSuccessModalAction,
  setSuccessTextAction,
} from '../redux/modals';
import {phoneRegex} from '../assets/constants';
import {SignInContext} from '../contexts/authContext';
import {useNavigation} from '@react-navigation/native';

const useLogin = () => {
  //
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {setIsConnect} = useContext(SignInContext);
  const [form, setForm] = useState({tel: '', password: ''});

  const handleChange = (text: string, type: string) => {
    if (type === 'tel') {
      setForm({...form, tel: text});
    }
    if (type === 'password') {
      setForm({...form, password: text});
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (!phoneRegex.test(form?.tel)) {
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction("Votre numéro n'est pas valide !"));
      }

      if (form?.password.length < 8) {
        dispatch(setErrorModalAction(true));
        dispatch(
          setErrorTextAction(
            'Le mot de passe doit contenir au moins 8 caractères !',
          ),
        );
      }

      dispatch(setErrorTextAction(''));
      const res = await loginOfferor(form);
      const {data} = res;

      if (res.status === 200) {
        setLoading(false);
        dispatch(setToken(data?.token));
        dispatch(setUser(data?.user));
        dispatch(setOffreur(data?.user));
        await userConnectState(data?.token);
        Storage.setItem('token', JSON.stringify(data?.token));
        Storage.setItem('user', JSON.stringify(data?.user));
        Storage.setItem('offerer', JSON.stringify(data?.offerer));
        setIsConnect(true);
      } else {
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction(res?.data?.message));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {handleLogin, loading, handleChange, form};
};

export const useGenerateOtpCode = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [form, setForm] = useState({tel: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (text: string, type: string) => {
    if (type === 'tel') {
      setForm({...form, tel: text});
    }
  };

  const handleGenerateOtpCode = async () => {
    try {
      setIsLoading(true);
      if (!phoneRegex.test(form?.tel)) {
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction("Votre numéro n'est pas valide !"));
      }
      dispatch(setErrorTextAction(''));
      const res = await generateOTPCode(form);

      if (res.status === 200) {
        setIsLoading(false);
        navigation.navigate('OtpCode', {tel: form?.tel});
      } else {
        setIsLoading(false);
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction(res?.data?.message));
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {handleGenerateOtpCode, handleChange, form, loading: isLoading};
};

// Validate OTP Code
export const useValidateOtpCode = (tel: number) => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [form, setForm] = useState({tel: tel, code: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (text: string, type: string) => {
    if (type === 'code') {
      setForm({...form, code: text});
    }
  };

  const handleValidateOtpCode = async () => {
    try {
      setIsLoading(true);
      dispatch(setErrorTextAction(''));
      const res = await verifyOTPCode(form);

      if (res.status === 200) {
        setIsLoading(false);
        navigation.navigate('NewPassword', {tel: form?.tel});
      } else {
        setIsLoading(false);
        dispatch(setErrorModalAction(true));
        dispatch(setErrorTextAction(res?.data?.message));
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {handleValidateOtpCode, handleChange, form, loading: isLoading};
};

// New Password
export const useNewPassword = (tel: number) => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [form, setForm] = useState({tel: tel, password: '', confirm: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (text: string, type: string) => {
    if (type === 'password') {
      setForm({...form, password: text});
    }
    if (type === 'confirm') {
      setForm({...form, confirm: text});
    }
  };

  const handleNewPassword = async () => {
    setIsLoading(true);

    if (!form?.password || !form?.confirm) {
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction('Veuillez remplir les mots de passe !'));
    }

    if (form?.password !== form?.confirm) {
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction('Les mots de passe ne correspondent pas !'));
    }

    if (form?.password.length < 8) {
      dispatch(setErrorModalAction(true));
      dispatch(
        setErrorTextAction(
          'Le mot de passe doit contenir au moins 8 caractères !',
        ),
      );
    }

    const res = await updatePassword({
      tel: form?.tel,
      newpassword: form?.password,
    });

    if (res.status === 200) {
      setIsLoading(false);
      navigation.navigate('Login');
      dispatch(setSuccessModalAction(true));
      dispatch(
        setSuccessTextAction('Votre mot de passe a été modifié avec succès !'),
      );
    } else {
      setIsLoading(false);
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction(res?.data?.message));
    }
  };

  return {handleNewPassword, handleChange, form, loading: isLoading};
};

export default useLogin;
