import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {THEME} from '../../../styles/theme';
import {planet, univers} from '../../../styles/main.style';
import {InputCustom} from '../../../components/atoms/InputCustom';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useGenerateOtpCode} from '../../../hooks/useLogin';
import {RegisterHeader} from '../../../components/headers/RegisterHeader';

export const ForgetPasswordScreen = () => {
  //
  const navigation = useNavigation();
  const otpCode = useGenerateOtpCode();

  return (
    <KeyboardAwareScrollView style={styles?.container}>
      <View style={styles.curveRight} />
      <RegisterHeader title={'Récupération de mot de passe'} />
      <View style={styles.content}>
        <InputCustom
          onChangeText={tel => otpCode.handleChange(tel, 'tel')}
          color={THEME.colors.black}
          value={otpCode.form.tel}
          placeholder="Numéro de téléphone"
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <TextVariant variant="title4" text="Retour" textAlign="right" />
        </Pressable>
        <ButtonGeneral
          loading={otpCode.loading}
          backgroundColor={THEME.colors.primary}
          btnStyle={styles.submitBtn}
          text="Générer un code"
          onPress={() => otpCode.handleGenerateOtpCode()}
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

  curveRight: {
    backgroundColor: THEME.colors.primary,
    width: 200,
    height: '90%',
    position: 'absolute',
    zIndex: 0,
  },
});
