import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingBeneficios } from "../../features/beneficios/beneficiosThunks";
import "./Servicios.css";

export const Servicios = () => {
  const dispatch = useDispatch();
  const { beneficios, isLoading, errorMessage } = useSelector(
    (state) => state.beneficios
  );

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

  const handleCloseModal = () => setSelectedBenefit(null);

  if (isLoading) return <p className="loading">Cargando beneficios...</p>;
  if (errorMessage) return <p className="error">{errorMessage}</p>;

  return (
    <section className="servicios" id="beneficios">
      <div className="section-header">
        <span className="badge">Nuestros beneficios</span>
        <div className="comunidad">
          <h2>¿Por qué sumarte a la Comunidad Yam?</h2>
          <p>
            Formar parte de esta comunidad significa mucho más que usar un
            software. Encontrarás un ecosistema de aprendizaje, networking y
            herramientas que potencian tu gestión de capital humano.
          </p>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="servicios-flex">
          <div className="card-container">
            {beneficios.map((benefit) => (
              <div
                key={benefit._id}
                className={`card ${benefit.masInfo ? "hoverable" : ""}`}
                onClick={() => handleCardClick(benefit)}
              >
                <h3>{benefit.titulo}</h3>
                <p>{benefit.descripcion}</p>

                {benefit.masInfo && (
                  <div className="card-overlay">
                    <p>Más información</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="yamplus">
        <h3>Yam + Comunidad = Más valor para vos</h3>
        <p>
          El software Yam ya te ayuda a optimizar procesos y tomar decisiones
          con datos en tiempo real. La comunidad le suma formación, conexión y
          herramientas, para que tu empresa siempre esté un paso adelante.
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
                      : `http://localhost:4000/api/uploads/${selectedBenefit.imagen}`
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
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
