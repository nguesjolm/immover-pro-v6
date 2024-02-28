import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {View, StyleSheet, Pressable} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {THEME} from '../../styles/theme';
import {hp} from '../../assets/utils/helperResponsive';
import {formatPrice} from '../../assets/utils/functions';

export const TransactionItemCard = ({item, onPress, onPropose}) => {
  //

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logo}>
            <TextVariant
              text={item?.Bien?.biens_code?.charAt(0) || ''}
              variant="title2"
              color={THEME.colors.primary}
              textAlign="center"
            />
          </View>

          <View style={styles.details}>
            <View style={styles.title}>
              <TextVariant
                text={item?.Bien?.biens_code || 'Aucun code'}
                variant="title5"
                color={THEME.colors.green}
                textAlign="center"
              />
              <View style={styles.separator} />
              <TextVariant variant="title5" text={item?.Bien?.categories} />
            </View>
            <TextVariant variant="label" text={item?.Bien?.communeQuartier} />
            <TextVariant
              variant="label"
              text={`${formatPrice(
                item?.Bien?.details?.loyer !== null &&
                  item?.Bien?.details?.loyer > 0
                  ? item?.Bien?.details?.loyer
                  : item?.Bien?.details?.montantAchat,
              )} F cfa`}
            />
          </View>
        </View>

        <ButtonGeneral
          text={`Commission: ${item?.montant || 0} F`}
          variant={'label3'}
          btnStyle={styles.btnStyle}
          textColor={THEME.colors.white}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  separator: {
    width: hp('.3%'),
    height: hp('1.5%'),
    borderRadius: hp('20%'),
    backgroundColor: THEME.colors.black,
    marginHorizontal: hp('1%'),
  },
  btnStyle: {
    width: hp('12%'),
    height: hp('5%'),
    backgroundColor: THEME.colors.green,
    borderRadius: hp('1%'),
    paddingHorizontal: hp('1%'),
  },
});
