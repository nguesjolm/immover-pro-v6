import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { WellItemCard } from '../molecules/WellItemCard';
import { TextVariant } from '../atoms/TextVariant';
import { hp, wp } from '../../assets/utils/helperResponsive';
import { THEME } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import {
  setRequestDetailsAction,
  setRequestSelectedAction,
} from '../../redux/requests';
import { useDispatch } from 'react-redux';
import { setProposedOfferedModalAction } from '../../redux/modals';

export const NewWellItemList = ({ requests, refetch }) => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Ten first requests
  const newRequestsData = useMemo(() => {
    if (requests?.demandeData) {
      return requests?.demandeData?.slice(0, 10) || [];
    }
  }, [requests?.demandeData]);

  // propose offer
  const handleProposeOffer = (request) => {
    dispatch(setProposedOfferedModalAction(true));
    dispatch(setRequestSelectedAction(request));
  };

  // all requests
  const handleRedirectToAllRequests = () => {
    navigation.navigate('Requests', { screen: 'RequestHistories' });
  };

  const handleDetails = (detail) => {
    dispatch(setRequestDetailsAction(detail));
    navigation.navigate('RequestDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextVariant variant='title3' text='Nouvelles demandes' />
        <TouchableOpacity onPress={handleRedirectToAllRequests}>
          <TextVariant
            variant='title3'
            text='Voir tout'
            color={THEME.colors.primary}
          />
        </TouchableOpacity>
      </View>
      {newRequestsData?.length > 0 ? (
        <FlatList
          data={newRequestsData}
          renderItem={({ item }) => (
            <WellItemCard
              onPropose={() => handleProposeOffer(item)}
              onPress={() => handleDetails(item)}
              item={item}
            />
          )}
          keyExtractor={(item) => item?.demande_id}
          scrollEnabled={false}
          style={styles.contents}
          refreshing={refetch}
        />
      ) : (
        <View style={styles.emptyText}>
          <TextVariant variant='title3' text='Aucune demande actuellement !' />
          <TextVariant variant='label' text='Veuillez réessayer plus tard' />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('1%'),
    marginTop: hp('2%'),
    paddingBottom: hp('10%'),
  },
  title: {
    paddingHorizontal: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  contents: {
    width: wp('100'),
  },
  emptyText: {
    width: wp('100'),
    height: hp('20'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
