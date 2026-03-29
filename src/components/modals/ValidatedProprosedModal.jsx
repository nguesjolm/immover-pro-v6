import React from 'react';
import {TextVariant} from '../atoms/TextVariant';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setErrorModalAction,
  setErrorTextAction,
  setSuccessModalAction,
  setSuccessTextAction,
  setValidatedProposedModalAction,
} from '../../redux/modals';
import {THEME} from '../../styles/theme';
import {wp} from '../../assets/utils/helperResponsive';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {ModalCustom} from './ModalCustom';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {sendOfferProposed} from '../../assets/api/fetchRequests';

export const ValidatedProprosedModal = () => {
  //
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {validatedProprosedModal} = useSelector(s => s.modalState);
  const {wellSelected} = useSelector(s => s.wellState);
  const {requestSelected} = useSelector(s => s.requestState);
  const [loading, setLoading] = React.useState(false);

  const handleModal = () => {
    dispatch(setValidatedProposedModalAction(false));
  };

  const handleValidate = async () => {
    setLoading(true);
    const {id} = wellSelected?.details;

    const formData = new FormData();
    formData.append('process', 'existing');
    formData.append('demande_id', requestSelected?.demande_id);
    formData.append('bien_existing', id);

    const response = await sendOfferProposed(formData);

    if (response?.statuscode === 200) {
      dispatch(setValidatedProposedModalAction(false));
      dispatch(setSuccessModalAction(true));
      dispatch(
        setSuccessTextAction(response?.message),
      );
      handleModal();
      navigation.navigate('Home');
      queryClient.invalidateQueries('wells');
    } else {
      dispatch(setErrorModalAction(true));
      dispatch(
        setErrorTextAction(response?.message || 'Une erreur est survenue'),
      );
    }
    setLoading(false);
  };

  return (
    <ModalCustom
      show={validatedProprosedModal}
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
          text={'Voulez-vous vraiment proposer\n cette offre ?'}
          textAlign="center"
        />

        {/* Boutons Oui/Non */}
        <View style={styles.buttonsRow}>
          <ButtonGeneral
            text={'Oui'}
            onPress={handleValidate}
            btnStyle={styles.btn}
            width="48%"
            backgroundColor={THEME.colors.primary}
            loading={loading}
            disabled={loading}
          />
          <ButtonGeneral
            text={'Non'}
            onPress={handleModal}
            btnStyle={styles.btn}
            width="48%"
            backgroundColor={THEME.colors.black}
          />
        </View>

        {/* Bouton Fermer en bas */}
        <ButtonGeneral
          text={'Fermer'}
          onPress={handleModal}
          btnStyle={styles.closeBtn}
          width="100%"
          backgroundColor={THEME.colors.gray}
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
  closeBtn: {
    marginTop: wp('5%'),
    height: wp('12%'),
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: wp('3%'),
  },
});