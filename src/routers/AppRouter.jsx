import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRouter } from "./PublicRouter";
import { AdminRouter } from "./AdminRouter";
import { ProtectedRoute } from "../components/admin/ProtectedRoute";
import { Landing } from "../Pages/LandingPage";
import { useEffect } from "react";
import { startLoadingTitulos } from "../features/Titulos/titulosThunks";
import { getSiteMedia } from "../features/siteMedia/sitemediaThunk";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthToken } from "../features/auth/authThunks";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuth = status === "authenticated";
  const dispatch = useDispatch();


  const validarusuario = async () => {
    const resultAction = await dispatch(checkAuthToken());
    console.log("App:", resultAction);
  };

  useEffect(() => {
    dispatch(startLoadingTitulos());
    dispatch(getSiteMedia());
    const token = localStorage.getItem("token");

    if (token) {
      validarusuario();
    }

  }, []);

   // Mientras valida el token
  if (status === "checking") return <div>Cargando...</div>;

  return (
    <Routes>
      {/* Rutas públicas */}

      <Route
        path="/*"
        element={!isAuth ? <PublicRouter /> : <Navigate to="/inicio" />}
      />

      <Route path="/*" element={<PublicRouter />} />

      <Route
        path="/inicio"
        element={
          <ProtectedRoute roles={["usuario", "admin", "superadmin", "dev"]}>
            <Landing />
          </ProtectedRoute>}
      />


      {/* Rutas privadas admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={["admin", "superadmin", "dev"]}>
            <AdminRouter />
          </ProtectedRoute>
        }
      />

      {/* Redirige rutas inválidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
