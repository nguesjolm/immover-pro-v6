import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCommitmentModalAction,
  setErrorModalAction,
  setErrorTextAction,
} from '../../../redux/modals';
import {hp, wp} from '../../../assets/utils/helperResponsive';
import {useNavigation} from '@react-navigation/native';
import {registerOfferor} from '../../../assets/api/auth.api';
import {THEME} from '../../../styles/theme';
import {street, univers} from '../../../styles/main.style';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {ButtonGeneral} from '../../../components/atoms/ButtonGeneral';

export const CommitmentScreen = () => {
  //
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const identite = useSelector(s => s.registerState.identite);
  const file = useSelector(s => s.registerState.cni);
  const profil = useSelector(s => s.registerState.profil);
  const name = useSelector(s => s.registerState.name);
  const email = useSelector(s => s.registerState.email);
  const tel = useSelector(s => s.registerState.tel);
  const zone = useSelector(s => s.registerState.zone);
  const password = useSelector(s => s.registerState.password);

  const base64Image = file.data;

  const handleModal = () => {
    navigation.goBack();
  };

  const handleValidate = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('identite', identite);
    formData.append('profil', profil);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('zone', zone);
    formData.append('password', password);
    formData.append('cni', base64Image);

    const payload = {
      identite,
      profil,
      name,
      email,
      tel,
      zone,
      password,
      cni: base64Image,
    };

    const result = await registerOfferor(payload);

    if (result.status === 200) {
      handleModal();
      setLoading(false);
      navigation.navigate('RegisterValidation');
    } else {
      setLoading(false);
      const message = result?.data?.message || result?.data;
      dispatch(setErrorModalAction(true));
      dispatch(setErrorTextAction(message || 'Une erreur est survenue'));
      handleModal();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.pdfContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.title}>
            <TextVariant
              text={'CONVENTION DE COLLABORATION'}
              variant={'title3'}
              textAlign={'center'}
              color={THEME.colors.white}
            />
          </View>
          <TextVariant
            text={'Objet'}
            variant={'title3'}
            textDecorationLine="underline"
          />
          <TextVariant
            text={`ImmOver est une agence immobilière 100% digitale filiale de l'agence immobilière agrée RAD IMMOBILIER (Agent Immobilier agrée par l'Etat suivant arrêté ministériel N°19-0011/MCLU du 29-01-19). La startUp ImmOver met à disposition de ses abonnés une plateforme (Application web et mobile) de mise en relation entre l'offre et la demande dans le secteur de l'immobilier.`}
            variant={'label'}
            marginTop={10}
            marginBottom={10}
          />

          <TextVariant
            text={'Fonctionnement de ImmOver'}
            variant={'title3'}
            textDecorationLine="underline"
            color={THEME.colors.primary}
            marginBottom={10}
          />
          <TextVariant
            text={'Compte ImmOver Pro'}
            variant={'title3'}
            textDecorationLine="underline"
            marginBottom={10}
          />

          <TextVariant
            text={`Le compte ImmOver Pro est une agence immobilière agrée ou non agrée, un agent immobilier, un propriétaire, un aménageur foncier ou un particulier qui possède ou gère un ou plusieurs biens à proposer sur l'application ImmOver.`}
            variant={'label'}
            marginBottom={10}
          />

          <TextVariant
            text={'Compte ImmOver client'}
            variant={'title3'}
            textDecorationLine="underline"
            marginBottom={10}
          />

          <TextVariant
            text={`Le compte ImmOver client est une personne physique ou morale qui est intéressée par un bien immobilier sur l’application et prend un rendez-vous automatique pour le visiter et afin d’effectuer une transaction soit de location ou d’achat`}
            variant={'label'}
            marginBottom={10}
          />

          <TextVariant
            text={'Partage des commissions'}
            variant={'title3'}
            textDecorationLine="underline"
            color={THEME.colors.primary}
            marginBottom={10}
          />
          <TextVariant
            text={'Cas d’une opération de location de bien immobilier'}
            variant={'title3'}
            textDecorationLine="underline"
            marginBottom={10}
          />

          <TextVariant
            text={`Le compte ImmOver Pro perçoit 50% du mois d'Agence.`}
            variant={'label'}
          />
          <TextVariant
            text={`ImmOver bénéficie de 50% du mois d’agence.`}
            variant={'label'}
          />
          <TextVariant
            text={`ImmOver perçoit 100% de la commission en cas de mandat directe.`}
            variant={'label'}
            marginBottom={10}
          />
          <TextVariant
            text={`Cas d’une opération de vente d’un bien immobilier`}
            variant={'title3'}
            textDecorationLine="underline"
            marginBottom={10}
          />
          <TextVariant
            text={`Le compte ImmOver Pro perçoit 50% de la commission.
ImmOver bénéficie de 50% de la commission.
ImmOver perçoit 100% de la commission en cas de mandat directe.`}
            variant={'label'}
            marginBottom={10}
          />
          <TextVariant
            text={'Litige'}
            variant={'title3'}
            textDecorationLine="underline"
            color={THEME.colors.primary}
            marginBottom={10}
          />

          <TextVariant
            text={`Le compte ImmOver Pro s’assure de confier à ImmOver des offres fiables et sécurisés en assumant toute la responsabilité en cas de litige.`}
            variant={'label'}
            marginBottom={10}
          />

          <TextVariant
            text={'ImmOver SARL'}
            variant={'title3'}
            marginTop={30}
            marginBottom={10}
          />
          <TextVariant
            text={`IMMOVER SARL / N°RCCM CI-ABJ-03-2023-B12-00687 /Capital social de 1.000.000 Fcfa`}
            variant={'label2'}
            marginTop={30}
            marginBottom={10}
            textAlign={'center'}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonGeneral
          text={'Accepter et continuer'}
          onPress={handleValidate}
          loading={loading}
          disabled={loading}
        />
        <ButtonGeneral
          text={'Refuser'}
          btnStyle={styles.button}
          backgroundColor="transparent"
          textColor="black"
          onPress={handleModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: THEME.colors.white,
  },
  header: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: wp('3%'),
    borderWidth: 1,
    borderColor: 'black',
  },
  logo: {
    height: wp('17'),
    width: wp('17'),
    resizeMode: 'stretch',
    marginBottom: wp('5%'),
  },
  pdfContainer: {
    flex: 1,
    marginBottom: hp('20%'),
    // backgroundColor: THEME.colors.red,
    // width: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: univers * 1.3,
    paddingHorizontal: univers,
    paddingTop: univers,
  },
  title: {
    backgroundColor: THEME.colors.primary,
    padding: street,
    marginBottom: univers,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: univers,
    paddingBottom: univers,
  },
});
