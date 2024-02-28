import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {THEME} from '../../../styles/theme';
import {country, planet} from '../../../styles/main.style';
import {hp, wp} from '../../../assets/utils/helperResponsive';
import {AppHeader} from '../../../components/headers/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {usePreferences} from '../../../hooks/usePreferences';
import {PreferenceItem} from '../../../components/molecules/PreferenceItem';
import {LogoLoader} from '../../../components/atoms/LogoLoader';
import {TextVariant} from '../../../components/atoms/TextVariant';

export const MyPreferences = () => {
  //
  const {data, refetch, isLoading} = usePreferences();
  const navigation = useNavigation();

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title={'MES PREFERENCES'}
        titleColor={THEME.colors.black}
        onRigthPress={() => navigation.navigate('AddPreference')}
        rigthText={'Ajouter'}
        withRigthBtn={true}
      />

      <View style={styles.content}>
        {data?.preference?.length > 0 ? (
          <FlatList
            data={data?.preference || []}
            renderItem={({item}) => <PreferenceItem preference={item} />}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatlist}
            refreshing={refetch}
          />
        ) : (
          <View style={styles.emptyText}>
            <TextVariant
              variant={'title3'}
              text={'Aucune préférence !'}
              color={THEME.colors.black}
              textAlign={'center'}
            />
            <TextVariant
              variant={'label'}
              text={'Ajouter une préférence'}
              color={THEME.colors.black}
              textAlign={'center'}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.darkLight2,
    width: wp('100'),
    paddingHorizontal: country,
  },
  content: {
    paddingVertical: country,
  },
  emptyText: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: hp('20'),
  },
});
