import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {RegisterHeader} from '../../../components/headers/RegisterHeader';
import {planet, univers} from '../../../styles/main.style';
import {THEME} from '../../../styles/theme';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';
import {ChooseProfileCard} from '../../../components/organims/ChooseProfileCard';
import {IdentityTypeCard} from '../../../components/organims/IdentityTypeCard';
import {RegisterContactForm} from '../../../components/organims/RegisterContactForm';
import {
  setCommitmentModalAction,
  setErrorModalAction,
  setErrorTextAction,
} from '../../../redux/modals';
import {setPageStepAction} from '../../../redux/register';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pageStep = useSelector(s => s.registerState.pageStep);
  const identity = useSelector(s => s.registerState.identite);
  const file = useSelector(s => s.registerState.cni);
  const name = useSelector(s => s.registerState.name);
  const email = useSelector(s => s.registerState.email);
  const tel = useSelector(s => s.registerState.tel);
  const zone = useSelector(s => s.registerState.zone);
  const password = useSelector(s => s.registerState.password);
  const cpassword = useSelector(s => s.registerState.cpassword);

  const handleValidate = () => {
    // dispatch(setCommitmentModalAction(true));
    navigation.navigate('Commitment');
  };

  const handleNextValid = () => {
    switch (pageStep) {
      case 1:
        if (!identity) {
          dispatch(setErrorModalAction(true));
          dispatch(setErrorTextAction(`Veuillez saisissez votre identité`));
          return;
        } else {
          dispatch(setPageStepAction(pageStep + 1));
        }
        break;
      case 2:
        if (!name || !email || !tel || !zone || !password || !cpassword) {
          dispatch(setErrorModalAction(true));
          dispatch(
            setErrorTextAction(
              `Veuillez saisissez votre nom, email, téléphone, zone, mot de passe et confirmer le mot de passe`,
            ),
          );
          return;
        } else if (password !== cpassword) {
          dispatch(setErrorModalAction(true));
          dispatch(
            setErrorTextAction(
              `Veuillez saisir le même mot de passe et confirmer le mot de passe`,
            ),
          );
          return;
        } else {
          dispatch(setPageStepAction(pageStep + 1));
        }
        break;
      case 3:
        if (!file) {
          dispatch(setErrorModalAction(true));
          dispatch(setErrorTextAction(`Veuillez choisir un profil ImmOver`));
          return;
        } else {
          dispatch(setPageStepAction(pageStep + 1));
        }
        break;
      default:
        break;
    }
    //
  };

  return (
    <View style={styles.container}>
      <RegisterHeader />

      <View style={styles.content}>
        <Fragment>
          {pageStep === 1 && <IdentityTypeCard />}
          {pageStep === 2 && <RegisterContactForm />}
          {pageStep === 3 && <ChooseProfileCard />}
        </Fragment>

        <View style={styles.footer}>
          {pageStep > 1 && pageStep <= 3 && (
            <ButtonGeneral
              text={'Retour'}
              onPress={() => dispatch(setPageStepAction(pageStep - 1))}
              variant={'title3'}
              btnStyle={styles.nextBtn('48%')}
              backgroundColor={THEME.colors.black}
            />
          )}

          {pageStep <= 3 && (
            <ButtonGeneral
              text={pageStep === 3 ? 'Valider' : 'Suivant'}
              variant={'title3'}
              btnStyle={styles.nextBtn(
                pageStep > 1 && pageStep <= 3 ? '48%' : '100%',
              )}
              onPress={pageStep === 3 ? handleValidate : handleNextValid}
              backgroundColor={
                pageStep === 3 ? THEME.colors.green : THEME.colors.primary
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: univers * 1.3,
    paddingHorizontal: univers,
    paddingTop: univers,
    width: '100%',
    alignSelf: 'center',
  },
  identityType: {
    marginBottom: planet,
  },
  nextBtn: width => ({
    marginBottom: univers,
    width: width,
  }),
  footer: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
