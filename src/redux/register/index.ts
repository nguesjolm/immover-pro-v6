import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pageStep: 1,
  name: null,
  email: null,
  tel: null,
  cni: null,
  profil: '',
  identite: 'Agence immobilière agrée',
  zone: null,
  password: null,
  cpassword: null,
};

export const registerState = createSlice({
  name: 'registerState',
  initialState,
  reducers: {
    setPageStepAction: (state, action) => {
      state.pageStep = action.payload;
    },
    setNameAction: (state, action) => {
      state.name = action.payload;
    },
    setEmailAction: (state, action) => {
      state.email = action.payload;
    },
    setTelAction: (state, action) => {
      state.tel = action.payload;
    },
    setCniAction: (state, action) => {
      state.cni = action.payload;
    },
    setProfilAction: (state, action) => {
      state.profil = action.payload;
    },
    setIdentiteAction: (state, action) => {
      state.identite = action.payload;
    },
    setZoneAction: (state, action) => {
      state.zone = action.payload;
    },
    setPasswordAction: (state, action) => {
      state.password = action.payload;
    },
    setCpasswordAction: (state, action) => {
      state.cpassword = action.payload;
    },
    resetRegisterStateAction: () => {
      return initialState;
    },
  },
});

export const {
  setPageStepAction,
  setNameAction,
  setEmailAction,
  setTelAction,
  setCniAction,
  setProfilAction,
  setIdentiteAction,
  setZoneAction,
  setPasswordAction,
  setCpasswordAction,
  resetRegisterStateAction,
} = registerState.actions;

export default registerState.reducer;
