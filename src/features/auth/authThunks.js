import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { onCheckingAuth, onLoginAuth, onLogoutAuth } from "./authSlice";

// Cambiá por tu endpoint real
const baseUrl = "http://localhost:4000"

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ correo, contraseña }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/usuarios/login`, { correo, contraseña });
      return res.data; // Devuelve { _id, nombre, correo, rol, token }
    } catch (error) {
      const msg = error.response?.data?.message || "Error al iniciar sesión";
      return rejectWithValue(msg);
    }
  }
);
export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await axios.post(`${baseUrl}/api/usuarios/registro`, userData);

      // Guardamos el token
      localStorage.setItem("token", data.token);

      // Actualizamos Redux
      dispatch(
        onLoginAuth({
          uid: data._id,
          email: data.correo,
          nombre: data.nombre,
          apellido: data.apellido,
          role: data.rol,
          token: data.token,
        })
      );

      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(
        onLogoutAuth({
          errorMessage:
            error.response?.data?.message || "Error en el registro",
        })
      );
      return { ok: false };
    }
  };
};