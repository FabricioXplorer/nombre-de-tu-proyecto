import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css'; // Asegúrate de importar tu archivo CSS

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

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
      await axios.post('https://proyecto.forcewillcode.website/api/clientes', nuevoCliente);
      fetchClientes(); // Actualizar la lista después de agregar un nuevo cliente
      setNuevoCliente({
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: ''
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://proyecto.forcewillcode.website/api/clientes/${id}`);
      fetchClientes(); // Actualizar la lista después de eliminar un cliente
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const handleModificarCliente = (id) => {
    console.log(`Modificar cliente con ID: ${id}`);
  };

  const mostrarDetallesCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const cerrarDetallesCliente = () => {
    setClienteSeleccionado(null);
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h2 className="cliente-header">Lista de Clientes</h2>
        <button className="agregar-cliente-btn" onClick={() => setMostrarFormulario(true)}>Agregar Cliente</button>
      </div>
  
      <h3 className="cliente-header">Clientes</h3>
      <ul className="clientes-list">
        <li className="cliente-item">
          <div className="cliente-header">Nombre del Cliente:</div>
          <div className="cliente-header">Apellido del Cliente:</div>
          <div className="cliente-header">Acciones:</div>
        </li>
        {clientes.map((cliente) => (
          <li key={cliente.id} className="cliente-item">
          <div className="cliente">{cliente.nombres}</div>
          <div className="cliente">{cliente.apellidos}</div>
          <div className="acciones-container">
            <button className='button-space' onClick={() => handleModificarCliente(cliente.id)}>Modificar</button>
            <button className="button-space" onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
            <button className="button-space" onClick={() => mostrarDetallesCliente(cliente)}>Más Información</button>
          </div>
        </li>
        ))}
      </ul>
  
      {mostrarFormulario && (
        <div className="formulario-container">
          <h2>Agregar Nuevo Cliente</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombres" value={nuevoCliente.nombres} onChange={handleInputChange} placeholder="Nombres" required />
            <input type="text" name="apellidos" value={nuevoCliente.apellidos} onChange={handleInputChange} placeholder="Apellidos" required />
            <input type="text" name="direccion" value={nuevoCliente.direccion} onChange={handleInputChange} placeholder="Dirección" required />
            <input type="text" name="telefono" value={nuevoCliente.telefono} onChange={handleInputChange} placeholder="Teléfono" required />
            <input type="email" name="email" value={nuevoCliente.email} onChange={handleInputChange} placeholder="Correo electrónico" required />
            <div className="button-container">
              <button type="submit" className="guardar-btn">Guardar</button>
              <button type="button" className="cancelar-btn" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {clienteSeleccionado && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Detalles del Cliente</h2>
            <p><strong>Nombre:</strong> {clienteSeleccionado.nombres} {clienteSeleccionado.apellidos}</p>
            <p><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>
            <p><strong>Teléfono:</strong> {clienteSeleccionado.telefono}</p>
            <p><strong>Correo Electrónico:</strong> {clienteSeleccionado.email}</p>
            <button onClick={cerrarDetallesCliente}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;
