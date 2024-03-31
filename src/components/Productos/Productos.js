import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const [productoAModificar, setProductoAModificar] = useState(null);
  const [ventaActual, setVentaActual] = useState({
    producto_id: null,
    cliente_id: null,
    cantidad: 1,
  });
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);

  useEffect(() => {
    fetchProductos();
    fetchClientes();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/productos');
      setProductos(response.data.productos);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/clientes');
      setClientes(response.data.clientes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleVentaInputChange = (event) => {
    const { name, value } = event.target;
    setVentaActual({ ...ventaActual, [name]: value });
  };

  const handleVentaClick = (producto) => {
    setVentaActual({
      producto_id: producto.id,
      cliente_id: null,
      cantidad: 1,
    });
    setMostrarVentanaEmergente(true);
  };

  const handleFinalizarVenta = (event) => {
    event.preventDefault();
    // Mostrar un mensaje o realizar alguna otra acción deseada
    console.log('Venta realizada (sin consumir la API)');
    console.log('Datos de la venta:', ventaActual);
    setMostrarVentanaEmergente(false);
    alert('Venta realizada con éxito (sin consumir la API)');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://proyecto.forcewillcode.website/api/productos', nuevoProducto);
      fetchProductos();
      setNuevoProducto({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: ''
      });
      setMostrarFormulario(false);
      alert('Producto añadido con éxito');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/productos/${id}`);
      fetchProductos();
      alert('Producto eliminado con éxito');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModificarProducto = async (id) => {
    const producto = productos.find((producto) => producto.id === id);
    if (!producto) {
      setError('Producto no encontrado');
      return;
    }

    setProductoAModificar(producto);
  };

  const handleGuardarModificacion = async (event) => {
    event.preventDefault();
    if (!productoAModificar) {
      setError('No se seleccionó ningún producto para modificar');
      return;
    }

    try {
      await axios.put(`https://proyecto.forcewillcode.website/api/productos/${productoAModificar.id}`, productoAModificar);
      fetchProductos();
      setProductoAModificar(null);
      alert('Producto modificado con éxito');
    } catch (error) {
      setError(`Error al modificar producto: ${error.message}`);
    }
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
              <button className="button-space venta-btn" onClick={() => handleVentaClick(producto)}>Venta</button>
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
      {productoAModificar && (
        <div className="formulario-producto-container">
          <h2>Modificar Producto</h2>
          <form onSubmit={handleGuardarModificacion}>
            <input type="text" name="nombre" value={productoAModificar.nombre} onChange={(event) => setProductoAModificar({ ...productoAModificar, nombre: event.target.value })} placeholder="Nombre" required />
            <input type="text" name="descripcion" value={productoAModificar.descripcion} onChange={(event) => setProductoAModificar({ ...productoAModificar, descripcion: event.target.value })} placeholder="Descripción" required />
            <input type="number" name="precio" value={productoAModificar.precio} onChange={(event) => setProductoAModificar({ ...productoAModificar, precio: event.target.value })} placeholder="Precio" required />
            <input type="number" name="stock" value={productoAModificar.stock} onChange={(event) => setProductoAModificar({ ...productoAModificar, stock: event.target.value })} placeholder="Stock" required />
            <input type="number" name="categoria_id" value={productoAModificar.categoria_id} onChange={(event) => setProductoAModificar({ ...productoAModificar, categoria_id: event.target.value })} placeholder="ID de Categoría" required />
            <div className="button-container">
              <button type="submit" className="guardar-producto-btn">Guardar</button>
              <button type="button" className="cancelar-producto-btn" onClick={() => setProductoAModificar(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
      {mostrarVentanaEmergente && clientes && (
        <div className="ventana-emergente">
          <form onSubmit={handleFinalizarVenta}>
            <select
              name="cliente_id"
              value={ventaActual.cliente_id}
              onChange={handleVentaInputChange}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="cantidad"
              value={ventaActual.cantidad}
              onChange={handleVentaInputChange}
              required
            />
            <button type="submit">Finalizar venta</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Productos;