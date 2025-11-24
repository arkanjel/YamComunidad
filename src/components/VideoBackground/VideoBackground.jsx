import { useSelector } from "react-redux";
import "./VideoBackground.css";

export const VideoBackground = () => {
  const { media } = useSelector((state) => state.siteMedia);

  if (!media?.videoBienvenida) return null;

  // Convertir a embed
  const id = media.videoBienvenida.split("v=")[1]?.split("&")[0];
  const youtubeEmbed = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${id}`;

  return (
<>
    <div className="video-bg-container">
      <div className="video-bg-wrapper">
        <iframe
          src={youtubeEmbed}
          title="Video de bienvenida"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>

      <div className="video-overlay"></div>
    </div>
    </>
  );
};
