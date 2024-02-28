import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {hp, wp} from '../../assets/utils/helperResponsive';
import * as Animatable from 'react-native-animatable';
import {THEME} from '../../styles/theme';

export const LogoLoader = ({bgcolor}) => {
  const [animationType, setAnimationType] = useState('flipInY');

  const animationTypes = ['flipInY'];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * animationTypes.length);
      const randomAnimationType = animationTypes[randomIndex];
      setAnimationType(randomAnimationType);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: bgcolor || THEME.colors.redLight,
      }}>
      <Animatable.View
        animation={animationType}
        iterationCount="infinite"
        duration={700}
        style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </Animatable.View>
    </View>
  );
};

const styles = {
  container: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: wp('25%'),
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
};
