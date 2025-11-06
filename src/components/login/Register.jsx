import { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/authThunks";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre,
      apellido,
      correo: email,
      contraseña: password,
      telefono,
      rol: "usuario",
    };

    const result = await dispatch(registerUser(newUser));

    if (result.ok) {
      navigate("/"); // Redirige al home si se registró bien
    } else {
      alert("Error al registrarse, intentá nuevamente.");
    }
  };

  return (
   <div className="login-page">
      <main className="form-signin">
        <form onSubmit={onSubmit}>
          <img
            className="mb-4 logo"
            src="/assets/logo/logo yam nuevo.png"
            alt="Logo Yam"
            width="80"
            height="70"
          />

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
                <label htmlFor="apellido">Apellido</label>
              </div>
            </div>
          </div>

          <div className="form-floating">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Correo</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              id="contraseña"
              className="form-control"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="contraseña">Contraseña</label>
          </div>

          <div className="form-floating">
            <input
              type="tel"
              id="telefono"
              className="form-control"
              placeholder=" "
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <label htmlFor="telefono">Teléfono / Celular</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
            Finalizar Registro
          </button>
        </form>
      </main>
    </div>
  );
};
