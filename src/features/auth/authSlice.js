import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // 'checking' | 'authenticated' | 'not-authenticated'
    uid: null,
    nombre: null,
    apellido: null,
    correo: null,
    rol: null,
    token: localStorage.getItem("token") || null,
    errorMessage: null,
  },

  reducers: {
    onCheckingAuth: (state) => {
      state.status = "checking";
      state.errorMessage = null;
    },

    onLoginAuth: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload._id;
      state.nombre = payload.nombre;
      state.apellido = payload.payload.apellido;
      state.correo = payload.correo;
      state.rol = payload.rol;
      state.token = payload.token;
      state.errorMessage = null;

      // Guardar token localmente
      localStorage.setItem("token", payload.token);
    },

    onLogoutAuth: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.nombre = null;
      state.apellido = null;
      state.correo = null;
      state.rol = null;
      state.token = null;
      state.errorMessage = payload?.errorMessage || null;

      // Eliminar token local
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "checking";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.uid = action.payload._id;
        state.nombre = action.payload.nombre;
        state.apellido = action.payload.apellido;
        state.correo = action.payload.correo;
        state.rol = action.payload.rol;
        state.token = action.payload.token;
        state.errorMessage = null;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload || "Error en el login";
      });
  },
});

export const { onCheckingAuth, onLoginAuth, onLogoutAuth } = authSlice.actions;

export default authSlice.reducer;
