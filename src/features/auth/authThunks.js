import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { onCheckingAuth, onLoginAuth, onLogoutAuth } from "./authSlice";
import { FaCcJcb } from "react-icons/fa";

// Cambiá por tu endpoint real
const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ correo, contraseña, remember }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/usuarios/login`, { correo, contraseña });

      return { ...data, remember };
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
      const { data } = await axios.post(`${baseUrl}/usuarios/registro`, userData);

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

export const checkAuthToken = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) return rejectWithValue("No token");

    try {
      const { data } = await axios.get(`${baseUrl}/usuarios/renew`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // localStorage.removeItem("token");

      return {
        user: {
          _id: data._id,
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          rol: data.rol,
        },
        token: data.token,
      };

    } catch (error) {
      return rejectWithValue("Token expirado");
    }
  }
);
