import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import { useSelector } from "react-redux";

export const ClientesList = () => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const perPage = 8;

  useEffect(() => {
    const loadClientes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/clientes`);
        if (!res.ok) throw new Error("Error al cargar clientes");
        const data = await res.json();
        setClientes(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadClientes();
  }, []);

  // debounce simple
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtrados = useMemo(() => {
    return clientes.filter((c) =>
      c.nombre.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [clientes, debounced]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / perPage));
  const pageItems = filtrados.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este cliente? Esta acción no se puede deshacer."))
      return;
    try {
      const res = await fetch(`${baseUrl}/clientes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      setClientes((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="header-actions">
        <h2>Lista de Clientes</h2>
        <Link to="/admin/clientes/nuevo" className="btn btn-primary">
          Agregar Cliente
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
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
                <th>Logo</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((c) => (
                <tr key={c._id}>
                  <td>
                    {c.logoUrl ? (
                      <img
                        src={c.logoUrl}
                        alt={c.nombre}
                        style={{
                          width: "70px",
                          borderRadius: "6px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src="/assets/img/noimagen.jpg"
                        alt={c.nombre}
                        style={{ width: "70px", borderRadius: "6px" }}
                      />
                    )}
                  </td>
                  <td>{c.nombre}</td>
                  <td>
                    <Link
                      to={`/admin/clientes/editar/${c._id}`}
                      className="btn btn-sm btn-secondary me-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
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
