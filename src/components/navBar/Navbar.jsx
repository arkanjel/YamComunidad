import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onLogoutAuth } from "../../features/auth/authSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nombre, apellido, rol } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Scroll suave a una sección
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(onLogoutAuth());
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src="/assets/logo/logo yam nuevo.png"
          alt="Logo Yam"
          className="navbar-logo"
        />
        <div className="navbar-title">
          <h1>Yam Capital Humano</h1>
          <span>Comunidad RRHH</span>
        </div>
      </div>

      <nav className="navbar-center">
        <ul>
          <li>
            <button className="navbar-btn" onClick={() => handleScroll("hero")}>Inicio</button>
          </li>
          <li>
            <button className="navbar-btn" onClick={() => handleScroll("beneficios")}>
              Beneficios
            </button>
          </li>
          <li>
            <button className="navbar-btn" onClick={() => handleScroll("contacto")}>Contacto</button>
          </li>
        </ul>
      </nav>

      <div className="navbar-right">
        <div className="user-menu" ref={menuRef}>
          <button
            className="btn-login user-name"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {nombre + " " + apellido || "Usuario"}
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <ul>
                {(rol === "admin" || rol === "superadmin" || rol === "dev") && (
                  <li>
                    <Link to="/admin">Administración</Link>
                  </li>
                )}
                <li>
                  <button className="logout" onClick={onLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
