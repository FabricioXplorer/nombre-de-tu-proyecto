import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import './Ingresos.css'; // Importa el archivo de estilos CSS

function Ingreso() {
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    axios.get('https://proyecto.forcewillcode.website/api/ingresos')
      .then(response => {
        const ventasData = response.data.ventas;
        setVentas(ventasData);
        
        // Calcular el total de ventas
        const total = ventasData.reduce((acc, venta) => acc + parseFloat(venta.total), 0);
        setTotalVentas(total);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const imprimirPDF = () => {
    const input = document.getElementById('print-container');
    html2pdf().from(input).save();
  };

  return (
    <div className="container">
      <h2>Registro de Ingresos</h2>
      <div id="print-container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Venta</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.fecha_venta}</td>
                  <td>{venta.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total-container">
          <p className="total">Total de ventas: ${totalVentas.toFixed(2)}</p>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn-imprimir" onClick={imprimirPDF}>Imprimir en PDF</button>
      </div>
    </div>
  );
}

export default Ingreso;