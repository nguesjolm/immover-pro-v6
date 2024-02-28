import React from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {country, planet} from '../../../../styles/main.style';
import {AppointmentsWellItem} from '../../../../components/molecules/AppointmentsWellItem';
import {
  useAppointmentsByStatus,
  useFormatedRdv,
} from '../../../../hooks/useAppointments';
import {RdvFilterList} from '../../../../components/organims/RdvFilterList';
import {useSelector} from 'react-redux';
import {ActivityLoader} from '../../../../components/atoms/ActivityLoader';

export const NewAppointmentsScreen = () => {
  //
  const navigation = useNavigation();
  const status = useSelector(state => state.appointmentsState.statusSelected);
  const {data, isLoading, refetch} = useAppointmentsByStatus(status);
  const {allRdvFormated} = useFormatedRdv(data);

  const handleDetails = well => {
    navigation.navigate('WellDetails', {well: {id: well?.bien?.details?.id}});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader onLeftPress={() => navigation.goBack()} withLeftBtn={true} />
      </View>

      <View style={styles.title}>
        <TextVariant
          variant={'title2'}
          textAlign={'center'}
          text={'Historique des rendez-vous'}
          letterSpacing={wp('0.3%')}
        />
      </View>

      <RdvFilterList />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.historiesList}>
        {isLoading ? (
          <ActivityLoader color={THEME.colors.primary} />
        ) : allRdvFormated?.length > 0 ? (
          <FlatList
            data={allRdvFormated}
            renderItem={({item}) => (
              <>
                <TextVariant variant={'title4'} text={item?.date} />
                <FlatList
                  data={item?.data || []}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <AppointmentsWellItem
                      onPress={() => handleDetails(item)}
                      item={item}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  refetching={refetch}
                />
              </>
            )}
            keyExtractor={item => item?.date}
            scrollEnabled={false}
            refreshing={refetch}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: hp('10')}}>
            <TextVariant
              variant={'title3'}
              textAlign={'center'}
              text={'Aucun rendez-vous trouvé !'}
              letterSpacing={wp('0.3%')}
            />
            <TextVariant
              variant={'label'}
              textAlign={'center'}
              text={'Veuillez réessayer plus tard'}
              letterSpacing={wp('0.3%')}
            />
          </View>
        )}
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
  },
  header: {
    height: hp('10'),
  },
  title: {
    paddingHorizontal: planet,
    marginTop: country,
  },
  historiesList: {},
});
