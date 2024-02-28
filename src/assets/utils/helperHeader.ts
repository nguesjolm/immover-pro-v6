import {Storage} from '../services/storage.service';

// PRINCIPAL
export const helperHeaderConfig = async (withImage = false) => {
  let token = await Storage.getItem('token');

  if (token) {
    token = JSON.parse(token);
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': withImage ? 'multipart/form-data' : 'application/json',
    };
  }
};
