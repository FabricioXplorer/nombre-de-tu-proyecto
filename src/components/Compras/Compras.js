import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Compras.css';

const showAlert = (message, type) => {
  const alertDiv = document.createElement('div');
  alertDiv.textContent = message;
  alertDiv.classList.add('alert');
  alertDiv.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, 3000);
};

function Compras() {
  const [compras, setCompras] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    id: null,
    producto: '',
    cantidad: '',
    precio: '',
    fecha: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [comprasPorPagina, setComprasPorPagina] = useState(5);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchCompras();
  }, []);

  const fetchCompras = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Error al obtener compras:', error);
      showAlert('Error al obtener compras', 'danger');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaCompra({ ...nuevaCompra, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (nuevaCompra.id) {
        await axios.put(`https://proyecto.forcewillcode.website/api/compras/${nuevaCompra.id}`, nuevaCompra);
        showAlert('Compra modificada correctamente', 'success');
      } else {
        await axios.post('https://proyecto.forcewillcode.website/api/compras', nuevaCompra);
        showAlert('Compra añadida correctamente', 'success');
      }
      fetchCompras();
      setNuevaCompra({
        id: null,
        producto: '',
        cantidad: '',
        precio: '',
        fecha: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al agregar/editar compra:', error);
      showAlert('Error al agregar/editar compra', 'danger');
    }
  };

  const handleEliminarCompra = async (id) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/compras/${id}`);
      fetchCompras();
      showAlert('Compra eliminada correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar compra:', error);
      showAlert('Error al eliminar compra', 'danger');
    }
  };

  const handleModificarCompra = (compra) => {
    setNuevaCompra(compra);
    setMostrarFormulario(true);
  };

  const mostrarDetallesCompra = (compra) => {
    setCompraSeleccionada(compra);
  };

  const cerrarDetallesCompra = () => {
    setCompraSeleccionada(null);
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const ultimoIndice = paginaActual * comprasPorPagina;
  const primerIndice = ultimoIndice - comprasPorPagina;
  const comprasFiltradas = Array.isArray(compras) ? compras.filter(
    (compra) =>
      compra.producto.toLowerCase().includes(busqueda.toLowerCase())
  ) : [];
  const comprasActuales = comprasFiltradas.slice(primerIndice, ultimoIndice);

  const numeroPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);
  const paginasArray = Array.from({ length: numeroPaginas }, (_, i) => i + 1);

  return (
    <div className="compras-container">
      <div className="compras-header">
        <h2>Lista de Compras</h2>
        <button className="agregar-compra-btn" onClick={() => setMostrarFormulario(true)}>
          Agregar Compra
        </button>
      </div>

      <div className="buscador-container">
        <input
          type="text"
          placeholder="Buscar productos comprados..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={comprasPorPagina} onChange={(e) => setComprasPorPagina(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <table className="compras-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comprasActuales.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.producto}</td>
              <td>{compra.cantidad}</td>
              <td>{compra.precio}</td>
              <td>{compra.fecha}</td>
              <td className="acciones-container">
                <button onClick={() => handleModificarCompra(compra)}>Modificar</button>
                <button onClick={() => handleEliminarCompra(compra.id)}>Eliminar</button>
                <button onClick={() => mostrarDetallesCompra(compra)}>Más Información</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        {paginasArray.map((pagina) => (
          <button
            key={pagina}
            onClick={() => cambiarPagina(pagina)}
            className={paginaActual === pagina ? 'active' : ''}
          >
            {pagina}
          </button>
        ))}
      </div>

      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>{nuevaCompra.id ? 'Editar Compra' : 'Agregar Nueva Compra'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="producto"
                value={nuevaCompra.producto}
                onChange={handleInputChange}
                placeholder="Producto"
                required
              />
              <input
                type="number"
                name="cantidad"
                value={nuevaCompra.cantidad}
                onChange={handleInputChange}
                placeholder="Cantidad"
                required
              />
              <input
                type="number"
                name="precio"
                value={nuevaCompra.precio}
                onChange={handleInputChange}
                placeholder="Precio"
                required
              />
              <input
                type="date"
                name="fecha"
                value={nuevaCompra.fecha}
                onChange={handleInputChange}
                placeholder="Fecha"
                required
              />
              <div className="button-container">
                <button type="submit" className="guardar-btn">
                  {nuevaCompra.id ? 'Guardar Cambios' : 'Guardar'}
                </button>
                <button type="button" className="cancelar-btn" onClick={() => setMostrarFormulario(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {compraSeleccionada && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Detalles de la Compra</h2>
            <p>
              <strong>Producto:</strong> {compraSeleccionada.producto}
            </p>
            <p>
              <strong>Cantidad:</strong> {compraSeleccionada.cantidad}
            </p>
            <p>
              <strong>Precio:</strong> {compraSeleccionada.precio}
            </p>
            <p>
              <strong>Fecha:</strong> {compraSeleccionada.fecha}
            </p>
            <button onClick={cerrarDetallesCompra}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compras;