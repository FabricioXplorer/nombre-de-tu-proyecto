import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categorias.scss';

const showAlert = (message, type) => {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = message;
  alertDiv.classList.add('alert');
  alertDiv.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, 3000);
};

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://proyecto.forcewillcode.website/api/categorias', nuevaCategoria);
      fetchCategorias();
      showAlert('Categoría añadida correctamente', 'success');
      setNuevaCategoria({ nombre: '' });
      setMostrarFormulario(false);
    } catch (error) {
      setError(error.message);
      showAlert('Error al agregar categoría', 'danger');
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/categorias/${id}`);
      fetchCategorias();
      showAlert('Categoría eliminada correctamente', 'success');
    } catch (error) {
      setError(error.message);
      showAlert('Error al eliminar categoría', 'danger');
    }
  };

  const handleModificarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarFormulario(true);
  };

  const handleActualizarCategoria = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://proyecto.forcewillcode.website/api/categorias/${categoriaSeleccionada.id}`, categoriaSeleccionada);
      fetchCategorias();
      showAlert('Categoría actualizada correctamente', 'success');
      setCategoriaSeleccionada(null);
      setMostrarFormulario(false);
    } catch (error) {
      setError(error.message);
      showAlert('Error al actualizar categoría', 'danger');
    }
  };

  return (
    <div className="categorias-container">
      <div className="clientes-header">
        <h2 className="cliente-header">Lista de Categorías</h2>
        <button className="agregar-categoria-btn" onClick={() => setMostrarFormulario(true)}>
          Agregar Categoría
        </button>
      </div>
      <h3 className="cliente-header">Categorías</h3>
      {error && <div>Error al obtener las categorías: {error}</div>}
      <ul className="categorias-list">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="categoria-item">
            <div className="categoria-container">
              <span>{categoria.nombre}</span>
            </div>
            <div className="acciones-container">
              <button className="button-space" onClick={() => handleModificarCategoria(categoria)}>
                Modificar
              </button>
              <button className="button-space" onClick={() => handleEliminarCategoria(categoria.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {mostrarFormulario && (
        <div className="formulario-categoria-container">
          <h2>{categoriaSeleccionada ? 'Modificar Categoría' : 'Agregar Nueva Categoría'}</h2>
          <form onSubmit={categoriaSeleccionada ? handleActualizarCategoria : handleSubmit}>
            <input
              type="text"
              name="nombre"
              value={categoriaSeleccionada ? categoriaSeleccionada.nombre : nuevaCategoria.nombre}
              onChange={
                categoriaSeleccionada
                  ? (event) => setCategoriaSeleccionada({ ...categoriaSeleccionada, nombre: event.target.value })
                  : handleInputChange
              }
              placeholder="Nombre"
              required
            />
            <div className="button-container">
              <button type="submit" className="guardar-categoria-btn">
                {categoriaSeleccionada ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                className="cancelar-categoria-btn"
                onClick={() => {
                  setMostrarFormulario(false);
                  setCategoriaSeleccionada(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Categorias;