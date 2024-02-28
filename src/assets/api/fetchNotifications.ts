import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// Fetch Notifications
export const fetchNotifications = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getpush`, {headers})
    .catch(error => error.response);

  return response;
};

// update token
export const updateFCMToken = async ({tokenfcm, id_user}: any) => {
  try {
    const res = await axios.post(`${BASE_URI}/updateTokenFCM`, {
      tokenfcm,
      id_user,
    });
    return {data: res.data, err: false};
  } catch (error) {
    return {data: error, err: true};
  }
};

// get new notifications count
export const getNewNotificationsCount = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getTotalPushByReadState/new`, {headers})
    .catch(error => error.response);

  return response;
};

// update notification status
export const updateNotificationStatus = async (id_push: number | string) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/updateTotalPushByReadState/${id_push}`, {headers})
    .catch(error => error.response);

  return response;
};

// detele notification
export const deleteNotification = async (id_push: number | string) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/deletePush/${id_push}`, {headers})
    .catch(error => error.response);

  return response;
};
