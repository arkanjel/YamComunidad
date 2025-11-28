import { useSelector } from "react-redux";
import "./VideoHero.css";

export const VideoHero = () => {
  const { media } = useSelector((state) => state.siteMedia);
  if (!media?.videoHero) return null;
  // Convertir a embed
  const id = media.videoHero.split("v=")[1]?.split("&")[0];
  const youtubeEmbed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${id}`;

  return (
    <div className="hero-iframe-container" id="hero">
      <div className="video-bg-wrapper-hero">
        <iframe
          src={youtubeEmbed}
          title="Video de bienvenida"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>
    </div>

  );
};
