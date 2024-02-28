import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {WellCategoriesItem} from '../molecules/WellCategoriesItem';
import {useWellCategories} from '../../hooks/useWells';

export const WellCategoriesList = () => {
  //
  const {data} = useWellCategories();

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={data?.categories || []}
        renderItem={({item}) => <WellCategoriesItem categorie={item} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
  },
  flatlist: {
    width: '100%',
    height: 'auto',
  },
});
