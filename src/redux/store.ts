import {configureStore} from '@reduxjs/toolkit';
import authState from './auth';
import modalState from './modals';
import registerState from './register';
import requestState from './requests';
import wellState from './wells';
import appointmentsState from './appointments';
import notifState from './notifs';

export const store = configureStore({
  reducer: {
    authState,
    modalState,
    registerState,
    requestState,
    wellState,
    appointmentsState,
    notifState,
  },
  // ✅ Désactiver les middlewares de vérification pour les grandes données
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   serializableCheck: false, // Désactive la vérification de sérialisabilité (pour les images/vidéos)
  //   immutableCheck: false,     // Désactive la vérification d'immutabilité (optionnel)
  // }),

});
