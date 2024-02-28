import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setPropertyTypesModalAction} from '../../redux/modals';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {ModalCustom} from './ModalCustom';
import {THEME} from '../../styles/theme';
import {country} from '../../styles/main.style';
import {RadioField} from '../atoms/Radio';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {useWellTypes} from '../../hooks/useWells';
import {setWellAddDataAction} from '../../redux/wells';
import {ScrollView} from 'react-native-gesture-handler';

export const PropertyTypesModal = () => {
  //
  const dispatch = useDispatch();
  const {data} = useWellTypes();
  const [typeSelected, setTypeSelected] = React.useState(null);
  const modal = useSelector(s => s.modalState.propertyTypesModal);
  const wellAddData = useSelector(s => s.wellState.wellAddData);

  const handleModal = () => {
    dispatch(setPropertyTypesModalAction(false));
  };

  const handleValided = () => {
    dispatch(setPropertyTypesModalAction(false));
    dispatch(
      setWellAddDataAction({...wellAddData, categories_Biens: typeSelected}),
    );
  };

  return (
    <ModalCustom show={modal} setShow={handleModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextVariant
            text={'Types de biens'}
            variant={'title3'}
            marginBottom={wp('3')}
          />
        </View>
        <ScrollView
          style={
            data?.categories?.length > 10 ? {height: '40%'} : {height: 'auto'}
          }
          showsVerticalScrollIndicator={false}>
          {data?.categories?.map((type, index) => (
            <RadioField
              key={index}
              variant={'label'}
              label={type.nom_categorie}
              active={type.id === typeSelected?.id}
              onPress={() => setTypeSelected(type)}
            />
          ))}
        </ScrollView>

        <ButtonGeneral
          text={'Valider la sélection'}
          backgroundColor={THEME.colors.black}
          btnStyle={styles.button}
          onPress={handleValided}
        />
      </View>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('5%'),
    backgroundColor: THEME.colors.white,
    borderRadius: country,
  },
  header: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: wp('3%'),
    height: wp('10%'),
  },
  logo: {
    height: wp('17'),
    width: wp('17'),
    resizeMode: 'stretch',
    marginBottom: wp('5%'),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
});
