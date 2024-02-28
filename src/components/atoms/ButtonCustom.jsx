import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {TextVariant} from './TextVariant';

export const ButtonCustom = ({
  width,
  height,
  backgroundColor,
  label,
  IconTag,
  labelVariant,
  labelTransform = 'capitalize',
  labelColor = 'white',
  marginBottom,
  marginRight,
  onPress,
  disabled,
  btnStyle,
  fontWeight,
}) => {
  //
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          ...btnStyle,
          width,
          height,
          backgroundColor,
          label,
          marginBottom,
          marginRight,
        },
      ]}>
      {IconTag && <IconTag />}
      {label && (
        <TextVariant
          text={label}
          variant={labelVariant}
          textTransform={labelTransform}
          color={labelColor}
          textAlign="center"
          fontWeight={fontWeight}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({});
