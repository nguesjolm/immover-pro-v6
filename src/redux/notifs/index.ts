import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notifSelected: null,
};

export const notifState = createSlice({
  name: 'notifState',
  initialState,
  reducers: {
    setNotifSelectedAction: (state, action) => {
      state.notifSelected = action.payload;
    },
  },
});

export const {setNotifSelectedAction} = notifState.actions;

export default notifState.reducer;
