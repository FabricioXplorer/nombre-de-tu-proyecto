import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DetallesVentas.css'; // Asegúrate de importar tu archivo CSS

function DetalleVentas({ ventaId }) {
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetalleVentas();
  }, [ventaId]);

  const fetchDetalleVentas = async () => {
    try {
      const response = await axios.get(`https://proyecto.forcewillcode.website/api/detalle-ventas?venta_id=${ventaId}`);
      setDetalleVentas(response.data.detalleVentas);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="detalle-ventas-container">
      <h2 className="detalle-ventas-header">Detalle de Ventas</h2>
      {error && <div className="error-message">Error al obtener el detalle de ventas: {error}</div>}
      <table className="detalle-ventas-table">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detalleVentas.map(detalleVenta => (
            <tr key={detalleVenta.id} className="detalle-ventas-item">
              <td>{detalleVenta.producto_id}</td>
              <td>{detalleVenta.cantidad}</td>
              <td>{detalleVenta.precio_unitario}</td>
              <td>{detalleVenta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetalleVentas;
