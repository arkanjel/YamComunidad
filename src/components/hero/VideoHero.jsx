import "./VideoHero.css";

export const VideoHero = () => {
  return (
    <video
      id="hero"
      className="hero-video"
      src="/assets/videos/video landing.mp4"
      autoPlay
      muted
      loop
      playsInline
    ></video>
  );
};
