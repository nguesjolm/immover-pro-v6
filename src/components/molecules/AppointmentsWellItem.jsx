import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {THEME} from '../../styles/theme';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {street} from '../../styles/main.style';
import {formatPrice} from '../../assets/utils/functions';

export const AppointmentsWellItem = ({item, onPress}) => {
  //

  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(1000).springify()}
      style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.content}
        activeOpacity={0.8}>
        <View style={styles.logo}>
          <TextVariant
            text={item?.bien?.operations?.charAt(0) || ''}
            variant="title2"
            color={THEME.colors.primary}
            textAlign="center"
          />
        </View>

        <View style={styles.details}>
          <View style={styles.title}>
            <TextVariant
              text={item?.bien?.operations || ''}
              variant="title5"
              color={THEME.colors.green}
              textAlign="center"
            />
            <View style={styles.separator} />
            <TextVariant variant="title5" text={item?.bien?.categories} />
          </View>

          <View style={styles.item}>
            <TextVariant variant="label2" text={item?.bien?.communeQuartier} />
            <TextVariant variant="label2" text={item?.client?.name} />
          </View>
          <View style={styles.item}>
            <TextVariant
              variant="label2"
              text={`${
                item?.bien?.details?.superficie &&
                !item?.bien?.details?.superficie === 0
                  ? item?.bien?.details?.superficie + ' m2 -'
                  : item?.bien?.details?.pieces + ' pièces -'
              } ${formatPrice(
                item?.bien?.details?.loyer > 0
                  ? item?.bien?.details?.loyer
                  : item?.bien?.details?.montantAchat,
              )} F`}
            />
            <TextVariant
              variant="label2"
              text={`Date de visite : ${item?.date_visite || item?.created_at}`}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: street,
    paddingVertical: hp('1%'),
    marginVertical: hp('1%'),
    width: '100%',
  },
  logo: {
    width: hp('5%'),
    height: hp('5%'),
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
    width: '100%',
  },
  details: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  separator: {
    width: hp('.3%'),
    height: hp('1.5%'),
    borderRadius: hp('20%'),
    backgroundColor: THEME.colors.black,
    marginHorizontal: hp('1%'),
  },
  item: {
    width: wp('75'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
