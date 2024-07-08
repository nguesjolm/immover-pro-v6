import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {THEME} from '../../../styles/theme';
import {city, planet, univers} from '../../../styles/main.style';
import {LoginFormHeader} from '../../../components/headers/LoginFormHeader';
import {InputCustom} from '../../../components/atoms/InputCustom';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import useLogin from '../../../hooks/useLogin';

export const LoginScreen = () => {
  //
  const navigation = useNavigation();
  const auth = useLogin();

  return (
    <KeyboardAwareScrollView
      style={styles?.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.curveRight} />
      <LoginFormHeader />
      <View style={styles.content}>
        <InputCustom
          onChangeText={tel => auth.handleChange(tel, 'tel')}
          color={THEME.colors.black}
          value={auth.form.tel}
          placeholder="Numéro de téléphone"
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
        />
        <InputCustom
          onChangeText={password => auth.handleChange(password, 'password')}
          color={THEME.colors.black}
          value={auth.form.password}
          placeholder="Mot de passe"
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
          secret
        />
        <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
          <TextVariant
            variant="title4"
            text="Mot de passe oublié ?"
            textAlign="right"
          />
        </Pressable>
        <ButtonGeneral
          loading={auth.loading}
          backgroundColor={THEME.colors.primary}
          btnStyle={styles.submitBtn}
          text="Se connecter"
          onPress={() => auth.handleLogin()}
        />
        <ButtonGeneral
          backgroundColor={THEME.colors.transparent}
          btnStyle={styles.createAccountBtn}
          textColor={THEME.colors.primary}
          text="Créer un compte"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: univers * 1.3,
    paddingHorizontal: univers,
    paddingTop: univers,
  },
  submitBtn: {
    marginTop: planet,
  },
  createAccountBtn: {
    marginTop: city,
  },

  curveRight: {
    backgroundColor: THEME.colors.primary,
    width: 200,
    height: '90%',
    position: 'absolute',
    zIndex: 0,
  },
});
