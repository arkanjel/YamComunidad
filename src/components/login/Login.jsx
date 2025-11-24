import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const [remember, setRemember] = useState(false);

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    // Ejecutar el thunk
    const resultAction = await dispatch(loginUser({ correo, contraseña, remember }));
    if (remember) {
      localStorage.setItem("token", resultAction.payload.token);
      localStorage.setItem("user", JSON.stringify(resultAction.payload));
    } else {
      sessionStorage.setItem("token", resultAction.payload.token);
    }
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/inicio"); // Redirige si el login fue exitoso
    }
  };

  return (
    <div className="login-page text-center">
      <div className="form-signin">
        <form onSubmit={loginWithEmailAndPassword}>
          <img
            className="mb-4 logo"
            src="/assets/logo/logo yam nuevo.png"
            alt="Logo"
            width="72"
            height="57"
          />

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder=""
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <label htmlFor="email">Correo</label>
          </div>

          <div className="form-floating mt-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder=""
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Recuérdame
            </label>
          </div>

          <button
            className="w-100 btn btn-lg btn-primary mb-4"
            type="submit"
            disabled={status === "checking"}
          >
            {status === "checking" ? "Ingresando..." : "Iniciar Sesión"}
          </button>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div className="row">
            <div className="col-md-auto">
              <Link to="/registro">
                <p className="text-log-in mb-2">¿No tienes cuenta?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
