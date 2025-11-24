import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteMedia, saveSiteMedia } from "../../features/siteMedia/sitemediaThunk";

export default function SiteMediaForm() {
    const dispatch = useDispatch();
    const { media, loading } = useSelector((state) => state.siteMedia);

    const [videoHero, setVideoHero] = useState("");
    const [videoBienvenida, setVideoBienvenida] = useState("");
    const [imagen, setImagen] = useState(null);

    const baseUrl = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        dispatch(getSiteMedia());
    }, [dispatch]);

    useEffect(() => {
        if (media) {
            setVideoHero(media.videoHero || "");
            setVideoBienvenida(media.videoBienvenida || "");
        }
    }, [media]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("videoHero", videoHero);
        formData.append("videoBienvenida", videoBienvenida);
        if (imagen) formData.append("imagen", imagen);

        dispatch(saveSiteMedia(formData));
    };

    return (
        <div className="container">
            <div className="header-actions">
                <h2>Configuración del Sitio</h2>
            </div>

            {loading && <p>Cargando...</p>}

            <form onSubmit={handleSubmit}>
                <label>Video Hero</label>
                <input
                    className="form-control"
                    value={videoHero}
                    onChange={(e) => setVideoHero(e.target.value)}
                    placeholder="URL del video Hero"
                />

                {videoHero && (
                    <iframe
                        width="100%"
                        height="250"
                        style={{ borderRadius: "10px" }}
                        src={`https://www.youtube.com/embed/${videoHero.match(/v=([^&]+)/)?.[1]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                <label>Video Bienvenida</label>
                <input
                    className="form-control"
                    value={videoBienvenida}
                    onChange={(e) => setVideoBienvenida(e.target.value)}
                    placeholder="URL del video de bienvenida"
                />

                {videoBienvenida && (
                    <iframe
                        width="100%"
                        height="250"
                        style={{ borderRadius: "10px" }}
                        src={`https://www.youtube.com/embed/${videoBienvenida.match(/v=([^&]+)/)?.[1]}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {media?.imagen && (
                    <img
                        src={`${baseUrl}/sitemedia/imagen`}
                        alt="Imagen actual"
                        style={{ width: "150px", marginTop: "10px", borderRadius: "10px" }}
                    />
                )}
                <label>Imagen</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.startsWith("image/")) {
                            setImagen(file);
                        } else {
                            alert("Solo se permiten imágenes (jpg, png, webp)");
                        }
                    }}
                />

                <button type="submit" className="btn-primary" style={{ marginTop: "20px" }}>
                    Guardar
                </button>
            </form>
        </div>
    );
}
