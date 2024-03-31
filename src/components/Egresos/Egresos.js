import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Egresos.css'; // Importa el archivo CSS separado

const Egresos = () => {
  const [egresos, setEgresos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://proyecto.forcewillcode.website/api/egresos');
        setEgresos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setEgresos([]);
      }
    }
    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Encabezado del PDF
    doc.text('Reporte de Egresos', 10, 10);
    
    // Construir tabla para egresos si hay datos
    if (Array.isArray(egresos) && egresos.length > 0) {
      doc.autoTable({
        startY: 20,
        head: [['Fecha de Egreso', 'Concepto', 'Monto']],
        body: egresos.map(egreso => [egreso.fecha_egreso, egreso.concepto, egreso.monto]),
      });
    } else {
      // Si no hay datos, mostrar un mensaje en el PDF
      doc.text('No hay egresos disponibles', 10, 20);
    }

    // Guardar el PDF y descargarlo
    doc.save('reporte_egresos.pdf');
  };

  return (
    <div className="report-container">
      <h2>Reporte de Egresos</h2>
      <div className="egresos-container">
        {egresos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Fecha de Egreso</th>
                <th>Concepto</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {egresos.map((egreso, index) => (
                <tr key={index}>
                  <td>{egreso.fecha_egreso}</td>
                  <td>{egreso.concepto}</td>
                  <td>{egreso.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay egresos disponibles</p>
        )}
      </div>
      <div className="button-container">
        <button onClick={handleDownloadPDF}>Descargar PDF</button>
      </div>
    </div>
  );
};

export default Egresos;