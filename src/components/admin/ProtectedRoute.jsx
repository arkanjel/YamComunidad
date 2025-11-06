import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, roles }) => {
  const { status, rol } = useSelector((state) => state.auth);

  if (status !== "authenticated") return <Navigate to="/login" replace />;

  if (!roles.includes(rol)) return <Navigate to="/" replace />;

  return children;
};
