import { useEffect, useState } from "react";
import axios from "axios";
import "./LogoCarousel.css";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const LogoCarousel = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/clientes`);
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
        Empresas que ya colaboran con nosotros
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
