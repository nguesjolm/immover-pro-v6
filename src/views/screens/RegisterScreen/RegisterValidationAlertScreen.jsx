import React from 'react';
import OclockIcon from '../../../assets/svgs/OclockIcon';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {city, planet, univers} from '../../../styles/main.style';
import {THEME} from '../../../styles/theme';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';
import {RegisterHeader} from '../../../components/headers/RegisterHeader';
import {useDispatch} from 'react-redux';
import {resetRegisterStateAction} from '../../../redux/register';

export const RegisterValidationAlertScreen = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('Login');
    dispatch(resetRegisterStateAction());
  };

  return (
    <View style={styles.container}>
      <RegisterHeader />
      <View style={styles.content}>
        <OclockIcon />
        <TextVariant
          variant={'h4'}
          fontWeight={'bold'}
          text={
            'C’est presque terminé ! Votre compte est en cours de verification.'
          }
          marginTop={city}
        />

        <TextVariant
          variant={'label'}
          text={
            'Nous vous préviendrons dès qu’elle sera acceptée ou nous vous contacterons si nous avons besoin davantage d’informations.'
          }
          marginTop={planet}
          lineHeight={planet}
        />
        <View style={styles.footer}>
          <ButtonGeneral
            text={'Terminer'}
            variant={'title3'}
            btnStyle={styles.nextBtn('100%')}
            onPress={handleRedirect}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtn: width => ({
    marginBottom: univers,
    width: width,
    backgroundColor: THEME.colors.black,
  }),
  footer: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: univers * 1.3,
    paddingHorizontal: univers,
    paddingTop: univers,
    width: '100%',
    alignSelf: 'center',
  },
});
