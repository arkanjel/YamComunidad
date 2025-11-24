import { createSlice } from "@reduxjs/toolkit";
import { loginUser, checkAuthToken } from "./authThunks";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    uid: null,
    nombre: null,
    apellido: null,
    correo: null,
    rol: null,
    token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
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
      state.apellido = payload.apellido;
      state.correo = payload.correo;
      state.rol = payload.rol;
      state.token = payload.token;
      state.errorMessage = null;
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

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
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

        if (action.payload.remember) {
          localStorage.setItem("token", action.payload.token);
        } else {
          sessionStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "not-authenticated";
        state.errorMessage = action.payload;
      })

      .addCase(checkAuthToken.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.uid = action.payload.user._id;
        state.nombre = action.payload.user.nombre;
        state.apellido = action.payload.user.apellido;
        state.correo = action.payload.user.correo;
        state.rol = action.payload.user.rol;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(checkAuthToken.rejected, (state) => {
        state.status = "not-authenticated";
        state.token = null;

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      });
  },
});

export const { onCheckingAuth, onLoginAuth, onLogoutAuth } = authSlice.actions;

export default authSlice.reducer;
