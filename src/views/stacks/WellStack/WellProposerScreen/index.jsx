import React from 'react';
import {THEME} from '../../../../styles/theme';
import {country} from '../../../../styles/main.style';
import {View, StyleSheet, ScrollView} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {PropertiesItemList} from '../../../../components/organims/PropertiesItemList';
import {useNavigation} from '@react-navigation/native';

export const WellProposerScreen = () => {
  //
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppHeader
        title={'BIENS À PROPOSER'}
        titleColor={THEME.colors.black}
        withLeftBtn={true}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PropertiesItemList proposed={true} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 'auto',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: country,
  },
});
