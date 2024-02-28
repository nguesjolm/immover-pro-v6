import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MenuIcon from '../../assets/svgs/MenuIcon';
import {planet} from '../../styles/main.style';
import {TextVariant} from '../atoms/TextVariant';
import NotifIcon from '../../assets/svgs/NotifIcon';
import {THEME} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {useNewNotificationsCount} from '../../hooks/useNotifications';

export const DashbordHeader = () => {
  //
  const navigation = useNavigation();
  const {data} = useNewNotificationsCount();

  const handleNotifRedirect = () => {
    navigation.navigate('Home', {screen: 'Notification'});
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MenuIcon />
      </TouchableOpacity>
      <TextVariant
        variant={'h3'}
        text={'IMMOVER PRO'}
        color={THEME.colors.white}
        fontStyle={'italic'}
      />
      <TouchableOpacity onPress={handleNotifRedirect}>
        <NotifIcon />
        {data?.notification !== 0 && (
          <View style={styles.notifBadge}>
            <TextVariant
              variant={'title4'}
              text={data?.notification || '0'}
              color={THEME.colors.white}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: planet,
    paddingTop: planet,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  notifBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: THEME.colors.red,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
