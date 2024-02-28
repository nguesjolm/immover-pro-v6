import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ModalCustom} from './ModalCustom';
import {country} from '../../styles/main.style';
import {THEME} from '../../styles/theme';

export function ModalBottomHalf({style, show, setShow, children}) {
  return (
    <ModalCustom style={[styles.modal, style]} show={show} setShow={setShow}>
      <View style={styles.bottomHalf}>{children}</View>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomHalf: {
    padding: country,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: country,
    borderTopRightRadius: country,
  },
});
