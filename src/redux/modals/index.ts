import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  commitmentModal: false,
  typesOperationModal: false,
  propertyTypesModal: false,
  citiesModal: false,
  errorModal: false,
  successModal: false,
  stateModal: false,
  successText: '',
  errorText: '',
  proprosedOfferedModal: false,
  validatedProprosedModal: false,
  notifPreviewModal: false,
};

export const modalState = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    setCommitmentModalAction: (state, action) => {
      state.commitmentModal = action.payload;
    },
    setTypesOperationModalAction: (state, action) => {
      state.typesOperationModal = action.payload;
    },
    setPropertyTypesModalAction: (state, action) => {
      state.propertyTypesModal = action.payload;
    },
    setErrorModalAction: (state, action) => {
      state.errorModal = action.payload;
    },
    setSuccessModalAction: (state, action) => {
      state.successModal = action.payload;
    },
    setSuccessTextAction: (state, action) => {
      state.successText = action.payload;
    },
    setErrorTextAction: (state, action) => {
      state.errorText = action.payload;
    },
    setCitiesModalAction: (state, action) => {
      state.citiesModal = action.payload;
    },
    setStateModalAction: (state, action) => {
      state.stateModal = action.payload;
    },
    setProposedOfferedModalAction: (state, action) => {
      state.proprosedOfferedModal = action.payload;
    },
    setValidatedProposedModalAction: (state, action) => {
      state.validatedProprosedModal = action.payload;
    },
    setNotifPreviewModalAction: (state, action) => {
      state.notifPreviewModal = action.payload;
    },
  },
});

export const {
  setCommitmentModalAction,
  setTypesOperationModalAction,
  setPropertyTypesModalAction,
  setErrorModalAction,
  setSuccessModalAction,
  setSuccessTextAction,
  setErrorTextAction,
  setCitiesModalAction,
  setStateModalAction,
  setProposedOfferedModalAction,
  setValidatedProposedModalAction,
  setNotifPreviewModalAction,
} = modalState.actions;

export default modalState.reducer;
