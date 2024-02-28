import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {city, country} from '../../../../styles/main.style';
import {ButtonGeneral} from '../../../../components/atoms/ButtonGeneral';
import {usePreferencesById} from '../../../../hooks/usePreferences';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';
import {deletePreferences} from '../../../../assets/api/fetchPreferences.api';
import {useQueryClient} from 'react-query';

export const PreferenceDetailScreen = ({route}) => {
  //
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {data, isLoading} = usePreferencesById(route?.params?.id);
  const [loading, setLoading] = React.useState(false);

  const renderItem = (label, value, separator = true) => (
    <View style={separator ? styles.itemSeparator : styles.item}>
      <TextVariant
        marginRight={wp('5')}
        variant={'title5'}
        text={label}
        color={THEME.colors.black}
      />
      <TextVariant variant={'label'} text={value} color={THEME.colors.black} />
    </View>
  );

  const handleDelete = async () => {
    setLoading(true);
    const res = await deletePreferences(route?.params?.id);

    if (res?.status === 200) {
      queryClient.invalidateQueries('preferences');
      queryClient.invalidateQueries('requests');
      navigation.goBack();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title={'DÉTAILS DE LA PREFERENCE'}
        titleColor={THEME.colors.black}
        withLeftBtn={true}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentCard}>
        <View style={styles.title}>
          <TextVariant
            variant={'title4'}
            text={`Ref:  ${data?.preference?.id}`}
            textAlign={'center'}
            color={THEME.colors.green}
          />
        </View>

        <View style={styles.content}>
          {renderItem('Opération :', data?.preference?.operations)}
          {renderItem('Bien :', data?.preference?.categoriesBiens)}
          {renderItem('Pays :', data?.preference?.pays)}
          {renderItem('Ville :', data?.preference?.ville)}
          {renderItem(
            'Commune :',
            data?.preference?.communeQuartier || 'N/A',
            false,
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonGeneral
          width={'100%'}
          btnStyle={styles.button}
          backgroundColor={THEME.colors.red}
          text={'Supprimer'}
          variant={'title5'}
          onPress={handleDelete}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: country,
  },
  contentCard: {
    backgroundColor: THEME.colors.white,
    marginBottom: hp('6'),
  },
  title: {},
  content: {
    backgroundColor: THEME.colors.darkLight,
    borderRadius: wp('3'),
    marginTop: wp('3'),
    padding: wp('3'),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: city,
  },
  itemSeparator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: city,
    borderBottomColor: THEME.colors.gray,
  },
  description: {
    paddingVertical: city,
    width: '100%',
    height: hp('20'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    marginVertical: country,
    height: hp('5'),
    borderRadius: wp('1.55'),
  },
  locationCard: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: city,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.gray,
    width: '100%',
  },
  locationItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: city,
    width: '100%',
    backgroundColor: THEME.colors.white,
    marginVertical: wp('2'),
    padding: city,
    borderRadius: 23,
  },
});
