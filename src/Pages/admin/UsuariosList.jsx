import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "./List.css";
import { startLoadingUsuarios, startDeleteUsuario } from "../../features/usuarios/usuariosThunks";

export const UsuariosList = () => {
  const dispatch = useDispatch();
  const { usuarios, isLoading, errorMessage } = useSelector((state) => state.usuarios || { usuarios: [], isLoading: false, errorMessage: null });
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if (!usuarios || usuarios.length === 0) {
      dispatch(startLoadingUsuarios());
    }
  }, [dispatch, usuarios]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtrados = useMemo(() => {
    if (!usuarios) return [];
    return usuarios.filter((u) =>
      (u.nombre || "").toLowerCase().includes(debounced.toLowerCase())
    );
  }, [usuarios, debounced]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / perPage));
  const pageItems = filtrados.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar usuario? Esta acción no se puede deshacer.")) {
      dispatch(startDeleteUsuario(id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="header-actions">
        <h2>Lista de Usuarios</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">Agregar Usuario</Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : errorMessage ? (
        <p className="text-danger">{errorMessage}</p>
      ) : (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((u) => (
                <tr key={u._id}>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                  <td>
                    <Link to={`/admin/usuarios/editar/${u._id}`} className="btn btn-sm btn-secondary me-2">Editar</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            <small>Mostrando {pageItems.length} de {filtrados.length} usuarios</small>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1}>Prev</button>
              <span className="mx-2">Página {page}/{totalPages}</span>
              <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};