import { Fondo } from "../components/fondo/fondo";
import { Form } from "../components/form/Form";
import { Hero } from "../components/hero/Hero";
import { VideoHero } from "../components/hero/VideoHero";
import { LogoCarousel } from "../components/logoCarousel/LogoCarousel";
import { Navbar } from "../components/navBar/NavBar";
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
      {/* <Form /> */}
    </>
  );
};
