import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  statusSelected: 'waiting',
};

export const appointmentsState = createSlice({
  name: 'appointmentsState',
  initialState,
  reducers: {
    setStatusSelectedAction: (state, action) => {
      state.statusSelected = action.payload;
    },
  },
});

export const {setStatusSelectedAction} = appointmentsState.actions;

export default appointmentsState.reducer;
