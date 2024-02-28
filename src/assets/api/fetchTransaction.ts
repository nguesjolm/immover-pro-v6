import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// Fetch transaction balance
export const fetchTransactionBalance = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/soldeTransactionOffreur`, {headers})
    .catch(error => error.response);

  return response;
};

// Fetch total transactions
export const fetchTotalTransactions = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/totalTransactionOffreur`, {headers})
    .catch(error => error.response);
  return response;
};

// Fetch transactions
export const fetchTransactions = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/listeTransactionOffreur`, {
      headers,
    })
    .catch(error => error.response);

  return response;
};
