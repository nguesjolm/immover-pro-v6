import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {country, street} from '../../styles/main.style';
import {hp} from '../../assets/utils/helperResponsive';
import {TextVariant} from './TextVariant';
import {THEME} from '../../styles/theme';

export const InputCustom = ({
  label,
  error,
  placeholder,
  onChangeText,
  value = '',
  secret,
  testID,
  inputContainerStyle,
  inputStyle,
  color,
  variant,
  onFocus,
  onBlur,
  secureTextEntry,
  keyboardType,
  Icon,
  onPressInputIcon,
  editable,
  multiline,
  numberOfLines,
}) => {
  //

  return (
    <View style={[styles.container, {...inputContainerStyle}]}>
      <View>
        {!!label && (
          <TextVariant
            text={label}
            variant={variant || 'h5'}
            color={color || THEME.colors.darkLight}
          />
        )}
        {!!error && (
          <View style={{position: 'absolute', right: 5, top: 25, zIndex: 100}}>
            <TextVariant
              text={error}
              variant="label3"
              color={THEME.colors.red}
              textAlign="right"
            />
          </View>
        )}
      </View>
      <TextInput
        onChangeText={onChangeText ? text => onChangeText(text) : () => {}}
        style={{
          ...styles.input,
          ...inputStyle,
          color: color || THEME.colors.black,
        }}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.gray}
        secureTextEntry={secret}
        value={value}
        testID={testID}
        onFocus={onFocus ? onFocus : () => {}}
        onBlur={onBlur ? onBlur : () => {}}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        underlineColorAndroid="transparent"
      />
      {Icon ? (
        <Pressable onPress={onPressInputIcon}>
          <Icon />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  input: {
    borderRadius: street,
    paddingHorizontal: country,
    marginTop: street,
    fontSize: hp('2%'),
    height: hp('7%'),
    width: '100%',
    fontFamily: 'Montserrat-Bold',
  },
});
