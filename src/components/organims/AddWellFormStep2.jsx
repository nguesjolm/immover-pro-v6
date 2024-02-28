import {StyleSheet, View} from 'react-native';
import React from 'react';
import {THEME} from '../../styles/theme';
import {country, planet} from '../../styles/main.style';
import {TextVariant} from '../atoms/TextVariant';
import {InputCustom} from '../atoms/InputCustom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {hp} from '../../assets/utils/helperResponsive';
import {useDispatch, useSelector} from 'react-redux';
import {setWellAddDataAction} from '../../redux/wells';

export const AddWellFormStep2 = () => {
  //
  const wellAdd = useSelector(s => s.wellState.wellAddData);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TextVariant
        text={'Informations sur les biens'}
        variant={'title5'}
        marginBottom={planet}
      />

      {wellAdd?.operations?.type_operation?.toUpperCase() === 'LOCATION' && (
        <LocationTypeContent />
      )}

      {wellAdd?.operations?.type_operation?.toUpperCase() !== 'LOCATION' && (
        <SaleTypeWithLandContent
          typeWell={wellAdd?.categories_Biens?.nom_categorie}
        />
      )}

      {/* {wellAdd?.operations?.type_operation?.toUpperCase() === 'VENTE' &&
        wellAdd?.categories_Biens?.nom_categorie?.toUpperCase() !==
          'TERRAIN' && <SaleTypeWithoutLandContent />} */}
    </KeyboardAwareScrollView>
  );
};

const LocationTypeContent = () => {
  const dispatch = useDispatch();
  const wellAdd = useSelector(s => s.wellState.wellAddData);

  const handleChange = (value, type) => {
    dispatch(
      setWellAddDataAction({
        ...wellAdd,
        [type]: value,
      }),
    );
  };

  return (
    <View style={styles.saleContent}>
      <InputCustom
        value={wellAdd?.pieces}
        label={'Nombre de pièces *'}
        keyboardType={'numeric'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={styles.input}
        onChangeText={text => handleChange(text, 'pieces')}
      />
      <InputCustom
        value={wellAdd?.loyer}
        label={'Loyer *'}
        keyboardType={'numeric'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={styles.input}
        onChangeText={text => handleChange(text, 'loyer')}
      />
      <InputCustom
        value={wellAdd?.description}
        label={'Description *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        onChangeText={text => handleChange(text, 'description')}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
};

const SaleTypeWithoutLandContent = () => {
  const dispatch = useDispatch();
  const wellAdd = useSelector(s => s.wellState.wellAddData);

  const handleChange = (value, type) => {
    dispatch(
      setWellAddDataAction({
        ...wellAdd,
        [type]: value,
      }),
    );
  };

  return (
    <View style={styles.saleContent}>
      <InputCustom
        label={'Nombre de pièces *'}
        keyboardType={'numeric'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={styles.input}
        value={wellAdd?.pieces}
        onChangeText={text => handleChange(text, 'pieces')}
      />
      <InputCustom
        label={'Montant de la vente *'}
        keyboardType={'numeric'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={styles.input}
        value={wellAdd?.montant_vente}
        onChangeText={text => handleChange(text, 'montant_vente')}
      />
      <InputCustom
        label={'Superficie *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, textAlignVertical: 'top'}}
        value={wellAdd?.superficie}
        onChangeText={text => handleChange(text, 'superficie')}
      />
      <InputCustom
        label={'Documents *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        value={wellAdd?.document}
        onChangeText={text => handleChange(text, 'document')}
      />
      <InputCustom
        label={'Description *'}
        color={THEME.colors.black}
        variant={'label'}
        value={wellAdd?.description}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        onChangeText={text => handleChange(text, 'description')}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
};

const SaleTypeWithLandContent = ({typeWell}) => {
  const dispatch = useDispatch();
  const wellAdd = useSelector(s => s.wellState.wellAddData);

  const handleChange = (value, type) => {
    dispatch(
      setWellAddDataAction({
        ...wellAdd,
        [type]: value,
      }),
    );
  };

  return (
    <View style={styles.saleContent}>
      <InputCustom
        keyboardType={'numeric'}
        label={'Montant de la vente *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={styles.input}
        value={wellAdd?.montant_vente}
        onChangeText={text => handleChange(text, 'montant_vente')}
      />

      {typeWell !== 'Terrain' && (
        <InputCustom
          value={wellAdd?.pieces}
          label={'Nombre de pièces *'}
          keyboardType={'numeric'}
          color={THEME.colors.black}
          variant={'label'}
          inputStyle={styles.input}
          onChangeText={text => handleChange(text, 'pieces')}
        />
      )}

      <InputCustom
        label={'Superficie *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        value={wellAdd?.superficie}
        onChangeText={text => handleChange(text, 'superficie')}
      />
      <InputCustom
        label={'Documents *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        multiline={true}
        numberOfLines={4}
        value={wellAdd?.document}
        onChangeText={text => handleChange(text, 'document')}
      />
      <InputCustom
        label={'Description *'}
        color={THEME.colors.black}
        variant={'label'}
        inputStyle={{...styles.input, height: 'auto', textAlignVertical: 'top'}}
        value={wellAdd?.description}
        onChangeText={text => handleChange(text, 'description')}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.white,
    width: '100%',
    paddingVertical: planet,
    marginTop: country,
  },
  input: {
    backgroundColor: THEME.colors.white,
    borderWidth: hp('0.1%'),
    borderColor: THEME.colors.gray,
  },
  saleContent: {
    marginBottom: hp('30%'),
  },
});
