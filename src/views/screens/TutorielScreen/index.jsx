import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {THEME} from '../../../styles/theme';
import {country, street, univers} from '../../../styles/main.style';
import {AppHeader} from '../../../components/headers/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {TextVariant} from '../../../components/atoms/TextVariant';

export const TutorielScreen = () => {
  //
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppHeader
        title={"CGU (Conditions Générales d'Utilisations)"}
        titleColor={THEME.colors.black}
        onRigthPress={() =>
          navigation.navigate('OnlineStack', {screen: 'UpdateUser'})
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.pdfContainer}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    width: '100%',
    paddingHorizontal: country,
  },
  pdfContainer: {
    flex: 1,
  },
  title: {
    backgroundColor: THEME.colors.primary,
    padding: street,
    marginBottom: univers,
  },
});

export default TutorielScreen;
