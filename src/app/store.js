// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import beneficiosReducer from "../features/beneficios/beneficiosSlice";
import usuariosReducer from "../features/usuarios/usuariosSlice";
import  titulosReducer  from "../features/Titulos/titulosSlice";
import  sitemediaReducer from "../features/siteMedia/sitemediaSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    beneficios: beneficiosReducer,
    usuarios: usuariosReducer,
    titulos: titulosReducer,
    siteMedia: sitemediaReducer,
  },
});
