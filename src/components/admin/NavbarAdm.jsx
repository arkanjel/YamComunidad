import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavbarAdm.css";

export const Navbar = () => {
  const { rol } = useSelector((state) => state.auth);

  return (
    <header className="admin-navbar">
      <div className="nav-container">
        <Link className="nav-logo" to="/inicio">
          Panel Yam
        </Link>

        <nav className="nav-links">
          {(rol === "admin" || rol === "superadmin" || rol === "dev") && (
            <Link to="/admin/beneficios" className="nav-item">
              Beneficios
            </Link>
          )}

          {(rol === "admin" || rol === "superadmin" || rol === "dev") && (
            <Link to="/admin/clientes" className="nav-item">
              Clientes
            </Link>
          )}

          {(rol === "superadmin" || rol === "dev") && (
            <Link to="/admin/usuarios" className="nav-item">
              Usuarios
            </Link>
          )}

          {rol === "dev" && (
            <Link to="/admin/dev" className="nav-item">
              Dev
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
