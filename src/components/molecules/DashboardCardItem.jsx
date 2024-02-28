import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {TextVariant} from '../atoms/TextVariant';
import MoreIcon from '../../assets/svgs/MoreIcon';
import {ButtonCustom} from '../atoms/ButtonCustom';
import {TouchableOpacity} from 'react-native';

export const DashboardCardItem = ({title, withImage, value, onPress}) => {
  //

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TextVariant variant="title3" text={title} textAlign="center" />
      {withImage ? (
        <Image
          source={require('../../assets/images/house.png')}
          style={styles.image}
        />
      ) : (
        <TextVariant variant="mediumText" text={value} textAlign="center" />
      )}
      {withImage && (
        <ButtonCustom
          IconTag={MoreIcon}
          btnStyle={{alignSelf: 'flex-end'}}
          disabled={true}
        />
      )}
      {!withImage && (
        <ButtonCustom
          label="Détails"
          labelVariant="title4"
          labelColor={THEME.colors.primary}
          disabled={true}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('43'),
    height: '100%',
    padding: hp('2'),
    borderRadius: hp('2%'),
    backgroundColor: THEME.colors.white,
    ...THEME.shadow,
  },
  image: {
    width: hp('12'),
    height: hp('12'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
