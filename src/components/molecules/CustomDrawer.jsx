import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { THEME } from '../../styles/theme';
import { hp, wp } from '../../assets/utils/helperResponsive';
import { TextVariant } from '../atoms/TextVariant';
import { ButtonGeneral } from '../atoms/ButtonGeneral';
import { useDisconnected } from '../../hooks/useDisconnected';

const CustomDrawer = (props) => {
  const { handleDisconnected } = useDisconnected();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollView}
      >
        {/* Header avec logo et titre */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TextVariant
              variant={'h3'}
              text={'IMMOVER PRO'}
              color={THEME.colors.white}
              textAlign={'center'}
              marginTop={hp('24')}
              fontStyle={'italic'}
              letterSpacing={hp('.4')}
            />
            <Image
              source={require('../../assets/images/work.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Menu de navigation */}
        <View style={styles.menuContainer}>
          <DrawerItemList 
            {...props} 
            // Personnalisation supplémentaire pour éviter les fonds indésirables
            activeBackgroundColor="transparent"
            inactiveBackgroundColor="transparent"
            labelStyle={styles.drawerLabel}
          />
          
          {/* Bouton déconnexion */}
          <ButtonGeneral
            onPress={handleDisconnected}
            text={'Se déconnecter'}
            btnStyle={styles.discBtn}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary, // Fond principal
  },
  scrollView: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
  },
  header: {
    // backgroundColor: THEME.colors.green,
    borderBottomLeftRadius: hp(2),
    borderBottomRightRadius: hp(2),
    overflow: 'hidden',
  },
  headerContent: {
    width: wp('100'),
    height: hp('30'),
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft:'-68'
  },
  logo: {
    width: wp('80'),
    height: hp('25'),
    position: 'absolute',
    bottom: 0,
    opacity: 0.2,
  },
  menuContainer: {
    flex: 1,
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
  },
  drawerLabel: {
    fontSize: hp(2),
    fontWeight: '500',
    color: THEME.colors.white,
    marginLeft: wp(2),
  },
  discBtn: {
    width: wp('50'),
    alignSelf: 'center',
    marginTop: hp('5'),
    marginBottom: hp(2),
    backgroundColor: THEME.colors.black,
  },
});