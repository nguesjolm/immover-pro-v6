import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {hp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';

export const TextVariant = ({variant, text, color, ...props}) => {
  //
  return (
    <Text
      style={{
        ...styles[variant],
        color: color || THEME.colors.black,
        textTransform: props.textTransform || 'none',
        textAlign: props.textAlign || 'left',
        fontStyle: props.fontStyle || 'normal',
        marginBottom: props.marginBottom || 0,
        marginTop: props.marginTop || 0,
        marginLeft: props.marginLeft || 0,
        marginRight: props.marginRight || 0,
        marginHorizontal: props.marginHorizontal || 0,
        letterSpacing: props.letterSpacing || 0,
        textDecorationLine: props.textDecorationLine || 'none',
        ...props,
      }}>
      {text}
    </Text>
  );
};

const generateFont = (weight, bold, fontStyle = 'normal') => {
  return {
    fontWeight: weight,
    fontFamily: `Montserrat-${bold}`,
    fontStyle,
  };
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: hp('8%'),
    ...generateFont('700', 'BoldItalic', 'italic'),
  },
  menuTitle: {
    fontSize: hp('1.3%'),
    ...generateFont('700', 'BoldItalic', 'italic'),
  },
  mediumText: {
    fontSize: hp('7.2%'),
    ...generateFont('700', 'Bold', 'italic'),
  },
  infoTitle: {
    fontSize: hp('3.8%'),
    ...generateFont('700', 'Bold'),
  },
  smallText: {
    fontSize: hp('2%'),
    ...generateFont('700', 'Bold'),
  },
  h1: {
    fontSize: hp('8%'),
    ...generateFont('700', 'Bold'),
  },
  h2: {
    fontSize: hp('5%'),
    ...generateFont('700', 'Bold'),
  },
  h3: {
    fontSize: hp('3%'),
    ...generateFont('700', 'Bold'),
  },
  h4: {
    fontSize: hp('2.5%'),
    ...generateFont('200', 'Regular'),
  },
  h5: {
    fontSize: hp('1.50%'),
    ...generateFont('700', 'Regular'),
  },
  title1: {
    fontSize: hp('4%'),
    ...generateFont('700', 'Bold'),
  },
  title2: {
    fontSize: hp('2.7%'),
    ...generateFont('700', 'Bold'),
  },
  title3: {
    fontSize: hp('2.15%'),
    ...generateFont('700', 'Bold'),
  },
  title4: {
    fontSize: hp('2%'),
    ...generateFont('700', 'Bold'),
  },
  title5: {
    fontSize: hp('1.8%'),
    ...generateFont('700', 'Bold'),
  },
  label: {
    fontSize: hp('1.8%'),
    ...generateFont('100', 'Regular'),
  },
  label2: {
    fontSize: hp('1.5%'),
    ...generateFont('100', 'Regular'),
  },
  label3: {
    fontSize: hp('1.3%'),
    ...generateFont('100', 'Regular'),
  },
});
