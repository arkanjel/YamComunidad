import { Fondo } from "../components/fondo/fondo";
import { Login } from "../components/login/Login";

export const LoginPage = ({ setIsAuth }) => {
  return (
    <>
      <Fondo />
      <Login setIsAuth={setIsAuth} />
    </>
  );
};
