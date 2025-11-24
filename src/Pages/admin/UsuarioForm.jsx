// UsuarioForm.jsx (supports crear y editar)
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { startAddUsuario, startUpdateUsuario, startLoadingUsuarios } from "../../features/usuarios/usuariosThunks";

export const UsuarioForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuarios } = useSelector((state) => state.usuarios || { usuarios: [] });

  const usuarioEdit = usuarios.find((u) => u._id === id);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    telefono: "",
    rol: "user",
  });

  useEffect(() => {
    if (id && !usuarioEdit) {
      dispatch(startLoadingUsuarios());
    } else if (usuarioEdit) {
      setFormData({
        nombre: usuarioEdit.nombre || "",
        apellido: usuarioEdit.apellido || "",
        correo: usuarioEdit.correo || "",
        contraseña: "",
        telefono: usuarioEdit.telefono || "",
        rol: usuarioEdit.rol || "user",
      });
    }
  }, [id, usuarioEdit, dispatch]);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

const onSubmit = async (e) => {
  e.preventDefault();

  // Clonamos el formData
  const dataToSend = { ...formData };

  // ❌ Si la contraseña está vacía NO se envía
  if (!dataToSend.contraseña || dataToSend.contraseña.trim() === "") {
    delete dataToSend.contraseña;
  }

  if (id) {
    await dispatch(startUpdateUsuario(id, dataToSend));
  } else {
    await dispatch(startAddUsuario(dataToSend));
  }

  navigate("/admin/usuarios");
};

  return (
    <div className="login-page">
      <main className="form-signin">
        <form onSubmit={onSubmit}>
          <h2 className="mb-3">{id ? "Editar Usuario" : "Agregar Usuario"}</h2>

          <div className="row g-2">
            <div className="col-md">
              <input name="nombre" placeholder="Nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md">
              <input name="apellido" placeholder="Apellido" className="form-control" value={formData.apellido} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-2 mt-2">
            <input name="correo" type="email" placeholder="Correo" className="form-control" value={formData.correo} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <input name="contraseña" type="password" placeholder="Contraseña" className="form-control" value={formData.contraseña} onChange={handleChange} />
            <small className="text-muted">Dejar vacío para no cambiar la contraseña al editar</small>
          </div>

          <div className="mb-2">
            <input name="telefono" placeholder="Teléfono" className="form-control" value={formData.telefono} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <select name="rol" className="form-select" value={formData.rol} onChange={handleChange}>
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Guardar Usuario</button>
        </form>
      </main>
    </div>
  );
};