import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {street} from '../../styles/main.style';

export const WellAvailableFilterItem = ({
  item,
  active,
  onPress,
  width,
  height,
}) => {
  //

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.container(active), width: width || wp('29'), height}}
      onPress={onPress}>
      <TextVariant
        variant="title5"
        color={active ? THEME.colors.white : THEME.colors.black}
        text={item?.label}
        textAlign={'center'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: active => ({
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('0.7'),
    ...THEME.shadow,
    borderRadius: wp('5%'),
    backgroundColor: active ? THEME.colors.primary : THEME.colors.darkLight,
    marginVertical: street,
    padding: wp('1.3'),
  }),
});
