import { FaLinkedin, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-container">

        <div className="footer-left">
          <img
            src="/assets/logo/logo yam nuevo.png"
            alt="Yam Capital Humano"
            className="footer-logo"
          />
          <p>© {new Date().getFullYear()} Yam Capital Humano – Comunidad RRHH</p>
        </div>

        <div className="footer-right">
          <h4>Seguinos</h4>
          <div className="footer-icons">

            <a href="https://www.linkedin.com/company/80641782/admin/dashboard/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>

            <a href="https://www.instagram.com/yamcapitalhumano/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>

            <a href="https://www.tiktok.com/@yamcapitalhumano" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>

            <a href="https://www.youtube.com/channel/UCItJsjILsD6RaAy3G0ngXhw" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>

            <a href="https://wa.me/5492615524072" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};
