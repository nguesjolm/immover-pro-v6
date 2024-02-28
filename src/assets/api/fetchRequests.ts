import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// Fetch requests
export const fetchRequests = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getOffreurAlldemandes`, {
      headers,
    })
    .catch(error => error.response);

  return response;
};

// Prposer une offre
export const sendOfferProposed = async formData => {
  const headers = await helperHeaderConfig(true);

  const res = await fetch(`${BASE_URI}/sendOffreToDemande`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    body: formData,
  });

  const response = await res.json();
  return response;
};
