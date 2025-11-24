import axios from "axios";
import {
  onStartLoading,
  onSetUsuarios,
  onAddUsuario,
  onUpdateUsuario,
  onDeleteUsuario,
  onError,
} from "./usuariosSlice";

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const API_URL = `${baseUrl}/usuarios`


// 🔹 Cargar todos los usuarios (requiere token)
export const startLoadingUsuarios = () => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());

    const token = getState().auth.token; // ✅ obtenemos el token del slice de auth
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data } = await axios.get(API_URL, config);
      dispatch(onSetUsuarios(data));
    } catch (error) {
      console.error(error);
      dispatch(onError(error.response?.data?.message || "Error al cargar usuarios"));
    }
  };
};

// 🔹 Agregar usuario (no necesita token si es registro público)
export const startAddUsuario = (userData) => {
  return async (dispatch) => {
    dispatch(onStartLoading());
    try {
      const { data } = await axios.post(`${API_URL}/registro`, userData);
      dispatch(onAddUsuario(data));
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(onError(error.response?.data?.message || "Error al crear usuario"));
      return { ok: false };
    }
  };
};

// 🔹 Actualizar usuario (requiere token)
export const startUpdateUsuario = (id, userData) => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());

    const token = getState().auth.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data } = await axios.put(`${API_URL}/${id}`, userData, config);
      dispatch(onUpdateUsuario(data));
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(onError(error.response?.data?.message || "Error al actualizar usuario"));
      return { ok: false };
    }
  };
};

// 🔹 Eliminar usuario (requiere token)
export const startDeleteUsuario = (id) => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());

    const token = getState().auth.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      dispatch(onDeleteUsuario(id));
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(onError(error.response?.data?.message || "Error al eliminar usuario"));
      return { ok: false };
    }
  };
};
