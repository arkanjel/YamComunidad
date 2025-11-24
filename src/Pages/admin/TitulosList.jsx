// TitlesList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoadingTitulos } from "../../features/Titulos/titulosThunks";
import "./List.css";

export const TitulosList = () => {
  const dispatch = useDispatch();
  const { titulos, isLoading, errorMessage } = useSelector(
    (state) => state.titulos
  );

  useEffect(() => {
    if (!titulos || titulos.length === 0) {
      dispatch(startLoadingTitulos());
    }
  }, [dispatch, titulos]);

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Lista de Títulos</h2>
        <Link to="/admin/titulos/nuevo" className="btn-primary">
          Agregar Título
        </Link>
      </div>

      {isLoading ? (
        <p className="text-center">Cargando...</p>
      ) : errorMessage ? (
        <p className="text-danger">{errorMessage}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Título</th>
              <th>Texto 1</th>
              <th>Texto 2</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {titulos.map((p) => (
              <tr key={p._id}>
                <td data-label="Nombre">{p.nombre}</td>
                <td data-label="Título">{p.titulo}</td>
                <td data-label="Texto 1" className="text-truncate" style={{ maxWidth: 250 }}>
                  {p.texto1}
                </td>
                <td data-label="Texto 2" className="text-truncate" style={{ maxWidth: 250 }}>
                  {p.texto2 || "-"}
                </td>
                <td data-label="Acciones">
                  <Link
                    to={`/admin/titulos/editar/${p._id}`}
                    className="btn-sm btn-warning"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
