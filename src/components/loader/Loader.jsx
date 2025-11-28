import "./loader.css";
import logo from "/assets/logo/logo yam nuevo.png"; // <-- poné tu logo

export const Loader = () => {
  return (
    <div className="loader-container">
      <img src={logo} className="loader-logo" alt="logo" />
      <div className="loader-spinner"></div>
    </div>
  );
};
