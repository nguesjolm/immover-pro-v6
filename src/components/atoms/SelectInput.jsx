import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {city, country, street} from '../../styles/main.style';
import {hp} from '../../assets/utils/helperResponsive';
import {TextVariant} from './TextVariant';
import {THEME} from '../../styles/theme';
import {ButtonCustom} from './ButtonCustom';

export const SelectInput = ({
  label,
  value = '',
  inputContainerStyle,
  inputStyle,
  color,
  variant,
  onPress,
}) => {
  //
  return (
    <View style={[styles.container, {...inputContainerStyle}]}>
      <View style={styles.labels}>
        <TextVariant
          text={label}
          variant={variant || 'label'}
          color={color || THEME.colors.black}
          fontWeight={'bold'}
        />
        {onPress && (
          <ButtonCustom
            labelColor={THEME.colors.primary}
            label={'Sélectionner'}
            labelVariant="label"
            fontWeight={'bold'}
            onPress={onPress}
          />
        )}
      </View>
      <View style={[{...styles.input, ...inputStyle}]}>
        <TextVariant
          text={value}
          variant={variant || 'label'}
          color={color || THEME.colors.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: city,
  },
  input: {
    borderRadius: street,
    backgroundColor: THEME.colors.darkLight,
    paddingHorizontal: country,
    fontSize: hp('2%'),
    height: hp('7%'),
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    justifyContent: 'center',
  },
});
