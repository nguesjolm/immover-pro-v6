import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../styles/theme';
import {SelectInput} from '../atoms/SelectInput';
import {country, planet} from '../../styles/main.style';
import {useDispatch, useSelector} from 'react-redux';
import {
  setPropertyTypesModalAction,
  setTypesOperationModalAction,
  setCitiesModalAction,
  setStateModalAction,
} from '../../redux/modals';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {hp} from '../../assets/utils/helperResponsive';
import {InputCustom} from '../atoms/InputCustom';
import {setWellAddDataAction} from '../../redux/wells';

export const AddWellFormStep1 = () => {
  //
  const dispatch = useDispatch();
  const wellAddData = useSelector(s => s.wellState.wellAddData);
  const zonePrecise = useSelector(s => s.wellState.wellAddData.zone_precise);

  const handleChange = value => {
    dispatch(
      setWellAddDataAction({
        ...wellAddData,
        zone_precise: value,
      }),
    );
  };

  return (
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
        <InputCustom
          variant={'title5'}
          label={'Plus de précisions sur la zone'}
          value={zonePrecise}
          color={THEME.colors.black}
          inputStyle={{backgroundColor: THEME.colors.darkLight}}
          onChangeText={text => handleChange(text)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    width: '100%',
    height: hp('100%'),
    paddingVertical: planet,
    marginTop: country,
  },
});
