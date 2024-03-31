import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ventas.scss';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null);
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [selectedVentaId, setSelectedVentaId] = useState(null);

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

  const fetchDetalleVentas = async (ventaId) => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/detalle-ventas/${ventaId}');
      setDetalleVentas(response.data.detalleVentas);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDetalleVenta = async (ventaId) => {
    setSelectedVentaId(ventaId);
    await fetchDetalleVentas(ventaId);
  };

  return (
    <div className="ventas-container">
      <h2>Listado de Ventas</h2>
      {error && <div className="error-message">Error al obtener las ventas: {error}</div>}
      <ul className="ventas-list">
        {ventas.map(venta => (
          <li key={venta.id} className="venta-item">
            <div>ID Cliente: {venta.cliente_id}</div>
            <div>ID Producto: {venta.producto_id}</div>
            <div>Cantidad: {venta.cantidad}</div>
            <div>Fecha Venta: {venta.fecha_venta}</div>
            <div>Total: {venta.total}</div>
            <div>ID Vendedor: {venta.vendedor_id}</div>
            <div>
              <button onClick={() => handleDetalleVenta(venta.id)} className="detalle-venta-btn">Detalle</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de detalle de ventas */}
      {selectedVentaId && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedVentaId(null)}>&times;</span>
            <h2>Detalle de la Venta</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {detalleVentas.map(detalle => (
                  <tr key={detalle.id}>
                    <td>{detalle.id}</td>
                    <td>{detalle.producto}</td>
                    <td>{detalle.cantidad}</td>
                    <td>{detalle.precio_unitario}</td>
                    <td>{detalle.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ventas;