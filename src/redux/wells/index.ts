import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categorySelected: 1,
  categoriesSelected: [],
  statusSelected: 'dispo',
  wellSelected: null,
  wellAddData: {
    operations: null,
    categories_Biens: null,
    pays: {
      id: 1,
      nom: "Côte d'Ivoire",
    },
    villes: null,
    commune_quartiers: 1,
    zone_precise: '',
    longitude: null,
    largitude: null,
    description: null,
    pieces: null,
    loyer: null,
    montant_vente: 0,
    document: '',
    superficie: '',
    images_1: null,
    images_2: null,
    images_3: null,
    images_4: null,
    images_5: null,
    images_6: null,
    images_7: null,
    images_8: null,
    images_9: null,
    video: null,
    images: [],
  },
};

export const wellState = createSlice({
  name: 'wellState',
  initialState,
  reducers: {
    setCategorySelectedAction: (state, action) => {
      state.categorySelected = action.payload;
    },
    setCategoriesSelectedAction: (state, action) => {
      state.categoriesSelected = action.payload;
    },
    setStatusSelectedAction: (state, action) => {
      state.statusSelected = action.payload;
    },
    setWellSelectedAction: (state, action) => {
      state.wellSelected = action.payload;
    },
    setWellAddDataAction: (state, action) => {
      state.wellAddData = action.payload;
    },
    resetWellAddDataAction: state => {
      state.wellAddData = initialState.wellAddData;
    },
  },
});

export const {
  setCategorySelectedAction,
  setCategoriesSelectedAction,
  setStatusSelectedAction,
  setWellSelectedAction,
  setWellAddDataAction,
  resetWellAddDataAction,
} = wellState.actions;

export default wellState.reducer;
