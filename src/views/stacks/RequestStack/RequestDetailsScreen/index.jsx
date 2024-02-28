import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {city, country} from '../../../../styles/main.style';
import {ButtonGeneral} from '../../../../components/atoms/ButtonGeneral';
import {useDispatch, useSelector} from 'react-redux';
import {Accordion} from '../../../../components/atoms/Accordion';
import {useWellProposals} from '../../../../hooks/useWells';
import {setProposedOfferedModalAction} from '../../../../redux/modals';
import {setRequestSelectedAction} from '../../../../redux/requests';

export const RequestDetailsScreen = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const requestDetails = useSelector(s => s.requestState.requestsDetails);
  const {data: requestData} = useWellProposals(requestDetails?.demande_id);

  // propose offer
  const handleProposeOffer = request => {
    dispatch(setProposedOfferedModalAction(true));
    dispatch(setRequestSelectedAction(request));
  };

  const renderItem = (label, value, separator = true) => (
    <View style={separator ? styles.itemSeparator : styles.item}>
      <TextVariant
        marginRight={wp('5')}
        variant={'title5'}
        text={label}
        color={THEME.colors.black}
      />
      <TextVariant variant={'label'} text={value} color={THEME.colors.black} />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title={'DÉTAILS'}
        titleColor={THEME.colors.black}
        withLeftBtn={true}
        onLeftPress={() => navigation.goBack()}
        onRigthPress={() => () => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentCard}>
        <View style={styles.title}>
          <TextVariant
            variant={'title4'}
            text={`Ref:  ${requestDetails?.demande_code}`}
            textAlign={'center'}
            color={THEME.colors.green}
          />
        </View>

        <View style={styles.content}>
          {renderItem('Opération :', requestDetails?.operations_name)}
          {renderItem('Bien :', requestDetails?.categoriesBiens_name)}
          <Accordion title={'Lieu :'}>
            <View style={styles.locationCard}>
              {requestDetails?.lieu?.map((item, index) => (
                <View key={index} style={styles.locationItem}>
                  {renderItem('Pays :', "côte d'ivoire", false)}
                  {renderItem('Ville :', item?.ville, false)}
                  {renderItem('Commune :', item?.communequartier, false)}
                  {renderItem('Precision :', item?.precision, false)}
                </View>
              ))}
            </View>
          </Accordion>

          {renderItem('Budget :', `${requestDetails?.budget} Fcfa`)}
          <View style={styles.description}>
            <TextVariant
              marginRight={wp('5')}
              variant={'title5'}
              text={'Description :'}
              color={THEME.colors.black}
            />
            <TextVariant
              variant={'label'}
              text={requestDetails?.description || 'Pas de description'}
              color={THEME.colors.black}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonGeneral
          width={'49%'}
          btnStyle={styles.button}
          backgroundColor={THEME.colors.green}
          text={'Proposer une offre'}
          variant={'title5'}
          onPress={() => handleProposeOffer(requestDetails)}
        />
        <ButtonGeneral
          width={'49%'}
          btnStyle={styles.button}
          backgroundColor={THEME.colors.black}
          text={`Offres proposées : ${requestData?.demandeData?.length || 0}`}
          variant={'title5'}
          onPress={() =>
            navigation.navigate('WellOnProposed', {
              requestId: requestDetails?.demande_id,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: country,
  },
  contentCard: {
    backgroundColor: THEME.colors.white,
    marginBottom: hp('6'),
  },
  title: {},
  content: {
    backgroundColor: THEME.colors.darkLight,
    borderRadius: wp('3'),
    marginTop: wp('3'),
    padding: wp('3'),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: city,
  },
  itemSeparator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: city,
    borderBottomColor: THEME.colors.gray,
  },
  description: {
    paddingVertical: city,
    width: '100%',
    height: hp('20'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: wp('1'),
  },
  button: {
    marginTop: wp('2'),
    height: hp('5'),
    borderRadius: wp('1.55'),
  },
  locationCard: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: city,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.gray,
    width: '100%',
  },
  locationItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: city,
    width: '100%',
    backgroundColor: THEME.colors.white,
    marginVertical: wp('2'),
    padding: city,
    borderRadius: 23,
  },
});
