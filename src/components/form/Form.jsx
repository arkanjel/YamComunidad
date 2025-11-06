import "./Form.css";

export const Form = () => {
  return (
    <section className="demo-form-section" id="form">
      <h2 className="demo-title">Solicita tu Demo Gratuita</h2>
      <p className="demo-subtitle">
        Descubre cómo Yam puede transformar la gestión de tu bodega
      </p>

      <form className="demo-form">
        <div className="form-row">
          <div className="form-group">
            <label>Sector*</label>
            <select>
              <option value="">Selecciona un sector</option>
              {/* <option value="vitivinicola">Vitivinícola</option>
              <option value="gastronomia">Gastronomía</option>
              <option value="agro">Agro</option>
              <option value="otro">Otro</option> */}
            </select>
          </div>

          <div className="form-group">
            <label>Empresa*</label>
            <input type="text" placeholder="Nombre de la empresa" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre*</label>
            <input type="text" placeholder="Tu nombre completo" required />
          </div>

          <div className="form-group">
            <label>Cargo*</label>
            <input type="text" placeholder="Tu cargo en la empresa" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Número de empleados*</label>
            <input type="number" placeholder="10" min="1" required />
          </div>

          <div className="form-group">
            <label>Teléfono*</label>
            <input
              type="tel"
              placeholder="+54 9 11 1234-5678"
              pattern="[0-9+ -]+"
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Email*</label>
          <input type="email" placeholder="tu@email.com" required />
        </div>

        <button type="submit" className="demo-button">
          Solicitar Demo Gratuita
        </button>

        <p className="demo-note">
          Al enviar este formulario, aceptas que nos contactemos contigo para
          programar tu demo personalizada.
        </p>
      </form>
    </section>
  );
};
