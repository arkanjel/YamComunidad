// usuariosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: [],
  isLoading: false,
  errorMessage: null,
};

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    onStartLoading: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    onSetUsuarios: (state, action) => {
      state.isLoading = false;
      state.usuarios = action.payload;
    },
    onAddUsuario: (state, action) => {
      state.isLoading = false;
      state.usuarios.unshift(action.payload);
    },
    onUpdateUsuario: (state, action) => {
      state.isLoading = false;
      state.usuarios = state.usuarios.map((u) =>
        u._id === action.payload._id ? action.payload : u
      );
    },
    onDeleteUsuario: (state, action) => {
      state.isLoading = false;
      state.usuarios = state.usuarios.filter((u) => u._id !== action.payload);
    },
    onError: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  onStartLoading,
  onSetUsuarios,
  onAddUsuario,
  onUpdateUsuario,
  onDeleteUsuario,
  onError,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;