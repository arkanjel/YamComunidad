import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Landing } from "../Pages/landing";
import { LoginPage } from "../Pages/LoginPage";
import { RegistroPage } from "../Pages/RegistroPage";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../components/admin/ProtectedRoute";
import { BeneficiosList } from "../Pages/admin/BeneficiosList";
import { UsuariosList } from "../Pages/admin/UsuariosList";
import { BeneficioForm } from "../Pages/admin/BeneficioForm";
import { UsuarioForm } from "../Pages/admin/UsuarioForm";
import { DevPage } from "../Pages/admin/DevPage";
import { Bienvenida } from "../Pages/Bienvenida";

export const RouterLog = ()=> {

  const { status } = useSelector((state) => state.auth);

  const isAuth = status === "authenticated";

  return (
<>
      {/* 🔹 Navbar visible solo si está autenticado */}
      {/* {isAuth && <Navbar />} */}

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Bienvenidaa/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Página principal */}
        <Route
          path="/"
          element={isAuth ? <Landing /> : <Navigate to="/" />}
        />

        {/* ===========================================================
              RUTAS DE ADMINISTRACIÓN (solo para roles con permisos)
           =========================================================== */}

        {/* Beneficios → admin, superadmin y dev */}
        <Route
          path="/administracion/beneficios"
          element={
            <ProtectedRoute roles={["admin", "superadmin", "dev"]}>
              <BeneficiosList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administracion/beneficios/nuevo"
          element={
            <ProtectedRoute roles={["admin", "superadmin", "dev"]}>
              <BeneficioForm />
            </ProtectedRoute>
          }
        />

        {/* Usuarios → solo superadmin y dev */}
        <Route
          path="/administracion/usuarios"
          element={
            <ProtectedRoute roles={["superadmin", "dev"]}>
              <UsuariosList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administracion/usuarios/nuevo"
          element={
            <ProtectedRoute roles={["superadmin", "dev"]}>
              <UsuarioForm />
            </ProtectedRoute>
          }
        />

        {/* Dev page → solo para dev */}
        <Route
          path="/administracion/dev"
          element={
            <ProtectedRoute roles={["dev"]}>
              <DevPage />
            </ProtectedRoute>
          }
        />

        {/* Cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
</>
  );
};
