import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Productos.css'; // Asegúrate de importar tu archivo CSS

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/productos');
      setProductos(response.data.productos);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://proyecto.forcewillcode.website/api/productos', nuevoProducto);
      fetchProductos(); // Actualizar la lista después de agregar un nuevo producto
      setNuevoProducto({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/productos/${id}`);
      fetchProductos(); // Actualizar la lista después de eliminar un producto
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModificarProducto = (id) => {
    console.log(`Modificar producto con ID: ${id}`);
  };

  return (
    <div className="productos-container">
      <button className="agregar-categoria-btn" onClick={() => setMostrarFormulario(true)}>Agregar Producto</button>
      <h2>Listado de Productos</h2>
      {error && <div>Error al obtener los productos: {error}</div>}
      <ul className="productos-list">
        {productos.map(producto => (
          <li key={producto.id} className="producto-item">
            <div className="producto-container">{producto.nombre}</div>
            <div className="producto-header">{producto.descripcion}</div>
            <div className="producto-header">{producto.precio}</div>
            <div className="producto-header">{producto.stock}</div>
            <div className="producto-header">{producto.categoria_id}</div>
            <div className="acciones-container">
              <button className="button-space" onClick={() => handleModificarProducto(producto.id)}>Modificar</button>
              <button className="button-space" onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      
      {mostrarFormulario && (
        <div className="formulario-producto-container">
          <h2>Agregar Nuevo Producto</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleInputChange} placeholder="Nombre" required />
            <input type="text" name="descripcion" value={nuevoProducto.descripcion} onChange={handleInputChange} placeholder="Descripción" required />
            <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleInputChange} placeholder="Precio" required />
            <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleInputChange} placeholder="Stock" required />
            <input type="number" name="categoria_id" value={nuevoProducto.categoria_id} onChange={handleInputChange} placeholder="ID de Categoría" required />
            <div className="button-container">
              <button type="submit" className="guardar-producto-btn">Guardar</button>
              <button type="button" className="cancelar-producto-btn" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Productos;
