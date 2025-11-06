import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddBeneficio,
  startUpdateBeneficio,
  startLoadingBeneficios,
} from "../../features/beneficios/beneficiosThunks";
import { useNavigate, useParams } from "react-router-dom";

export const BeneficioForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // si existe => modo edición
  const { beneficios } = useSelector((state) => state.beneficios);

  const beneficioEdit = beneficios.find((b) => b._id === id);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [masInfo, setMasInfo] = useState(false);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (id && !beneficioEdit) {
      dispatch(startLoadingBeneficios());
    } else if (beneficioEdit) {
      setTitulo(beneficioEdit.titulo);
      setDescripcion(beneficioEdit.descripcion);
      setMasInfo(beneficioEdit.masInfo);
    }
  }, [id, beneficioEdit, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("masInfo", masInfo);
    if (imagen) formData.append("imagen", imagen);

    if (id) {
      dispatch(startUpdateBeneficio(id, formData));
    } else {
      dispatch(startAddBeneficio(formData));
    }

    navigate("/administracion/beneficios");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Beneficio" : "Agregar Beneficio"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={masInfo}
            onChange={(e) => setMasInfo(e.target.checked)}
          />
          <label className="form-check-label">Tiene más información</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {id ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/administracion/beneficios")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
