import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// REGISTER USER
export const registerOfferor = async data => {
  // const headers = await helperHeaderConfig(true);

  try {
    const response = await axios.post(`${BASE_URI}/inscriptionOffreur`, data, {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        //   'multipart/form-data; boundary=<calculated when request is sent>',
        // 'Content-Type': 'multipart/form-data',
        // ...headers,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// LOGIN USER
export const loginOfferor = async data => {
  try {
    const response = await axios.post(`${BASE_URI}/loginOffreur`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// FETCH OFFEROR
export const fetchOfferer = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getOffreurCount`, {headers})
    .catch(error => error.response);

  return response;
};

// UPDATE OFFEROR
export const updateOfferer = async data => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/updateOffreurCount`, data, {
      headers,
    })
    .catch(error => error.response);

  return response;
};

// GENERATE CODE
export const generateOTPCode = async data => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/generateotpOffreur`, data, {
      headers,
    })
    .catch(error => error.response);

  return response;
};

// VERIFY CODE
export const verifyOTPCode = async data => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/chekotpOffreur`, data, {headers})
    .catch(error => error.response);

  return response;
};

// UPDATE PASSWORD

export const updatePassword = async data => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/changepasswordPro`, data, {headers})
    .catch(error => error.response);

  return response;
};

// USER UPDATE CONNEXION

export const userConnectState = async (token: any) => {
  const response = await axios
    .post(
      `${BASE_URI}/userconnectState`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .catch(error => error.response);

  return response;
};
