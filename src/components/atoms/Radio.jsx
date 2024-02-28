import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextVariant} from './TextVariant';
import {THEME} from '../../styles/theme';
import {hp} from '../../assets/utils/helperResponsive';
import {street} from '../../styles/main.style';

export const RadioField = ({label, active, style, onPress, variant}) => {
  //

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <Pressable style={[styles.radio(active), style]} onPress={onPress}>
        <View style={styles.circle(active)} />
      </Pressable>
      <TextVariant
        text={label}
        variant={variant || 'title4'}
        marginLeft={street}
        textTransform="uppercase"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  radio: active => ({
    height: hp('2.5%'),
    width: hp('2.5%'),
    borderRadius: hp('20%'),
    borderWidth: hp('0.1%'),
    borderColor: THEME.colors.darkLight,
    backgroundColor: THEME.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: active ? THEME.colors.primary : THEME.colors.darkLight,
  }),
  circle: active => ({
    height: hp('1.5%'),
    width: hp('1.5%'),
    borderRadius: hp('20%'),
    borderColor: THEME.colors.darkLight,
    backgroundColor: active ? THEME.colors.primary : THEME.colors.darkLight,
  }),
});
