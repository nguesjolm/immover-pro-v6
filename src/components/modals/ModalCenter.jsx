import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ModalCustom} from './ModalCustom';
import {THEME} from '../../styles/theme';
import {country, street} from '../../styles/main.style';

export function ModalCenter({show, setShow, children, contentModalStyle}) {
  //

  return (
    <ModalCustom style={styles.modal} show={show} setShow={setShow}>
      <View style={[styles.center, {...contentModalStyle}]}>{children}</View>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
    padding: country,
  },
  center: {
    flexDirection: 'column',
    padding: country,
    backgroundColor: THEME.colors.white,
    borderRadius: street,
  },
});
