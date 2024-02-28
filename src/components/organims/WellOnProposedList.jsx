import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {PropertyItem} from '../molecules/PropertyItem';
import {useNavigation} from '@react-navigation/native';
import {useWellProposals} from '../../hooks/useWells';
import {country} from '../../styles/main.style';
import {TextVariant} from '../atoms/TextVariant';
import {hp} from '../../assets/utils/helperResponsive';
import {ActivityLoader} from '../atoms/ActivityLoader';

export const WellOnProposedList = ({requestId}) => {
  //
  const navigation = useNavigation();
  const {data, refetch, isLoading} = useWellProposals(requestId);

  const handleDetail = well => {
    navigation.navigate('WellDetails', {well: {id: well?.bien?.id}});
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityLoader />
      ) : data?.demandeData?.length > 0 ? (
        <FlatList
          data={data?.demandeData}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <PropertyItem well={item} onPress={() => handleDetail(item)} />
          )}
          style={styles.flatlist}
          scrollEnabled={true}
          refreshing={refetch}
        />
      ) : (
        <View style={styles.emptyText}>
          <TextVariant variant={'title4'} text={'Aucun bien trouvé'} />
          <TextVariant
            variant={'label'}
            text={`Aucun bien ne correspond à votre recherche.`}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginBottom: country,
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
  emptyText: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: country,
    paddingVertical: hp('20'),
  },
});
