import {
  startLoading,
  setTitulos,
  addTitulo,
  updateTitulo,
  setError,
} from "./titulosSlice";


const baseUrl = import.meta.env.VITE_BASE_API_URL;
const API_URL = `${baseUrl}/paginas`
// const API_URL = "http://localhost:4000/api/paginas";

export const startLoadingTitulos = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    try {
      const { token } = getState().auth;

      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      dispatch(setTitulos(data));
    } catch (err) {
      dispatch(setError("Error cargando títulos"));
    }
  };
};

export const startAddTitulo = (body) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    try {
      const { token } = getState().auth;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      dispatch(addTitulo(data));
    } catch (err) {
      dispatch(setError("Error creando título"));
    }
  };
};

export const startUpdateTitulo = (id, body) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    try {
      const { token } = getState().auth;

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      dispatch(updateTitulo(data));
    } catch (err) {
      dispatch(setError("Error actualizando título"));
    }
  };
};
