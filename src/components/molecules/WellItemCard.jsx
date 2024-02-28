import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {View, StyleSheet, Pressable} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {THEME} from '../../styles/theme';
import {hp} from '../../assets/utils/helperResponsive';

export const WellItemCard = ({item, commission, onPress, onPropose}) => {
  //

  const isOfferedBgColor =
    item?.offre === 'true' || item?.offre === true
      ? THEME.colors.green + '50'
      : THEME.colors.darkLight;

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={{...styles.logo, backgroundColor: isOfferedBgColor}}>
            <TextVariant
              text={item?.demande_code?.charAt(0) || ''}
              variant="title2"
              color={THEME.colors.primary}
              textAlign="center"
            />
          </View>

          <View style={styles.details}>
            <View style={styles.title}>
              <TextVariant
                text={item?.demande_code || 'Aucun code'}
                variant="title5"
                color={THEME.colors.green}
                textAlign="center"
              />
              <View style={styles.separator} />
              <TextVariant variant="title5" text={item?.categoriesBiens_name} />
            </View>
            <TextVariant
              variant="label"
              text={item?.lieu?.[0]?.communequartier}
            />
            <TextVariant variant="label" text={`${item?.budget || 0} Fcfa`} />
          </View>
        </View>

        <ButtonGeneral
          text={commission ? 'Commission 500.000 F' : 'Proposer une offre'}
          variant={'label2'}
          btnStyle={styles.btnStyle(commission)}
          textColor={commission ? THEME.colors.white : THEME.colors.black}
          onPress={onPropose}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
    marginVertical: hp('1%'),
  },
  logo: {
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: hp('20%'),
    backgroundColor: THEME.colors.darkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp('1%'),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {},
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    width: hp('.3%'),
    height: hp('1.5%'),
    borderRadius: hp('20%'),
    backgroundColor: THEME.colors.black,
    marginHorizontal: hp('1%'),
  },
  btnStyle: commission => ({
    width: hp('12%'),
    height: hp('6%'),
    backgroundColor: commission ? THEME.colors.green : THEME.colors.darkLight,
    borderRadius: hp('1%'),
    paddingHorizontal: hp('1%'),
  }),
});
