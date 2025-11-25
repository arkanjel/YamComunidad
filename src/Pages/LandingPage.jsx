import { Fondo } from "../components/fondo/FondoA";
import { Footer } from "../components/footer/Footer";
import { Hero } from "../components/hero/Hero";
import { VideoHero } from "../components/hero/VideoHero";
import { LogoCarousel } from "../components/logoCarousel/LogoCarousel";
import { Navbar } from "../components/navBar/Navbar";
import { Servicios } from "../components/Servicios/Servicios";

export const Landing = () => {
  return (
    <>
      <Fondo />
      <Navbar />
      <VideoHero/>
      <Hero />
      <Servicios />
      <LogoCarousel/>
      <Footer/>
    </>
  );
};
