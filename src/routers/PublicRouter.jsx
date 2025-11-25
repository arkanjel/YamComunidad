import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../Pages/LoginPage";
import { RegistroPage } from "../Pages/RegistroPage";
import { Bienvenida } from "../Pages/Bienvenida";

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Bienvenida />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
