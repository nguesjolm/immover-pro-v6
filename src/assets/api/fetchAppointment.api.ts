import axios from 'axios';
import {BASE_URI} from './app.config';
import {helperHeaderConfig} from '../utils/helperHeader';

// Fetch Preferences by status
export const fetchAppointmentsByStatus = async status => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getOffreurAllRdvState/${status}`, {headers})
    .catch(error => error.response);

  return response;
};
