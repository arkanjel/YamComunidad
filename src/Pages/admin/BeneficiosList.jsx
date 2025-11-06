import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "./List.css"

import {
  startLoadingBeneficios,
  startDeleteBeneficio,
} from "../../features/beneficios/beneficiosThunks";

export const BeneficiosList = () => {
  const dispatch = useDispatch();
  const { beneficios, isLoading, errorMessage } = useSelector(
    (state) => state.beneficios
  );
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    // solo carga si no hay datos para evitar recargas innecesarias
    if (!beneficios || beneficios.length === 0) {
      dispatch(startLoadingBeneficios());
    }
  }, [dispatch, beneficios]);

  // debounce simple
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtrados = useMemo(() => {
    if (!beneficios) return [];
    return beneficios.filter((b) =>
      b.titulo.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [beneficios, debounced]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / perPage));
  const pageItems = filtrados.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    if (
      window.confirm("¿Eliminar beneficio? Esta acción no se puede deshacer.")
    ) {
      dispatch(startDeleteBeneficio(id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="header-actions">
        <h2>Lista de Beneficios</h2>
        <Link to="/admin/beneficios/nuevo" className="btn btn-primary">
          Agregar Beneficio
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por título..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {isLoading ? (
        <p>Cargando...</p>
      ) : errorMessage ? (
        <p className="text-danger">{errorMessage}</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Más info</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((b) => (
                <tr key={b._id}>
                {b.imagen ? ( 
                  <img src={ b.imagen.startsWith("http") ? 
                    b.imagen
                     : `http://localhost:4000/api/uploads/${b.imagen}`
                     } 
                     alt={b.titulo} /> ) : 
                     ( <img src="/assets/img/noimagen.jpg" alt={b.titulo} />
                      )}

                  <td>{b.titulo}</td>
                  <td className="text-truncate" style={{ maxWidth: 300 }}>
                    {b.descripcion}
                  </td>
                  <td>{b.masInfo ? "Sí" : "No"}</td>
                  <td>
                    <Link
                      to={`/admin/beneficios/editar/${b._id}`}
                      className="btn btn-sm btn-secondary me-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination simple */}
          <div className="d-flex justify-content-between align-items-center">
            <small>
              Mostrando {pageItems.length} de {filtrados.length} resultados
            </small>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="mx-2">
                Página {page}/{totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
