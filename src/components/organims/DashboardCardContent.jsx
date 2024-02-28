import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DashboardCardItem} from '../molecules/DashboardCardItem';
import {continent} from '../../styles/main.style';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {useNavigation} from '@react-navigation/native';

export const DashboardCardContent = ({newAppointmentLength}) => {
  //
  const navigation = useNavigation();

  const handleNewProperty = () => {
    navigation.navigate('AddWell');
  };

  const handleNewAppointment = () => {
    navigation.navigate('NewAppointment');
  };

  return (
    <View style={styles.cardBox}>
      <View style={styles.container}>
        <DashboardCardItem
          title={'Ajouter un bien'}
          withImage
          value={'10'}
          onPress={handleNewProperty}
        />
        <DashboardCardItem
          title={'Nouveaux rendez-vous'}
          value={newAppointmentLength || '0'}
          onPress={handleNewAppointment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: continent,
    width: wp('100'),
  },
  cardBox: {
    marginTop: hp('-12%'),
  },
});
