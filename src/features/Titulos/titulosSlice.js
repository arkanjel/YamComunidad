import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titulos: [],
  isLoading: false,
  errorMessage: null,
};

export const titulosSlice = createSlice({
  name: "titulos",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    setTitulos: (state, action) => {
      state.titulos = action.payload;
      state.isLoading = false;
    },
    addTitulo: (state, action) => {
      state.titulos.push(action.payload);
      state.isLoading = false;
    },
    updateTitulo: (state, action) => {
      state.titulos = state.titulos.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  startLoading,
  setTitulos,
  addTitulo,
  updateTitulo,
  setError,
} = titulosSlice.actions;

export default titulosSlice.reducer;
