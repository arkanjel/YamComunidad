import { Fondo } from "../components/fondo/FondoA";
import { Login } from "../components/login/Login";

export const LoginPage = ({ setIsAuth }) => {
  return (
    <>
      <Fondo />
      <Login setIsAuth={setIsAuth} />
    </>
  );
};
