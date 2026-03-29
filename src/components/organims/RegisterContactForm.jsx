import React, {useRef, useState} from 'react';
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
  
  // États séparés pour chaque champ de mot de passe
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  
  // Références pour chaque input
  const scrollViewRef = useRef(null);
  const inputsRef = {
    name: useRef(null),
    email: useRef(null),
    tel: useRef(null),
    zone: useRef(null),
    password: useRef(null),
    cpassword: useRef(null),
  };

  const handleChange = (e, type) => {
    switch (type) {
      case 'name':
        dispatch(setNameAction(e));
        break;
      case 'email':
        dispatch(setEmailAction(e));
        break;
      case 'tel':
        const phoneRegex = /^(\d{0,0})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(e) && e.length > 0) {
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

  // Fonction pour gérer le focus et le défilement
  const handleFocus = (inputName) => {
    setTimeout(() => {
      inputsRef[inputName]?.current?.measureLayout(
        scrollViewRef.current?.getInnerViewNode(),
        (x, y) => {
          scrollViewRef.current?.scrollToPosition(0, y - 100, true);
        },
        () => {}
      );
    }, 100);
  };

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      style={styles.contactForm}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraHeight={150}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={100}
    >
      <TextVariant
        text={'2- Quels sont vos contacts ?'}
        variant={'title3'}
        marginBottom={planet}
      />
      
      <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.name}
          label={'Nom'}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={name}
          onChangeText={e => handleChange(e, 'name')}
          onFocus={() => handleFocus('name')}
          returnKeyType="next"
          onSubmitEditing={() => inputsRef.email.current?.focus()}
          blurOnSubmit={false}
        />
      </View>

      {/* <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.email}
          label={'E-mail'}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={email}
          onChangeText={e => handleChange(e, 'email')}
          onFocus={() => handleFocus('email')}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => inputsRef.tel.current?.focus()}
          blurOnSubmit={false}
        />
      </View> */}

      <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.tel}
          label={'Numéro de téléphone (Whatsapp)'}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={tel}
          error={phoneError}
          onChangeText={e => handleChange(e, 'tel')}
          onFocus={() => handleFocus('tel')}
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => inputsRef.zone.current?.focus()}
          blurOnSubmit={false}
          placeholder={"ex : 0788892608"}
        />
      </View>

      <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.zone}
          label={"Localisation (uniquement en côte d'ivoire)"}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={zone}
          onChangeText={e => handleChange(e, 'zone')}
          onFocus={() => handleFocus('zone')}
          returnKeyType="next"
          onSubmitEditing={() => inputsRef.password.current?.focus()}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.password}
          label={'Mot de passe'}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={password}
          onChangeText={e => handleChange(e, 'password')}
          onFocus={() => handleFocus('password')}
          secret={hidePassword}
          Icon={hidePassword ? CloseEye : OpenEyeIcon} // ✅ Icône œil
          onPressInputIcon={() => setHidePassword(!hidePassword)} // ✅ Bascule
          returnKeyType="next"
          onSubmitEditing={() => inputsRef.cpassword.current?.focus()}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.formGroup}>
        <InputCustom
          ref={inputsRef.cpassword}
          label={'Confirmer le mot de passe'}
          inputContainerStyle={styles.formInput}
          inputStyle={styles.inputItem}
          variant={'title4'}
          color={THEME.colors.black}
          value={cpassword}
          onChangeText={e => handleChange(e, 'cpassword')}
          onFocus={() => handleFocus('cpassword')}
          secret={hideConfirmPassword}
          Icon={hideConfirmPassword ? CloseEye : OpenEyeIcon} // ✅ Icône œil
          onPressInputIcon={() => setHideConfirmPassword(!hideConfirmPassword)} // ✅ Bascule séparée
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      
      {/* Espace supplémentaire pour éviter que le dernier champ soit caché */}
      <View style={styles.bottomSpace} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  contactForm: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  contentContainer: {
    paddingBottom: hp('5%'),
  },
  formGroup: {
    marginBottom: planet,
  },
  formInput: {
    backgroundColor: THEME.colors.white,
  },
  inputItem: {
    backgroundColor: THEME.colors.white,
    borderColor: THEME.colors.black,
    borderWidth: hp('0.1%'),
    minHeight: hp('6%'),
  },
  bottomSpace: {
    height: hp('10%'),
  },
});