import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../../../styles/theme';
import {city, country} from '../../../../styles/main.style';
import {useDispatch, useSelector} from 'react-redux';
import {
  setPropertyTypesModalAction,
  setTypesOperationModalAction,
  setCitiesModalAction,
  setStateModalAction,
  setErrorModalAction,
  setErrorTextAction,
  setSuccessModalAction,
  setSuccessTextAction,
} from '../../../../redux/modals';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputCustom} from '../../../../components/atoms/InputCustom';
import {SelectInput} from '../../../../components/atoms/SelectInput';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {resetWellAddDataAction} from '../../../../redux/wells';
import {ButtonGeneral} from '../../../../components/atoms/ButtonGeneral';
import {useNavigation} from '@react-navigation/native';
import {addPreferences} from '../../../../assets/api/fetchPreferences.api';
import {useQueryClient} from 'react-query';

export const AddPreference = () => {
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const wellAddData = useSelector(s => s.wellState.wellAddData);

  const handleSubmit = async () => {
    setLoading(false);
    const payload = {
      operations: wellAddData?.operations?.id,
      categoriesBiens: wellAddData?.categories_Biens?.id,
      pays: wellAddData?.pays?.id,
      ville: wellAddData?.villes?.id,
      communeQuartier: wellAddData?.commune_quartiers?.id,
      zone_precise: wellAddData?.zone_precise || '',
    };

    const res = await addPreferences(payload);
    if (res?.status === 200) {
      setLoading(false);
      dispatch(resetWellAddDataAction());
      navigation.goBack();
      queryClient.invalidateQueries('preferences');
      queryClient.invalidateQueries('requests');
      dispatch(setSuccessModalAction(true));
      dispatch(setSuccessTextAction('Préférence ajoutée avec succès'));
    } else {
      setLoading(false);
      dispatch(setErrorModalAction(true));
      dispatch(
        setErrorTextAction(
          res?.data?.message || "Erreur lors de l'ajout de la préférence",
        ),
      );
    }
  };

  return (
    <View style={styles.addView}>
      <AppHeader
        title={'AJOUTER UNE PREFERENCE'}
        titleColor={THEME.colors.black}
        withLeftBtn={true}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <SelectInput
            value={wellAddData?.operations?.type_operation}
            label={'Types d’opérations *'}
            onPress={() => dispatch(setTypesOperationModalAction(true))}
          />
          <SelectInput
            value={wellAddData?.categories_Biens?.nom_categorie}
            label={'Types de biens *'}
            onPress={() => dispatch(setPropertyTypesModalAction(true))}
          />
          <SelectInput value={wellAddData?.pays?.nom} label={'Pays *'} />
          <SelectInput
            value={wellAddData?.villes?.nom}
            label={'Villes *'}
            onPress={() => dispatch(setCitiesModalAction(true))}
          />
          <SelectInput
            value={wellAddData?.commune_quartiers?.nom}
            label={'Commune / Quartier *'}
            onPress={() => dispatch(setStateModalAction(true))}
          />
        </View>
      </KeyboardAwareScrollView>
      <ButtonGeneral
        btnStyle={styles.btnStyle}
        text={'SOUMETTRE'}
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addView: {
    flex: 1,
    width: '100%',
    backgroundColor: THEME.colors.white,
    paddingHorizontal: country,
  },
  container: {
    backgroundColor: THEME.colors.white,
    width: '100%',
    marginTop: country,
  },
  btnStyle: {
    width: '100%',
    marginVertical: city,
  },
});
