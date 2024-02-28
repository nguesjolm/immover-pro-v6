import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {THEME} from '../../../../styles/theme';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {country, planet} from '../../../../styles/main.style';
import {InputCustom} from '../../../../components/atoms/InputCustom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ButtonGeneral} from '../../../../components/atoms/ButtonGeneral';
import {useNavigation} from '@react-navigation/native';
import {useOfferer} from '../../../../hooks/useOfferer';
import {useQueryClient} from 'react-query';
import {updateOfferer} from '../../../../assets/api/auth.api';
import {useDispatch} from 'react-redux';
import {
  setErrorModalAction,
  setErrorTextAction,
} from '../../../../redux/modals';

export default function UpdateUserScreen() {
  //
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {data} = useOfferer();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    ...data?.user,
    ...data?.offreur,
    name: data?.user?.name || '',
    tel: data?.user?.tel || '',
    email: data?.user?.email || '',
    zone: data?.offreur?.zone || '',
    identite: data?.offreur?.identite || '',
    profil: data?.offreur?.profil || '',
  });

  // HANDLE UPDATE
  const handleUpdate = async () => {
    setIsLoading(true);

    const res = await updateOfferer(form);
    if (res.status === 200) {
      queryClient.invalidateQueries('offerer');
      setIsLoading(false);
      navigation.goBack();
    } else {
      setIsLoading(false);
      dispatch(setErrorModalAction(true));
      dispatch(
        setErrorTextAction(
          res?.data?.message || 'Erreur lors de la mise à jour',
        ),
      );
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <AppHeader
          title={'MON COMPTE'}
          titleColor={THEME.colors.black}
          withLeftBtn={true}
          onLeftPress={() => navigation.goBack()}
          onRigthPress={() =>
            navigation.navigate('OnlineStack', {screen: 'UpdateUser'})
          }
        />

        <View style={styles.formContent}>
          <View style={styles.form}>
            <InputCustom
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'Nom'}
              placeholder={'Nom'}
              value={form.name}
              onChangeText={text => setForm({...form, name: text})}
            />
            <InputCustom
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'Numéro de téléphone'}
              placeholder={'Numéro de téléphone'}
              value={form.tel}
              onChangeText={text => setForm({...form, tel: text})}
            />
            <InputCustom
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'E-mail'}
              placeholder={'E-mail'}
              value={form.email}
              onChangeText={text => setForm({...form, email: text})}
            />
            <InputCustom
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'Localisation'}
              placeholder={'Localisation'}
              value={form.zone}
              onChangeText={text => setForm({...form, zone: text})}
            />
            <InputCustom
              disabled
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'Profil'}
              placeholder={'Profil'}
              value={form.profil}
              editable={false}
            />
            <InputCustom
              variant={'label'}
              color={THEME.colors.black}
              inputStyle={styles.input}
              label={'Identité'}
              placeholder={'Identité'}
              value={form.identite}
              editable={false}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.formFooter}>
        <ButtonGeneral
          disabled={isLoading}
          loading={isLoading}
          text={'Enregistrer'}
          onPress={handleUpdate}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    height: hp('100%'),
    marginBottom: hp('10'),
    paddingHorizontal: country,
  },
  formContent: {
    height: hp('75.9%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
  },
  form: {
    marginTop: planet,
    width: '100%',
  },
  input: {
    borderWidth: wp('0.3%'),
    borderColor: THEME.colors.gray,
  },
  formFooter: {
    width: wp('90%'),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: hp('2%'),
  },
});
