import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {THEME} from '../../../styles/theme';
import {city, planet, univers} from '../../../styles/main.style';
import {InputCustom} from '../../../components/atoms/InputCustom';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useValidateOtpCode} from '../../../hooks/useLogin';
import {RegisterHeader} from '../../../components/headers/RegisterHeader';

export const OtpCodeScreen = ({route}) => {
  //

  const {tel} = route.params;
  const navigation = useNavigation();
  const otpCode = useValidateOtpCode(tel);

  return (
    <KeyboardAwareScrollView style={styles?.container}>
      <View style={styles.curveRight} />
      <RegisterHeader title={'Saissisez votre code'} />
      <View style={styles.content}>
        <InputCustom
          onChangeText={() => {}}
          color={THEME.colors.black}
          value={tel || otpCode.form.tel}
          placeholder="Numéro de téléphone"
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
          editable={false}
        />
        <InputCustom
          onChangeText={code => otpCode.handleChange(code, 'code')}
          color={THEME.colors.black}
          value={otpCode.form.code}
          placeholder="I-Code"
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
        />

        <Pressable onPress={() => navigation.goBack()}>
          <TextVariant variant="title4" text="Retour" textAlign="right" />
        </Pressable>
        <ButtonGeneral
          loading={otpCode.loading}
          backgroundColor={THEME.colors.primary}
          btnStyle={styles.submitBtn}
          text="Valider"
          onPress={() => otpCode.handleValidateOtpCode()}
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
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  title: {
    marginBottom: city,
  },
});
