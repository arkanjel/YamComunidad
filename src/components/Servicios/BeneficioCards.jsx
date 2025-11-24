import "./Servicios.css";

export const BeneficioCards = ({ beneficios, onSelect }) => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  return (
    <div className="servicios-flex">
      <div className="card-container">
        {beneficios.map((benefit) => (
          <div
            key={benefit._id}
            className="card benefit-card"
            onClick={() => benefit.masInfo && onSelect(benefit)} // Solo abre modal si masInfo = true
          >

            {benefit.imagen && (
              <>
              <img
                className="benefit-img"
                src={
                  benefit.imagen.startsWith("http")
                    ? benefit.imagen
                    : `${baseUrl}/uploads${"/"}${benefit.imagen}`
                }
                alt={benefit.titulo}
              /></>
            )}

            <div className="benefit-info">
              <h3>{benefit.titulo}</h3>
              <p>{benefit.descripcion}</p>
            </div>

            {benefit.masInfo && (
              <div className="overlay-info">Más información</div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};
