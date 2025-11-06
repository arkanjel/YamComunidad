import { Outlet } from "react-router-dom";
import { Navbar } from "./NavbarAdm"; // tu navbar admin que me mandaste

export const AdminLayout = () => {
  return (
    <>
      <Navbar />  {/* Navbar admin */}
      <main style={{ padding: "20px" }}>
        <Outlet />  {/* Aquí van a renderizarse las rutas hijas */}
      </main>
    </>
  );
};
