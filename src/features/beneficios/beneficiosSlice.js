import { createSlice } from "@reduxjs/toolkit";

export const beneficiosSlice = createSlice({
  name: "beneficios",
  initialState: {
    beneficios: [], // lista de beneficios
    isLoading: false,
    errorMessage: null,
  },

  reducers: {
    onStartLoading: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },

    onSetBeneficios: (state, { payload }) => {
      state.isLoading = false;
      state.beneficios = payload; // array de beneficios del backend
    },

    onAddBeneficio: (state, { payload }) => {
      state.isLoading = false;
      state.beneficios.push(payload);
    },

    onUpdateBeneficio: (state, { payload }) => {
      state.isLoading = false;
      state.beneficios = state.beneficios.map((b) =>
        b._id === payload._id ? payload : b
      );
    },

    onDeleteBeneficio: (state, { payload }) => {
      state.isLoading = false;
      state.beneficios = state.beneficios.filter((b) => b._id !== payload);
    },

    onErrorBeneficio: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    onClearBeneficios: (state) => {
      state.beneficios = [];
      state.errorMessage = null;
      state.isLoading = false;
    },
  },
});

export const {
  onStartLoading,
  onSetBeneficios,
  onAddBeneficio,
  onUpdateBeneficio,
  onDeleteBeneficio,
  onErrorBeneficio,
  onClearBeneficios,
} = beneficiosSlice.actions;

export default beneficiosSlice.reducer;
