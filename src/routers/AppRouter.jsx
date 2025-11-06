import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { PublicRouter } from "./PublicRouter";
import { AdminRouter } from "./AdminRouter";
import { ProtectedRoute } from "../components/admin/ProtectedRoute";

export const AppRouter = () => {
//   const { status } = useSelector((state) => state.auth);
//   const isAuth = status === "authenticated";

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/*" element={<PublicRouter />} />

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
