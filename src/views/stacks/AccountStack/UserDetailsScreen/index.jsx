import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {wp} from '../../../../assets/utils/helperResponsive';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {country, univers} from '../../../../styles/main.style';
import {useOfferer} from '../../../../hooks/useOfferer';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';

export default function UserDetailsScreen() {
  //
  const {data, isLoading} = useOfferer();
  const navigation = useNavigation();

  const handleRedirect = () => {
    navigation.navigate('Account', {screen: 'UpdateUser'});
  };

  const renderItem = (label, value, separator = true) => (
    <View style={separator ? styles.itemSeparator : styles.item}>
      <TextVariant variant={'label'} text={label} color={THEME.colors.black} />
      <TextVariant variant={'label'} text={value} color={THEME.colors.black} />
    </View>
  );

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title={'MON COMPTE'}
        titleColor={THEME.colors.black}
        withRigthBtn={true}
        onRigthPress={handleRedirect}
      />
      <View style={styles.infos}>
        {renderItem('Nom et prénoms', data?.user?.name || '')}
        {renderItem('Numéro de téléphone', data?.user?.tel || '')}
        {renderItem('E-mail', data?.user?.email || '')}
        {renderItem('Localisation', data?.offreur?.zone || 'Néant', false)}
      </View>
      <View style={styles.infos}>
        {renderItem('Identité', data?.offreur?.identite || 'Néant')}
        {renderItem('Profil', data?.offreur?.profil || 'Néant', false)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    width: wp('100'),
    paddingHorizontal: country,
  },
  infos: {
    marginTop: univers,
    backgroundColor: THEME.colors.darkLight,
    paddingHorizontal: country,
    paddingVertical: country,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: country * 1.2,
  },
  itemSeparator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: country * 1.2,
    borderBottomColor: THEME.colors.gray,
  },
});
