import "./Hero.css";

export const Hero = () => {
  return (
<section className="hero" >
  <div className="hero-container">
    {/* Imagen lateral */}
    <div className="hero-image">
      <img src="\assets\img\istockphoto-1752533608-640x640.jpg" alt="Comunidad Yam" />
    </div>

    {/* Texto */}
    <div className="hero-content">
      <h1>Bienvenido a la Comunidad Yam Capital Humano</h1>
      <p>
        Un espacio pensado para que empresas y profesionales de RRHH encuentren
        acompañamiento, capacitación y beneficios exclusivos.
      </p>
      <p>
        Nuestro objetivo es simple: ser tu aliado estratégico en la transformación
        digital de la gestión de personas.
      </p>
    </div>
  </div>
</section>

  );
};
