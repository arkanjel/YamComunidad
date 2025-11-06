import axios from "axios";
import {
  onStartLoading,
  onSetBeneficios,
  onAddBeneficio,
  onUpdateBeneficio,
  onDeleteBeneficio,
  onErrorBeneficio,
} from "./beneficiosSlice";

const API_URL = "http://localhost:4000/api/beneficios";
const UPLOADS_URL = "http://localhost:4000/api/uploads/"; // 📸 ruta base de imágenes

// Función auxiliar para agregar la URL completa a la imagen
const withFullImagePath = (beneficio) => {
  if (beneficio.imagen && !beneficio.imagen.startsWith("http")) {
    return {
      ...beneficio,
      imagen: `${UPLOADS_URL}${beneficio.imagen}`,
    };
  }
  return beneficio;
};

// 🔹 Obtener todos los beneficios (no requiere token)
export const startLoadingBeneficios = () => {
  return async (dispatch) => {
    dispatch(onStartLoading());
    try {
      const { data } = await axios.get(API_URL);
      // 🔧 Agregar la URL completa a cada imagen
      const beneficiosConImagen = data.map(withFullImagePath);
      dispatch(onSetBeneficios(beneficiosConImagen));
    } catch (error) {
      console.error(error);
      dispatch(
        onErrorBeneficio(error.response?.data?.message || "Error al cargar beneficios")
      );
    }
  };
};

// 🔹 Crear beneficio (requiere token)
export const startAddBeneficio = (beneficioData) => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(API_URL, beneficioData, config);
      dispatch(onAddBeneficio(withFullImagePath(data))); // ✅ agrega URL completa
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(
        onErrorBeneficio(error.response?.data?.message || "Error al crear beneficio")
      );
      return { ok: false };
    }
  };
};

// 🔹 Actualizar beneficio (requiere token)
export const startUpdateBeneficio = (id, beneficioData) => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.put(`${API_URL}/${id}`, beneficioData, config);
      dispatch(onUpdateBeneficio(withFullImagePath(data))); // ✅ agrega URL completa
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(
        onErrorBeneficio(error.response?.data?.message || "Error al actualizar beneficio")
      );
      return { ok: false };
    }
  };
};

// 🔹 Eliminar beneficio (requiere token)
export const startDeleteBeneficio = (id) => {
  return async (dispatch, getState) => {
    dispatch(onStartLoading());
    const token = getState().auth.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      dispatch(onDeleteBeneficio(id));
      return { ok: true };
    } catch (error) {
      console.error(error);
      dispatch(
        onErrorBeneficio(error.response?.data?.message || "Error al eliminar beneficio")
      );
      return { ok: false };
    }
  };
};
