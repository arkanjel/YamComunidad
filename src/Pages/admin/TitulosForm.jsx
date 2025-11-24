// TitleForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddTitulo,
  startUpdateTitulo,
  startLoadingTitulos,
} from "../../features/Titulos/titulosThunks";
import { useNavigate, useParams } from "react-router-dom";

export const TitulosForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { titulos } = useSelector((state) => state.titulos);
  const paginaEdit = titulos.find((p) => p._id === id);

  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto1, setTexto1] = useState("");
  const [texto2, setTexto2] = useState("");

  useEffect(() => {
    if (id && !paginaEdit) {
      dispatch(startLoadingTitulos());
    } else if (paginaEdit) {
      setNombre(paginaEdit.nombre);
      setTitulo(paginaEdit.titulo);
      setTexto1(paginaEdit.texto1);
      setTexto2(paginaEdit.texto2 || "");
    }
  }, [id, paginaEdit, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nombre, titulo, texto1, texto2 };

    if (id) dispatch(startUpdateTitulo(id, data));
    else dispatch(startAddTitulo(data));

    navigate("/admin/titulos");
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Título" : "Agregar Título"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Texto 1</label>
          <textarea
            className="form-control"
            value={texto1}
            onChange={(e) => setTexto1(e.target.value)}
            required
          />
        </div>

        {id && texto2 !== undefined && (
          <div className="mb-3">
            <label>Texto 2 (opcional)</label>
            <textarea
              className="form-control"
              value={texto2}
              onChange={(e) => setTexto2(e.target.value)}
            />
          </div>
        )}

        <button type="submit" className="btn-primary">
          {id ? "Actualizar" : "Crear"}
        </button>

        <button
          type="button"
          className="btn-sm btn-danger"
          style={{ marginLeft: "1rem" }}
          onClick={() => navigate("/admin/titulos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
