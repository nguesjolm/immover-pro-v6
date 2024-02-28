import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {THEME} from '../../../../styles/theme';
import {city, country, planet} from '../../../../styles/main.style';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useNotifications} from '../../../../hooks/useNotifications';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';
import DeleteIcon from '../../../../assets/svgs/DeleteIcon';
import OpenEyeIcon from '../../../../assets/svgs/OpenEyeIcon';
import {
  deleteNotification,
  updateNotificationStatus,
} from '../../../../assets/api/fetchNotifications';
import {useQueryClient} from 'react-query';
import {setNotifPreviewModalAction} from '../../../../redux/modals';
import {setNotifSelectedAction} from '../../../../redux/notifs';
import {useOfferer} from '../../../../hooks/useOfferer';

export const NotificationScreen = () => {
  //
  const navigation = useNavigation();
  const {data: offerer, isLoading: offererLoading} = useOfferer();
  const {data, isLoading} = useNotifications();

  if (isLoading || offererLoading) {
    return <LogoLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader withLeftBtn={true} onLeftPress={() => navigation.goBack()} />
      </View>

      <View style={styles.title}>
        <Image
          source={require('../../../../assets/images/profil.png')}
          style={styles.profile}
        />
        <View>
          <TextVariant
            variant={'title3'}
            text={offerer?.user?.name}
            letterSpacing={wp('0.3%')}
            marginLeft={hp('2')}
          />
          <TextVariant
            variant={'label'}
            text={offerer?.user?.email}
            letterSpacing={wp('0.3%')}
            marginLeft={hp('2')}
          />
        </View>
      </View>
      <View style={styles.heading}>
        <TextVariant
          variant={'title3'}
          text={'Notifications'}
          letterSpacing={wp('0.3%')}
        />
      </View>
      {data?.notification?.length > 0 ? (
        <FlatList
          data={data?.notification || []}
          renderItem={({item}) => <NotificationItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextVariant variant={'title4'} text={'Aucune notification'} />
        </View>
      )}
    </View>
  );
};

const NotificationItem = ({item}) => {
  //
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleUpdateNotifState = async () => {
    const res = await updateNotificationStatus(item?.id);

    if (res?.status === 200) {
      dispatch(setNotifPreviewModalAction(true));
      dispatch(setNotifSelectedAction(item));

      queryClient.invalidateQueries('notifications');
      queryClient.invalidateQueries('newNotificationsCount');
    }
  };

  const handleDeleteNotif = async () => {
    const res = await deleteNotification(item?.id);

    if (res?.status === 200) {
      queryClient.invalidateQueries('notifications');
      queryClient.invalidateQueries('newNotificationsCount');
      // dispatch(setSuccessModalAction(true));
      // dispatch(setSuccessTextAction('Notification supprimée !'));
    }
  };

  return (
    <View style={styles.notifItemCard(item?.state)}>
      <View style={styles.notifItem}>
        <Image
          source={
            item?.type === 'demande'
              ? require('../../../../assets/images/new_property.png')
              : item?.type === 'solde'
              ? require('../../../../assets/images/trans.png')
              : item?.type === 'infos'
              ? require('../../../../assets/images/infos.png')
              : require('../../../../assets/images/rdv.png')
          }
          style={styles.image}
        />
        <View style={{width: '90%'}}>
          <TextVariant
            variant={'title5'}
            text={`${item?.type} - ${item?.date}` || ''}
            marginLeft={city}
            textTransform={'uppercase'}
          />
          <TextVariant
            variant={'label'}
            text={item?.message || ''}
            marginLeft={city}
          />
        </View>
      </View>

      <View style={styles.actionBtn}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateNotifState}>
          <OpenEyeIcon color={THEME.colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteNotif}>
          <DeleteIcon color={THEME.colors.red} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    backgroundColor: THEME.colors.darkLight2,
    paddingHorizontal: country,
  },
  header: {
    height: hp('9'),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: planet,
    marginVertical: country,
  },
  historiesList: {
    marginTop: country,
  },
  profile: {
    width: wp('14'),
    height: wp('14'),
  },
  heading: {
    paddingHorizontal: planet,
    backgroundColor: THEME.colors.darkLight,
    paddingVertical: hp('1'),
  },
  notifItemCard: state => ({
    paddingHorizontal: planet,
    backgroundColor:
      state === 'old' ? THEME.colors.white : THEME.colors.redLight,
    paddingVertical: hp('1'),
    marginBottom: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
  },
  image: {
    width: wp('8'),
    height: wp('8'),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '10%',
  },
  button: {
    width: wp('6'),
    height: wp('6'),
    borderRadius: wp('3'),
    backgroundColor: THEME.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp('1.2'),
  },
});
