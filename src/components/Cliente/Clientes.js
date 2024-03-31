import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.scss';

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

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    id: null,
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina, setClientesPorPagina] = useState(5);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (nuevoCliente.id) {
        await axios.put(`https://proyecto.forcewillcode.website/api/clientes/${nuevoCliente.id}`, nuevoCliente);
        showAlert('Cliente modificado correctamente', 'success');
      } else {
        await axios.post('https://proyecto.forcewillcode.website/api/clientes', nuevoCliente);
        showAlert('Cliente añadido correctamente', 'success');
      }
      fetchClientes();
      setNuevoCliente({
        id: null,
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al agregar/editar cliente:', error);
      showAlert('Error al agregar/editar cliente', 'danger');
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://proyecto.forcewillcode.website/api/clientes/${id}`);
      fetchClientes();
      showAlert('Cliente eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      showAlert('Error al eliminar cliente', 'danger');
    }
  };

  const handleModificarCliente = (cliente) => {
    setNuevoCliente(cliente);
    setMostrarFormulario(true);
  };
  

  const mostrarDetallesCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const cerrarDetallesCliente = () => {
    setClienteSeleccionado(null);
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const ultimoIndice = paginaActual * clientesPorPagina;
  const primerIndice = ultimoIndice - clientesPorPagina;
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );
  const clientesActuales = clientesFiltrados.slice(primerIndice, ultimoIndice);

  const numeroPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
  const paginasArray = Array.from({ length: numeroPaginas }, (_, i) => i + 1);

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h2>Lista de Clientes</h2>
        <button className="agregar-cliente-btn" onClick={() => setMostrarFormulario(true)}>
          Agregar Cliente
        </button>
      </div>

      <div className="buscador-container">
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={clientesPorPagina} onChange={(e) => setClientesPorPagina(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <h3>Clientes</h3>
      <ul className="clientes-list">
        <li className="cliente-item">
          <div className="cliente-header">Nombre del Cliente:</div>
          <div className="cliente-header">Apellido del Cliente:</div>
          <div className="cliente-header">Acciones:</div>
        </li>
        {clientesActuales.map((cliente) => (
          <li key={cliente.id} className="cliente-item">
            <div className="cliente">{cliente.nombres}</div>
            <div className="cliente">{cliente.apellidos}</div>
            <div className="acciones-container">
              <button className="button-space" onClick={() => handleModificarCliente(cliente)}>
                Modificar
              </button>
              <button className="button-space" onClick={() => handleEliminarCliente(cliente.id)}>
                Eliminar
              </button>
              <button className="button-space" onClick={() => mostrarDetallesCliente(cliente)}>
                Más Información
              </button>
            </div>
          </li>
        ))}
      </ul>

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
        <div className="formulario-container">
          <h2>{nuevoCliente.id ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombres"
              value={nuevoCliente.nombres}
              onChange={handleInputChange}
              placeholder="Nombres"
              required
            />
            <input
              type="text"
              name="apellidos"
              value={nuevoCliente.apellidos}
              onChange={handleInputChange}
              placeholder="Apellidos"
              required
            />
            <input
              type="text"
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={handleInputChange}
              placeholder="Dirección"
              required
            />
            <input
              type="text"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              required
            />
            <input
              type="email"
              name="email"
              value={nuevoCliente.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
            />
            <div className="button-container">
              <button type="submit" className="guardar-btn">
                {nuevoCliente.id ? 'Guardar Cambios' : 'Guardar'}
              </button>
              <button type="button" className="cancelar-btn" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {clienteSeleccionado && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Detalles del Cliente</h2>
            <p>
              <strong>Nombre:</strong> {clienteSeleccionado.nombres} {clienteSeleccionado.apellidos}
            </p>
            <p>
              <strong>Dirección:</strong> {clienteSeleccionado.direccion}
            </p>
            <p>
              <strong>Teléfono:</strong> {clienteSeleccionado.telefono}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {clienteSeleccionado.email}
            </p>
            <button onClick={cerrarDetallesCliente}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;