// import messaging from '@react-native-firebase/messaging';
// import {Storage} from '../services/storage.service';

// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     const token = await getFCMToken();
//     return token;
//   }
// };

// const getFCMToken = async () => {
//   const token = await Storage.getItem('fcmToken');

//   if (!token) {
//     try {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log('Your Firebase Token is:', fcmToken);
//         await Storage.setItem('fcmToken', fcmToken);
//       } else {
//         console.log('Failed', 'No token received');
//       }
//     } catch (error) {
//       console.log('An error occurred while retrieving token. ', error);
//     }
//   }

//   return token;
// };

// export const NotificationListener = async () => {
//   // Assume a message-notification contains a "type" property in the data payload of the screen to open
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//   // Foreground state messages
//   messaging().onMessage(async remoteMessage => {
//     console.log('====================================');
//     console.log(remoteMessage);
//     console.log('====================================');
//     console.log('FCM Message Data:', remoteMessage.data);
//   });
// };

import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Storage } from '../services/storage.service';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Demander la permission à l'utilisateur
export const requestUserPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    console.log('Permission accordée!');
    return registerForPushNotificationsAsync();
  } else {
    console.log('Permission refusée.');
    return null;
  }
};

const registerForPushNotificationsAsync = async () => {
  let token = await Storage.getItem('pushToken');

  if (!token) {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      return null;
      // alert("Must use physical device for Push Notifications");
    }

    await Storage.setItem('fcmToken', token.data);
    return token.data;
  }

  return token;
};

// Listen for incoming notifications
export const NotificationListener = async () => {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Received notification', notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Response received', response);
  });
};
