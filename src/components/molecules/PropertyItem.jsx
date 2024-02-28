import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {city} from '../../styles/main.style';
import {BASE_URI_IMAGE} from '../../assets/api/app.config';
import {formatPrice, formatedDate} from '../../assets/utils/functions';

export const PropertyItem = ({well, onPress}) => {
  //

  const wellDetail = well[0] || well?.bien;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      <Image
        source={
          wellDetail?.images?.length > 0
            ? {
                uri: `${BASE_URI_IMAGE}${
                  wellDetail?.images[wellDetail?.images?.length - 1]?.source
                }`,
              }
            : require('../../assets/images/home.png')
        }
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.title}>
          <TextVariant
            variant="title5"
            text={wellDetail?.biens_code || '0000C'}
            color={THEME.colors.green}
          />
          <View style={styles.separator} />
          <TextVariant variant="title5" text={wellDetail?.operations} />
        </View>

        <View style={styles.locality}>
          <TextVariant variant="label2" text={wellDetail?.communeQuartier} />
          <View
            style={
              wellDetail?.details?.statut === 'dispo'
                ? {...styles.active, backgroundColor: THEME.colors.green}
                : {...styles.active, backgroundColor: THEME.colors.red}
            }
          />
        </View>
        <View style={styles.price}>
          <TextVariant
            variant="label2"
            text={formatPrice(
              `${
                wellDetail?.bien?.details?.superficie
                  ? wellDetail?.details?.superficie || 0 + ' m2 | '
                  : wellDetail?.details?.pieces
                  ? wellDetail?.details?.pieces || 0 + ' pièces | '
                  : ''
              } | ${
                (wellDetail?.details?.loyer > 0
                  ? wellDetail?.details?.loyer + 'F'
                  : wellDetail?.details?.montantAchat > 0
                  ? wellDetail?.details?.montantAchat + 'F'
                  : '') || ''
              }`,
            )}
          />
          <TextVariant
            variant="label2"
            text={formatedDate(wellDetail?.details?.created_at)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '99%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('0.7'),
    ...THEME.shadow,
    borderRadius: wp('3%'),
    backgroundColor: THEME.colors.white,
    padding: city,
  },
  image: {
    width: '100%',
    height: wp('45'),
    resizeMode: 'cover',
    backgroundColor: THEME.colors.white,
    borderRadius: city,
    marginBottom: wp('2'),
  },
  content: {
    width: '100%',
    height: 'auto',
  },
  title: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: wp('.5'),
    height: wp('3'),
    backgroundColor: THEME.colors.primary,
    marginHorizontal: wp('1'),
  },
  locality: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  active: {
    width: wp('2'),
    height: wp('2'),
    borderRadius: wp('20%'),
    backgroundColor: THEME.colors.green,
  },
});
