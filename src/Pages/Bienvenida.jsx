import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Bienvenida.css";
import { startLoadingTitulos } from "../features/Titulos/titulosThunks";
import { VideoBackground } from "../components/VideoBackground/VideoBackground";
import { getSiteMedia } from "../features/siteMedia/sitemediaThunk";

export const Bienvenida = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  


   const dispatch = useDispatch();
  const { titulos } = useSelector(
    (state) => state.titulos
  );
  

  useEffect(() => {
    if (!titulos || titulos.length === 0) {
      dispatch(startLoadingTitulos());
      dispatch(getSiteMedia());
    }
  }, []);

  // 🔹 Obtener desde Redux el título específico
  const tituloBienvenida = useSelector((state) =>
  state.titulos.titulos?.find((t) => t.nombre === "Bienvenida_page")
);
  useEffect(() => {
    if (status === "authenticated") {
      navigate("/inicio");
    }
  }, [status, navigate]);

  return (
    <>
    <VideoBackground/>
    <div className="bienvenida-container">
      <div className="bienvenida-overlay">
        <div className="bienvenida-content">

          {/* 👉 Usa el título desde Redux */}
          {/* <h1 className="bienvenida-titulo">
            {tituloBienvenida?.titulo || "Bienvenido a la Comunidad Yam"}
          </h1> */}

          {/* <p className="bienvenida-texto">
            {tituloBienvenida?.texto1 ||
              "Un espacio para conectar, aprender y potenciar tu gestión de capital humano"}
          </p> */}

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
    </>
  );
};
