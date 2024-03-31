import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './Movimientos.css'; // Importa el archivo CSS separado

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://proyecto.forcewillcode.website/api/movimientos');
        setMovimientos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setMovimientos([]);
      }
    }
    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    doc.setFontSize(14);
    doc.text('Reporte de Movimientos', 10, yPos);
    yPos += 10;

    movimientos.forEach((movimiento, index) => {
      Object.entries(movimiento).forEach(([key, value]) => {
        doc.setFontSize(12);
        doc.text(`${key}: ${value}`, 10, yPos);
        yPos += 10;
      });
      if (index !== movimientos.length - 1) {
        yPos += 10; // Espacio entre cada movimiento
      }
    });

    // Guardar el PDF y descargarlo
    doc.save('reporte_movimientos.pdf');
  };

  return (
    <div className="report-container">
      <h2>Reporte de Movimientos</h2>
      <div className="movimientos-container">
        {movimientos.length > 0 ? (
          movimientos.map((movimiento, index) => (
            <div key={index} className="movimiento-item">
              <p><strong>Tipo de Movimiento:</strong> {movimiento.tipo_movimiento}</p>
              <p><strong>Concepto:</strong> {movimiento.concepto}</p>
              <p><strong>Fecha de Movimiento:</strong> {movimiento.fecha_movimiento}</p>
              <p><strong>Monto:</strong> {movimiento.monto}</p>
            </div>
          ))
        ) : (
          <p>No hay movimientos disponibles</p>
        )}
      </div>
      <div className="button-container">
        <button onClick={handleDownloadPDF}>Descargar PDF</button>
      </div>
    </div>
  );
};

export default Movimientos;