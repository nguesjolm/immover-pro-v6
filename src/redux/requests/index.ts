import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  requestsDetails: null,
  requestSelected: null,
};

export const requestState = createSlice({
  name: 'requestState',
  initialState,
  reducers: {
    setRequestDetailsAction: (state, action) => {
      state.requestsDetails = action.payload;
    },
    setRequestSelectedAction: (state, action) => {
      state.requestSelected = action.payload;
    },
  },
});

export const {setRequestDetailsAction, setRequestSelectedAction} =
  requestState.actions;

export default requestState.reducer;
