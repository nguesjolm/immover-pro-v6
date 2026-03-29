import {View, StyleSheet} from 'react-native';
import React from 'react';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {WellCategoriesList} from '../../../../components/organims/WellCategoriesList';
import {WellAvailableFilterList} from '../../../../components/organims/WellAvailableFilterList';
import {PropertiesItemList} from '../../../../components/organims/PropertiesItemList';
import {country} from '../../../../styles/main.style';

export const WellListsScreen = () => {
  return (
    <View style={styles.container}>
      <AppHeader title={'MES BIENS'} titleColor={THEME.colors.black} />
      <View style={styles.content}>
        <WellCategoriesList />
        <WellAvailableFilterList />
        <PropertiesItemList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: country,
  },
  content: {
    flex: 1,
  },
});