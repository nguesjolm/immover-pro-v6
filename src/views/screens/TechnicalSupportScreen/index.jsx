import React from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from '../../../styles/theme';
import {country, planet, univers} from '../../../styles/main.style';
import {hp, wp} from '../../../assets/utils/helperResponsive';
import {AppHeader} from '../../../components/headers/AppHeader';
import {TextVariant} from '../../../components/atoms/TextVariant';
import {useNavigation} from '@react-navigation/native';

export const TechnicalSupportScreen = () => {
  //
  const navigation = useNavigation();

  const renderItem = (label, value, separator = true) => (
    <View style={separator ? styles.itemSeparator : styles.item}>
      <TextVariant variant={'label'} text={label} color={THEME.colors.black} />
      <TextVariant variant={'label'} text={value} color={THEME.colors.black} />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title={'SUPPORT TECHNIQUE'}
        titleColor={THEME.colors.black}
        onRigthPress={() =>
          navigation.navigate('OnlineStack', {screen: 'UpdateUser'})
        }
      />

      <View style={styles.infos}>
        {renderItem('Contact', '07 88 89 26 08')}
        {renderItem('WhatsApp', '07 88 89 26 08', false)}
      </View>
    </View>
  );
};

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
    paddingVertical: country,
    paddingHorizontal: country,
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
