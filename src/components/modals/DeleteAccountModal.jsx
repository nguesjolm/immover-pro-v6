import React from 'react';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextVariant } from '../atoms/TextVariant';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeleteAccountModalAction,
  setErrorModalAction,
  setErrorTextAction,
  setSuccessModalAction,
} from '../../redux/modals';
import { THEME } from '../../styles/theme';
import { wp } from '../../assets/utils/helperResponsive';
import { ButtonGeneral } from '../atoms/ButtonGeneral';
import { ModalCustom } from './ModalCustom';
import { deleteClient } from '../../assets/api/auth.api';
import { useDisconnected } from '../../hooks/useDisconnected';

export const DeleteAccountModal = () => {
  //
  const dispatch = useDispatch();
  const { deleteAccountModal } = useSelector((s) => s.modalState);
  const { user } = useSelector((s) => s.authState);
  const { handleDisconnected } = useDisconnected();

  const handleModal = () => {
    dispatch(setDeleteAccountModalAction(false));
  };

  const handleDeleteAccount = async () => {
    const res = await deleteClient(user?.id);

    if (res?.status === 200) {
      await handleDisconnected();
      dispatch(setSuccessModalAction(true));
    } else {
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction('Erreur lors de la suppression du compte'));
    }

    handleModal();
  };

  return (
    <ModalCustom
      show={deleteAccountModal}
      setShow={handleModal}
      isCenter={true}
    >
      <View style={styles.container}>
        <TextVariant
          variant='title3'
          text={'INFORMATION !'}
          textAlign='center'
        />
        <TextVariant
          variant='label'
          text={'Êtes-vous sûr de vouloir supprimer votre compte ?'}
          textAlign='center'
        />
        <SafeAreaView style={styles.body}>
          <LottieView
            source={require('../../assets/json/103831-circle-x.json')}
            autoPlay
            style={{ height: wp('30%'), width: wp('50%') }}
          />
        </SafeAreaView>
        <View style={styles.btnCard}>
          <ButtonGeneral
            text={'NON'}
            onPress={handleModal}
            btnStyle={{ ...styles.btn, backgroundColor: THEME.colors.black }}
          />

          <ButtonGeneral
            text={'OUI'}
            onPress={handleDeleteAccount}
            btnStyle={{ ...styles.btn, backgroundColor: THEME.colors.green }}
          />
        </View>
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
  body: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: wp('30%'),
    width: wp('30%'),
    borderRadius: wp('100%'),
  },
  btn: {
    marginTop: wp('7%'),
    backgroundColor: THEME.colors.black,
    height: wp('12%'),
    width: '49%',
  },
  btnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
