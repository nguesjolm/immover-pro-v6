import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// Fetch Preferences
export const fetchPreferences = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getOffreurAllPreference`, {headers})
    .catch(error => error.response);

  return response;
};

// Add Preferences
export const addPreferences = async (data: any) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/addPreferenceOffreur`, data, {headers})
    .catch(error => error.response);

  return response;
};

// Preferences by id
export const fetchPreferencesById = async (body: any) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/getOffreurPreferenceID`, body, {headers})
    .catch(error => error.response);

  return response;
};

// Preferences delete
export const deletePreferences = async (id: any) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .delete(`${BASE_URI}/deletePreferenceOffreur/${id}`, {headers})
    .catch(error => error.response);
  return response;
};
