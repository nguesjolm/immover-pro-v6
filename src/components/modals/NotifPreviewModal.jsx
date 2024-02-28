import React from 'react';
import {TextVariant} from '../atoms/TextVariant';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setNotifPreviewModalAction} from '../../redux/modals';
import {THEME} from '../../styles/theme';
import {wp} from '../../assets/utils/helperResponsive';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {ModalCustom} from './ModalCustom';

export const NotifPreviewModal = () => {
  //
  const dispatch = useDispatch();
  const modal = useSelector(s => s.modalState.notifPreviewModal);
  const notifSeleted = useSelector(s => s.notifState.notifSelected);
 
  const handleModal = () => {
    dispatch(setNotifPreviewModalAction(false));
  };

  return (
    <ModalCustom show={modal} setShow={handleModal} isCenter={true}>
      <View style={styles.container}>
        <TextVariant
          variant="title3"
          text={'Notification !'}
          textAlign="center"
        />

        <TextVariant
          variant="label"
          text={notifSeleted?.type || ''}
          textAlign="left"
        />
        <TextVariant
          variant="label"
          text={notifSeleted?.message || ''}
          textAlign="center"
        />

        <ButtonGeneral
          text={'FERMER'}
          onPress={handleModal}
          btnStyle={styles.btn}
        />
      </View>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.white,
    borderRadius: wp('5%'),
  },

  btn: {
    marginTop: wp('7%'),
    backgroundColor: THEME.colors.black,
    height: wp('12%'),
  },
});
