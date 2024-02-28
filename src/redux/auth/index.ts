import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  offreur: null,
  token: null,
};

export const authState = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOffreur: (state, action) => {
      state.offreur = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetAuth: state => {
      state.user = null;
      state.offreur = null;
      state.token = null;
    },
  },
});

export const {setUser, setToken, setOffreur, resetAuth} = authState.actions;

export default authState.reducer;
