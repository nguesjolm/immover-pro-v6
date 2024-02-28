import {Image, StyleSheet, View} from 'react-native';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {univers} from '../../styles/main.style';
import {Fragment} from 'react';
import {TextVariant} from '../atoms/TextVariant';

export const LoginFormHeader = () => {
  //

  return (
    <Fragment>
      <View style={styles.header}>
        <TextVariant
          variant="h3"
          text={'IMMOVER PRO'}
          textAlign="center"
          marginTop={hp('6%')}
          color={THEME.colors.white}
          fontStyle={'italic'}
          fontWeight={'bold'}
        />
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/home.png')}
            style={styles.image}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp('45%'),
    width: '100%',
    backgroundColor: THEME.colors.primary,
    borderBottomRightRadius: univers * 1.3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    bottom: hp('-8.5'),
    width: wp('100'),
  },
  image: {
    width: wp('100'),
    height: hp('42'),
    opacity: 0.3,
    marginBottom: hp('-0.5'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
