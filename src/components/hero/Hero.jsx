import { useDispatch, useSelector } from "react-redux";
import "./Hero.css";
import { useEffect } from "react";
import { startLoadingTitulos } from "../../features/Titulos/titulosThunks";


 
export const Hero = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
 const { titulos } = useSelector(
    (state) => state.titulos
  );
      const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const { media } = useSelector((state) => state.siteMedia);
  // 🔹 Obtener desde Redux el título específico
  const HeroText = useSelector((state) =>
    state.titulos.titulos?.find((t) => t.nombre === "hero_content")
  );

 useEffect(() => {
    if (!titulos || titulos.length === 0) {
      dispatch(startLoadingTitulos());
    }
  }, [dispatch,titulos]);


const formatHeroText = (text) => {
  if (!text) return "";

  let formatted = text;

  // Subrayado con -texto-
  formatted = formatted.replace(/-([^][^-]+)-/g, `<span class="hero-underline">$1</span>`);

  // Negrita con ~texto~
  formatted = formatted.replace(/~([^][^~]+)~/g, `<span class="hero-bold">$1</span>`);

  return formatted;
};


  return (
<section className="hero" >
  <div className="hero-container">
    {/* Imagen lateral */}
    <div className="hero-image">
      <img  src={`${baseUrl}/sitemedia/imagen`} alt="Comunidad Yam" />
    </div>

    {/* Texto */}
    <div className="hero-content">
 <h1
  dangerouslySetInnerHTML={{
    __html: formatHeroText(HeroText?.titulo || "hero_content"),
  }}
></h1>
     <hr/>
      <p>
        {HeroText?.texto1 || "Un espacio pensado para que empresas y profesionales de RRHH encuentren acompañamiento, capacitación y beneficios exclusivos."}
      </p>
      <p>
        {HeroText?.texto2 || "Nuestro objetivo es simple: ser tu aliado estratégico en la transformación digital de la gestión de personas."}
      </p>
    </div>
  </div>
</section>

  );
};
