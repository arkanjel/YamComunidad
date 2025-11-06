import { useEffect, useState } from "react";
import axios from "axios";
import "./LogoCarousel.css";

const baseUrl = "http://localhost:4000";

export const LogoCarousel = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/clientes`);
        setClientes(data);
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">
        Bodegas que ya colaboran con nosotros
      </h2>

      <div className="carousel-track">
        {/* Duplicamos para efecto infinito */}
        {clientes.concat(clientes).map((cliente, index) => (
          <div className="carousel-logo" key={index}>
            <img
              src={cliente.logoUrl}
              alt={cliente.nombre}
              title={cliente.nombre}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
