import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {THEME} from '../../styles/theme';
import {hp, wp} from '../../assets/utils/helperResponsive';

export const ModalCustom = ({children, show, setShow, style}) => {
  return (
    <Modal
      testID={'modal'}
      useNativeDriverForBackdrop
      hasBackdrop
      deviceWidth={wp('100')}
      deviceHeight={hp('100')}
      useNativeDriver
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionOutTiming={0}
      swipeDirection={['up', 'left', 'right', 'down']}
      style={style ? style : styles.modal}
      coverScreen
      isVisible={show}
      backdropColor={THEME.colors.black + '30'}
      onBackdropPress={setShow}
      statusBarTranslucent>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
