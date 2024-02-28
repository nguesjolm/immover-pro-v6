import React from 'react';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextVariant} from '../atoms/TextVariant';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorModalAction} from '../../redux/modals';
import {THEME} from '../../styles/theme';
import {wp} from '../../assets/utils/helperResponsive';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {ModalCustom} from './ModalCustom';

export const ErrorModal = () => {
  //
  const dispatch = useDispatch();
  const {errorModal, errorText} = useSelector(s => s.modalState);

  const handleModal = () => {
    dispatch(setErrorModalAction(false));
  };

  return (
    <ModalCustom show={errorModal} setShow={handleModal} isCenter={true}>
      <View style={styles.container}>
        <TextVariant
          variant="title3"
          text={'INFORMATION !'}
          textAlign="center"
        />
        <TextVariant variant="label" text={errorText} textAlign="center" />
        <SafeAreaView style={styles.body}>
          <LottieView
            source={require('../../assets/json/103831-circle-x.json')}
            autoPlay
          />
        </SafeAreaView>
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
  },
});
