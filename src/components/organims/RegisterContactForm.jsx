import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../styles/theme';
import {TextVariant} from '../atoms/TextVariant';
import {planet} from '../../styles/main.style';
import {hp} from '../../assets/utils/helperResponsive';
import {InputCustom} from '../atoms/InputCustom';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  setCpasswordAction,
  setEmailAction,
  setNameAction,
  setPasswordAction,
  setTelAction,
  setZoneAction,
} from '../../redux/register';
import CloseEye from '../../assets/svgs/CloseEye';
import OpenEyeIcon from '../../assets/svgs/OpenEyeIcon';

export const RegisterContactForm = () => {
  //
  const dispatch = useDispatch();
  const name = useSelector(s => s.registerState.name);
  const email = useSelector(s => s.registerState.email);
  const tel = useSelector(s => s.registerState.tel);
  const zone = useSelector(s => s.registerState.zone);
  const password = useSelector(s => s.registerState.password);
  const cpassword = useSelector(s => s.registerState.cpassword);
  const [phoneError, setPhoneError] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(false);

  const handleChange = (e, type) => {
    switch (type) {
      case 'name':
        dispatch(setNameAction(e));
        break;
      case 'email':
        dispatch(setEmailAction(e));
        break;
      case 'tel':
        const phoneRegex =
          /^(\d{0,0})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (!phoneRegex.test(e)) {
          setPhoneError('Veuillez entrer un numéro valide.');
        } else {
          setPhoneError('');
        }
        dispatch(setTelAction(e));
        break;
      case 'zone':
        dispatch(setZoneAction(e));
        break;
      case 'password':
        dispatch(setPasswordAction(e));
        break;
      case 'cpassword':
        dispatch(setCpasswordAction(e));
        break;
      default:
        break;
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.contactForm}
      showsVerticalScrollIndicator={false}>
      <TextVariant
        text={'2- Quels sont vos contacts ?'}
        variant={'title3'}
        marginBottom={planet}
      />
      <InputCustom
        label={'Nom'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={name}
        onChangeText={e => handleChange(e, 'name')}
      />
      <InputCustom
        label={'E-mail'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={email}
        onChangeText={e => handleChange(e, 'email')}
      />
      <InputCustom
        label={'Numéro de téléphone'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={tel}
        error={phoneError}
        onChangeText={e => handleChange(e, 'tel')}
      />
      <InputCustom
        label={'Localisation'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={zone}
        onChangeText={e => handleChange(e, 'zone')}
      />
      <InputCustom
        label={'Mot de passe'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={password}
        onChangeText={e => handleChange(e, 'password')}
        secret={!hidePassword}
        // Icon={hidePassword ? OpenEyeIcon : CloseEye}
        onPressInputIcon={() => setHidePassword(!hidePassword)}
      />
      <InputCustom
        label={'Confirmer le mot de passe'}
        inputContainerStyle={styles.formInput}
        inputStyle={styles.inputItem}
        variant={'title4'}
        color={THEME.colors.black}
        value={cpassword}
        onChangeText={e => handleChange(e, 'cpassword')}
        secret={!hidePassword}
        // Icon={hidePassword ? OpenEyeIcon : CloseEye}
        onPressInputIcon={() => setHidePassword(!hidePassword)}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  contactForm: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    marginBottom: hp('12%'),
  },
  formInput: {
    backgroundColor: THEME.colors.white,
  },
  inputItem: {
    backgroundColor: THEME.colors.white,
    borderColor: THEME.colors.black,
    borderWidth: hp('0.1%'),
  },
});
