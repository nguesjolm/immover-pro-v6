import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setStateModalAction} from '../../redux/modals';
import {TextVariant} from '../atoms/TextVariant';
import {wp} from '../../assets/utils/helperResponsive';
import {ModalCustom} from './ModalCustom';
import {THEME} from '../../styles/theme';
import {country} from '../../styles/main.style';
import {RadioField} from '../atoms/Radio';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {useWellStates} from '../../hooks/useWells';
import {setWellAddDataAction} from '../../redux/wells';

export const StateModal = () => {
  //
  const dispatch = useDispatch();
  const [typeSelected, setTypeSelected] = React.useState(null);
  const citieSelected = useSelector(s => s.wellState.wellAddData.villes);
  const modal = useSelector(s => s.modalState.stateModal);
  const wellAddData = useSelector(s => s.wellState.wellAddData);
  const {data: states} = useWellStates(citieSelected?.id);

  const handleModal = () => {
    dispatch(setStateModalAction(false));
  };

  const handleValided = () => {
    handleModal(false);
    dispatch(
      setWellAddDataAction({
        ...wellAddData,
        commune_quartiers: typeSelected,
      }),
    );
  };

  return (
    <ModalCustom show={modal} setShow={handleModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextVariant
            text={'Communes / Quartiers'}
            variant={'title3'}
            marginBottom={wp('3')}
          />
        </View>

        <ScrollView
          style={{height: '40%'}}
          showsVerticalScrollIndicator={false}>
          {states?.villes?.map((type, index) => (
            <RadioField
              key={index}
              variant={'label'}
              label={type?.nom}
              active={type?.id === typeSelected?.id}
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
