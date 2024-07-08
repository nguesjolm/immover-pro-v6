import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { PropertyItem } from '../molecules/PropertyItem';
import { useNavigation } from '@react-navigation/native';
import { useFilterWells, useWells } from '../../hooks/useWells';
import { country } from '../../styles/main.style';
import { TextVariant } from '../atoms/TextVariant';
import { hp } from '../../assets/utils/helperResponsive';
import { ActivityLoader } from '../atoms/ActivityLoader';
import { setValidatedProposedModalAction } from '../../redux/modals';
import { useDispatch } from 'react-redux';
import { setWellSelectedAction } from '../../redux/wells';

export const PropertiesItemList = ({ proposed }) => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data, refetch, isLoading } = useWells();
  const { categoriesSelected, statusSelected, wellsFiltered } =
    useFilterWells(data);

  const handleDetail = (well) => {
    if (proposed) {
      dispatch(setValidatedProposedModalAction(true));
      dispatch(setWellSelectedAction(well[0]));
    } else {
      navigation.navigate('WellDetails', { well: { id: well[0]?.id } });
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityLoader />
      ) : wellsFiltered?.length > 0 ? (
        <FlatList
          data={wellsFiltered}
          extraData={{ categoriesSelected, statusSelected }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
    paddingBottom: hp('10'),
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
