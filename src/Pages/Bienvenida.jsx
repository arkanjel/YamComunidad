import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Bienvenida.css";

export const Bienvenida = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  // 🔁 Si el usuario ya tiene token, redirigir automáticamente
  useEffect(() => {
    if (status == "authenticated") {
      navigate("/inicio");
    }
  }, [status, navigate]);

  return (
    <div className="bienvenida-container">
      <div className="bienvenida-overlay">
        <div className="bienvenida-content">
          <h1 className="bienvenida-titulo">Bienvenido a la Comunidad Yam</h1>
          <p className="bienvenida-texto">
            Un espacio para conectar, aprender y potenciar tu gestión de capital humano.
          </p>

          <div className="bienvenida-botones">
            <Link to="/login" className="btn-primario">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="btn-secundario">
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
