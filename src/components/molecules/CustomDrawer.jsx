import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {THEME} from '../../styles/theme';
import {hp, wp} from '../../assets/utils/helperResponsive';
import {TextVariant} from '../atoms/TextVariant';
import {ButtonGeneral} from '../atoms/ButtonGeneral';
import {useDisconnected} from '../../hooks/useDisconnected';

const CustomDrawer = props => {
  //
  const {handleDisconnected} = useDisconnected();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.topContent}>
        <View style={styles.imageContent}>
          <View style={styles.imageItem}>
            <TextVariant
              variant={'h3'}
              text={'IMMOVER PRO'}
              color={THEME.colors.white}
              textAlign={'center'}
              marginTop={hp('2.8')}
              fontStyle={'italic'}
              letterSpacing={hp('.4')}
            />
            <Image
              source={require('../../assets/images/work.png')}
              style={styles.image}
            />
          </View>
        </View>

        <View style={styles.menu}>
          <DrawerItemList {...props} />
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
  topContent: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
  },
  imageContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.green,
  },
  imageItem: {
    width: wp('100'),
    height: hp('30'),
    backgroundColor: THEME.colors.primary,
  },
  image: {
    width: wp('100'),
    height: hp('30'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: THEME.colors.primary,
    opacity: 0.2,
    position: 'relative',
    bottom: hp('0'),
    resizeMode: 'contain',
  },
  menu: {
    flex: 1,
    backgroundColor: THEME.colors.darkLight2,
  },
  discBtn: {
    width: wp('50'),
    alignSelf: 'center',
    marginTop: hp('5'),
  },
});
