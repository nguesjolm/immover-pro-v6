import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {hp} from '../../assets/utils/helperResponsive';
import {THEME} from '../../styles/theme';
import {ActivityLoader} from './ActivityLoader';
import {TextVariant} from './TextVariant';

export const ButtonGeneral = ({
  text,
  width = '100%',
  backgroundColor = THEME.colors.primary,
  onPress,
  btnStyle,
  disabled = false,
  textColor = THEME.colors.white,
  loading,
  variant,
  Icon,
  viewBox,
  textTransform,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[{...styles.container, width, backgroundColor, ...btnStyle}]}>
      {loading && <ActivityLoader />}
      {!loading && (
        <TextVariant
          text={text}
          textTransform={textTransform}
          color={textColor}
          variant={variant || 'title5'}
          textAlign="center"
        />
      )}
      {Icon ? <>{viewBox ? <Icon viewBox={viewBox} /> : <Icon />}</> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('7%'),
    borderRadius: hp('1.55%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
