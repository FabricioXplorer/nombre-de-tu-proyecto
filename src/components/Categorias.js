import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categorias.css'; // Asegúrate de importar tu archivo CSS

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
    descripcion: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
      fetchCategorias(); // Actualizar la lista después de agregar una nueva categoría
      setNuevaCategoria({
        nombre: '',
        descripcion: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/categorias/${id}`);
      fetchCategorias(); // Actualizar la lista después de eliminar una categoría
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModificarCategoria = (id) => {
    console.log(`Modificar categoría con ID: ${id}`);
  };

  return (
    <div className="categorias-container">
      <div className="clientes-header">
        <h2 className="cliente-header">Lista de Categorías</h2>
        <button className="agregar-cliente-btn" onClick={() => setMostrarFormulario(true)}>Agregar Categoría</button>
      </div>
  
      <h3 className="cliente-header">Categorías</h3>
      {error && <div>Error al obtener las categorías: {error}</div>}
      <ul className="categorias-list">
        {categorias.map(categoria => (
          <li key={categoria.id} className="categoria-item">
            <div className="categoria-container">{categoria.nombre}</div>
            <div className="categoria-header">{categoria.descripcion}</div>
            <div className="acciones-container">
              <button className="button-space" onClick={() => handleModificarCategoria(categoria.id)}>Modificar</button>
              <button className="button-space" onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      
      {mostrarFormulario && (
        <div className="formulario-categoria-container">
          <h2>Agregar Nueva Categoría</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" value={nuevaCategoria.nombre} onChange={handleInputChange} placeholder="Nombre" required />
            
            <div className="button-container">
              <button type="submit" className="guardar-categoria-btn">Guardar</button>
              <button type="button" className="cancelar-categoria-btn" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Categorias;
