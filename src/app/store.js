// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import beneficiosReducer from "../features/beneficios/beneficiosSlice";
import usuariosReducer from "../features/usuarios/usuariosSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    beneficios: beneficiosReducer,
    usuarios: usuariosReducer,
  },
});
