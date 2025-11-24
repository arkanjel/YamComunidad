import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingBeneficios } from "../../features/beneficios/beneficiosThunks";
import { BeneficioCards } from "./BeneficioCards";
import "./Servicios.css";

export const Servicios = () => {
  const dispatch = useDispatch();
  const { beneficios, isLoading, errorMessage } = useSelector(
    (state) => state.beneficios
  );
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  // Cargar beneficios al montar si aún no están
  useEffect(() => {
    if (!beneficios || beneficios.length === 0) {
      dispatch(startLoadingBeneficios());
    }
  }, [dispatch, beneficios]);

  const handleCardClick = (benefit) => {
    if (benefit.masInfo || benefit.texto || benefit.detalle) {
      setSelectedBenefit(benefit);
    }
  };

  // 🔹 Obtener desde Redux el título específico
  const BeneficioHeader = useSelector((state) =>
    state.titulos.titulos?.find((t) => t.nombre === "Beneficios_header")
  );
  // 🔹 Obtener desde Redux el título específico
  const Beneficiofooter = useSelector((state) =>
    state.titulos.titulos?.find((t) => t.nombre === "Beneficios_footer")
  );

  const handleCloseModal = () => setSelectedBenefit(null);

  if (isLoading) return <p className="loading">Cargando beneficios...</p>;
  if (errorMessage) return <p className="error">{errorMessage}</p>;

  return (
    <section className="servicios" id="beneficios">
      <div className="section-header">
        <span className="badge">Nuestros beneficios</span>
        <div className="comunidad">
          <h2>{BeneficioHeader?.titulo || "¿Por qué sumarte a la Comunidad Yam?."}</h2>
          <p>
            {BeneficioHeader?.texto1 || "Formar parte de esta comunidad significa mucho más que usar un software. Encontrarás un ecosistema de aprendizaje, networking y herramientas que potencian tu gestión de capital humano.."}
          </p>
        </div>

        {/* Contenedor de tarjetas */}
     <BeneficioCards beneficios={beneficios} onSelect={handleCardClick} />

      </div>

      <div className="comunidad">
        <h2> {Beneficiofooter?.titulo  ||"Yam + Comunidad = Más valor para vos"}</h2>
        <p>
          {Beneficiofooter?.texto1  ||"El software Yam ya te ayuda a optimizar procesos y tomar decisiones con datos en tiempo real. La comunidad le suma formación, conexión y herramientas, para que tu empresa siempre esté un paso adelante."}
        </p>
      </div>

      {/* Modal con imagen del backend */}
      {selectedBenefit && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita cierre al hacer clic dentro
          >
            <button className="close-btn" onClick={handleCloseModal}>
              ×
            </button>
            <div className="modal-body">
              {selectedBenefit.imagen && (
                <img
                  src={
                    selectedBenefit.imagen.startsWith("http")
                      ? selectedBenefit.imagen
                      : `${baseUrl}/uploads/${selectedBenefit.imagen}`
                  }
                  alt={selectedBenefit.titulo}
                />
              )}
              <div className="modal-text">
                <h3>{selectedBenefit.titulo}</h3>
                <p>{selectedBenefit.descripcion}</p>
                {selectedBenefit.texto && (
                  <p className="detalle">{selectedBenefit.texto}</p>
                )}
                <a
                  className="btn-whatsapp"
                  target="_blank"
                  href={`https://wa.me/5491122334455?text=Hola!%20Estoy%20interesado%20en%20el%20beneficio:%20${encodeURIComponent(
                    selectedBenefit.titulo
                  )}`}
                >
                  Consultar por WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
