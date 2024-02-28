import React from 'react';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextVariant} from '../atoms/TextVariant';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setErrorModalAction,
  setProposedOfferedModalAction,
} from '../../redux/modals';
import {THEME} from '../../styles/theme';
import {wp} from '../../assets/utils/helperResponsive';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {ModalCustom} from './ModalCustom';
import {useNavigation} from '@react-navigation/native';

export const ProprosedOfferedModal = () => {
  //

  const dispatch = useDispatch();
  const {proprosedOfferedModal} = useSelector(s => s.modalState);
  const navigation = useNavigation();

  const handleModal = () => {
    dispatch(setProposedOfferedModalAction(false));
  };

  const handleProposedNewOffer = () => {
    navigation.navigate('AddWell', {status: 'offered'});
    dispatch(setProposedOfferedModalAction(false));
  };

  const handleProposedExistOffer = () => {
    navigation.navigate('WellProposer');
    dispatch(setProposedOfferedModalAction(false));
  };

  return (
    <ModalCustom
      show={proprosedOfferedModal}
      setShow={handleModal}
      isCenter={true}>
      <View style={styles.container}>
        <TextVariant
          variant="title3"
          text={'INFORMATION !'}
          textAlign="center"
        />
        <TextVariant
          variant="label"
          text={'Voulez-vous proposer nouvelle\n une offre ?'}
          textAlign="center"
        />

        <View style={styles.buttons}>
          <ButtonGeneral
            text={'Existante'}
            onPress={handleProposedExistOffer}
            btnStyle={styles.btn}
            width="48%"
            backgroundColor={THEME.colors.black}
          />
          <ButtonGeneral
            text={'Nouvelle'}
            onPress={handleProposedNewOffer}
            btnStyle={styles.btn}
            width="48%"
            backgroundColor={THEME.colors.green}
          />
        </View>

        <ButtonGeneral
          text={'Fermer'}
          onPress={handleModal}
          btnStyle={styles.btn}
          width="100%"
          backgroundColor={THEME.colors.primary}
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
    marginTop: wp('3%'),
    height: wp('12%'),
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
