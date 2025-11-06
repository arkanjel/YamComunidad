import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const ClienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // si existe => modo edición
  const { token } = useSelector((state) => state.auth);
  const baseUrl = "http://localhost:4000/api/clientes";

  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Si estamos editando, obtener el cliente actual
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch(`${baseUrl}/${id}`);
        const data = await res.json();
        setNombre(data.nombre || "");
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchCliente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      if (logo) formData.append("logo", logo);

      const method = id ? "PUT" : "POST";
      const url = id ? `${baseUrl}/${id}` : baseUrl;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al guardar el cliente");
      }

      navigate("/administracion/clientes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar cliente");

      navigate("/administracion/clientes");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Cliente" : "Agregar Cliente"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Logo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/administracion/clientes")}
        >
          Cancelar
        </button>

        {id && (
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
};
