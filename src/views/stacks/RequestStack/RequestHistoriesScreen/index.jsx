import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { THEME } from '../../../../styles/theme';
import { AppHeader } from '../../../../components/headers/AppHeader';
import { TextVariant } from '../../../../components/atoms/TextVariant';
import { country, planet } from '../../../../styles/main.style';
import { hp, wp } from '../../../../assets/utils/helperResponsive';
import { useNavigation } from '@react-navigation/native';
import { WellItemCard } from '../../../../components/molecules/WellItemCard';
import { useRequests } from '../../../../hooks/useRequests';
import { useFormatedRequests } from '../../../../hooks/useFormatedRequests';
import { useDispatch } from 'react-redux';
import {
  setRequestDetailsAction,
  setRequestSelectedAction,
} from '../../../../redux/requests';
import { setProposedOfferedModalAction } from '../../../../redux/modals';
import { useRefreshData } from '../../../../hooks/useRefreshData';

export const RequestHistoriesScreen = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data, refetch } = useRequests();
  const { allRequestsFormated } = useFormatedRequests(data);
  const { isRefetchingByUser, refetchByUser } = useRefreshData(refetch);

  const handleDetails = (detail) => {
    dispatch(setRequestDetailsAction(detail));
    navigation.navigate('RequestDetails');
  };

  // propose offer
  const handleProposeOffer = (request) => {
    dispatch(setProposedOfferedModalAction(true));
    dispatch(setRequestSelectedAction(request));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader />
      </View>

      <View style={styles.title}>
        <TextVariant
          variant={'title2'}
          textAlign={'center'}
          text={'Historique des demandes'}
          letterSpacing={wp('0.3%')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.historiesList}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
      >
        <View>
          {allRequestsFormated?.length > 0 ? (
            <FlatList
              data={allRequestsFormated}
              renderItem={({ item }) => (
                <>
                  <TextVariant
                    variant={'title4'}
                    text={item?.date}
                    marginLeft={planet}
                  />
                  <FlatList
                    data={item?.data}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <WellItemCard
                        item={item}
                        onPress={() => handleDetails(item)}
                        onPropose={() => handleProposeOffer(item)}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refetching={refetch}
                  />
                </>
              )}
              keyExtractor={(item) => item?.date}
              scrollEnabled={false}
              refreshing={refetch}
            />
          ) : (
            <View style={{ alignItems: 'center', marginTop: hp('10') }}>
              <TextVariant
                variant={'title3'}
                textAlign={'center'}
                text={'Aucune demande trouvée !'}
                letterSpacing={wp('0.3%')}
              />
              <TextVariant
                variant={'label'}
                textAlign={'center'}
                text={'Veuillez créer une demande'}
                letterSpacing={wp('0.3%')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    backgroundColor: THEME.colors.darkLight2,
    paddingHorizontal: country,
    paddingBottom: hp('10'),
  },
  header: {
    height: hp('10'),
  },
  title: {
    marginTop: country,
  },
  historiesList: {
    marginTop: planet,
  },
});
