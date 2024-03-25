import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ventas.css'; // Asegúrate de importar tu archivo CSS

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente_id: '',
    producto_id: '',
    cantidad: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/ventas');
      setVentas(response.data.ventas);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaVenta({ ...nuevaVenta, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://proyecto.forcewillcode.website/api/ventas', nuevaVenta);
      fetchVentas(); // Actualizar la lista después de agregar una nueva venta
      setNuevaVenta({
        cliente_id: '',
        producto_id: '',
        cantidad: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminarVenta = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/ventas/${id}`);
      fetchVentas(); // Actualizar la lista después de eliminar una venta
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModificarVenta = (id) => {
    console.log(`Modificar venta con ID: ${id}`);
  };

  return (
    <div className="ventas-container">
      <button className="agregar-venta-btn" onClick={() => setMostrarFormulario(true)}>Agregar Venta</button>
      <h2 className="ventas-header">Listado de Ventas</h2>
      {error && <div className="error-message">Error al obtener las ventas: {error}</div>}
      <ul className="ventas-list">
        {ventas.map(venta => (
          <li key={venta.id} className="venta-item">
            <div className="venta-info">ID Cliente: {venta.cliente_id}</div>
            <div className="venta-info">ID Producto: {venta.producto_id}</div>
            <div className="venta-info">Cantidad: {venta.cantidad}</div>
            <div className="venta-info">Fecha Venta: {venta.fecha_venta}</div>
            <div className="venta-info">Total: {venta.total}</div>
            <div className="venta-info">ID Vendedor: {venta.vendedor_id}</div>
            <div className="acciones-container">
              <button className="venta-button" onClick={() => handleModificarVenta(venta.id)}>Modificar</button>
              <button className="venta-button" onClick={() => handleEliminarVenta(venta.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      
      {mostrarFormulario && (
        <div className="formulario-venta-container">
          <h2>Agregar Nueva Venta</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="cliente_id" value={nuevaVenta.cliente_id} onChange={handleInputChange} placeholder="ID del Cliente" required />
            <input type="text" name="producto_id" value={nuevaVenta.producto_id} onChange={handleInputChange} placeholder="ID del Producto" required />
            <input type="number" name="cantidad" value={nuevaVenta.cantidad} onChange={handleInputChange} placeholder="Cantidad" required />
            <div className="button-container">
              <button type="submit" className="guardar-venta-btn">Guardar</button>
              <button type="button" className="cancelar-venta-btn" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Ventas;
