import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

import './DetallesVentas.css'; // Importa el archivo CSS

const DetalleVentas= () => {
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://proyecto.forcewillcode.website/api/detalle-ventas');
        setDetalles(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setDetalles([]); // Si hay un error, establecer los detalles como un array vacío
      }
    }
    fetchData();
  }, []);

  const handlePrintPDF = () => {
    if (Array.isArray(detalles) && detalles.length > 0) {
      const doc = new jsPDF();
      let yPos = 10;

      doc.setFontSize(14);
      doc.text('Reporte de Compras', 10, yPos);
      yPos += 10;

      detalles.forEach((detalle, index) => {
        Object.entries(detalle).forEach(([key, value]) => {
          doc.setFontSize(12);
          doc.text(`${key}: ${value}`, 10, yPos);
          yPos += 10;
        });
        if (index !== detalles.length - 1) {
          yPos += 10; // Espacio entre cada detalle
        }
      });

      // Guardar el PDF y descargarlo
      doc.save('reporte_ventas.pdf');
    } else {
      console.error('No hay detalles de compra disponibles para imprimir');
    }
  };

  return (
    <div className="report-container-v">
      <h2>Reporte de Ventas</h2>
      <div className="detalle-container">
        {detalles.length > 0 ? (
          detalles.map((detalle, index) => (
            <div key={index} className="detalle-item">
              <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
              <p><strong>Precio Unitario:</strong> {detalle.precio_unitario}</p>
              <p><strong>Subtotal:</strong> {detalle.subtotal}</p>
              <p><strong>Venta ID:</strong> {detalle.venta_id}</p>
              <p><strong>Producto ID:</strong> {detalle.producto_id}</p>
            </div>
          ))
        ) : (
          <p>No hay detalles de compra disponibles</p>
        )}
      </div>
      <div className="button-container">
        <button onClick={handlePrintPDF}>Imprimir PDF</button>
      </div>
    </div>
  );
};

export default DetalleVentas;