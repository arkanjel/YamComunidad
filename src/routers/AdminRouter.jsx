import { Routes, Route, Navigate } from "react-router-dom";
import { BeneficiosList } from "../Pages/admin/BeneficiosList";
import { UsuariosList } from "../Pages/admin/UsuariosList";
import { BeneficioForm } from "../Pages/admin/BeneficioForm";
import { UsuarioForm } from "../Pages/admin/UsuarioForm";
import { DevPage } from "../Pages/admin/DevPage";
import { AdminLayout } from "../components/admin/AdminLayout";
import { ClientesList } from "../Pages/admin/ClienteList";
import { ClienteForm } from "../Pages/admin/ClienteForm";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Beneficios */}
        <Route path="beneficios" element={<BeneficiosList />} />
        <Route path="beneficios/nuevo" element={<BeneficioForm />} />
        <Route path="beneficios/editar/:id" element={<BeneficioForm />} />

        {/* Usuarios */}
        <Route path="usuarios" element={<UsuariosList />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="usuarios/editar/:id" element={<UsuarioForm />} />

        {/* Clientes */}
        <Route path="clientes" element={<ClientesList/>}/>
        <Route path="clientes/nuevo" element={<ClienteForm/>}/>
        <Route path="clientes/editar/:id" element={<ClienteForm/>}/>

        {/* Dev / misc */}
        <Route path="dev" element={<DevPage />} />

        {/* Default */}
        <Route index element={<Navigate to="beneficios" replace />} />
      </Route>
    </Routes>
  );
};