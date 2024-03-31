import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProveedoresList.scss';

const ProveedoresList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: ''
  });
  const [editarProveedorId, setEditarProveedorId] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [paginacion, setPaginacion] = useState({
    paginaActual: 1,
    proveedoresPorPagina: 5
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState(null);
  const [mostrarDetalles, setMostrarDetalles] = useState({});

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('https://proyecto.forcewillcode.website/api/proveedores');
      setProveedores(response.data);
    } catch (error) {
      setError('Error al obtener proveedores:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({ ...nuevoProveedor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editarProveedorId) {
        await axios.put(`https://proyecto.forcewillcode.website/api/proveedores/${editarProveedorId}`, nuevoProveedor);
        setEditarProveedorId(null);
        alert('Proveedor actualizado con éxito');
      } else {
        await axios.post('https://proyecto.forcewillcode.website/api/proveedores', nuevoProveedor);
        alert('Proveedor agregado con éxito');
      }
      setNuevoProveedor({
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: ''
      });
      fetchProveedores();
      setShowModal(false);
    } catch (error) {
      setError('Error al agregar/editar proveedor:', error);
    }
  };

  const handleEditar = (proveedor) => {
    setNuevoProveedor({
      nombres: proveedor.nombres,
      apellidos: proveedor.apellidos,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      email: proveedor.email
    });
    setEditarProveedorId(proveedor.id);
    setModalType('editar');
    setShowModal(true);
  };

  const handleEliminar = async (proveedorId) => {
    try {
      await axios.delete(`https://proyecto.forcewillcode.website/api/proveedores/${proveedorId}`);
      fetchProveedores();
      alert('Proveedor eliminado con éxito');
    } catch (error) {
      setError(`Error al eliminar proveedor: ${error.message}`);
    }
  };

  const handlePaginacion = (pagina) => {
    setPaginacion({ ...paginacion, paginaActual: pagina });
  };

  const handleProveedoresPorPagina = (cantidad) => {
    setPaginacion({ ...paginacion, proveedoresPorPagina: cantidad });
  };

  const proveedoresFiltrados = proveedores.filter(
    (proveedor) =>
      proveedor.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexUltimo = paginacion.paginaActual * paginacion.proveedoresPorPagina;
  const indexPrimero = indexUltimo - paginacion.proveedoresPorPagina;
  const proveedoresActuales = proveedoresFiltrados.slice(indexPrimero, indexUltimo);

  const numeroPaginas = Math.ceil(proveedoresFiltrados.length / paginacion.proveedoresPorPagina);

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalType('agregar');
    setNuevoProveedor({
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      email: ''
    });
    setEditarProveedorId(null);
  };

  const toggleDetalles = (proveedorId) => {
    setMostrarDetalles((prevState) => ({
      ...prevState,
      [proveedorId]: !prevState[proveedorId]
    }));
  };

  return (
    <div className="proveedores-container">
      <button className="agregar-proveedor-btn" onClick={toggleModal}>
        Agregar Proveedor
      </button>
      <h2>Listado de Proveedores</h2>
      {error && <div>Error: {error}</div>}
      <input
        type="text"
        placeholder="Buscar proveedores..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={paginacion.proveedoresPorPagina}
        onChange={(e) => handleProveedoresPorPagina(parseInt(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <table className="proveedores-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresActuales.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombres}</td>
              <td>{proveedor.apellidos}</td>
              <td>{proveedor.telefono}</td>
              <td>
                <button className="button-space" onClick={() => toggleDetalles(proveedor.id)}>
                  {mostrarDetalles[proveedor.id] ? 'Ocultar detalles' : 'Mostrar detalles'}
                </button>
                {mostrarDetalles[proveedor.id] && (
                  <div className="proveedor-detalles">
                    <div>Dirección: {proveedor.direccion}</div>
                    <div>Email: {proveedor.email}</div>
                  </div>
                )}
                <button className="button-space" onClick={() => handleEditar(proveedor)}>
                  Editar
                </button>
                <button className="button-space" onClick={() => handleEliminar(proveedor.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from({ length: numeroPaginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            onClick={() => handlePaginacion(pagina)}
            disabled={paginacion.paginaActual === pagina}
          >
            {pagina}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="formulario-container">
          <h2>{modalType === 'agregar' ? 'Agregar Proveedor' : 'Editar Proveedor'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombres"
              value={nuevoProveedor.nombres}
              onChange={handleChange}
              placeholder="Nombres"
              required
            />
            <input
              type="text"
              name="apellidos"
              value={nuevoProveedor.apellidos}
              onChange={handleChange}
              placeholder="Apellidos"
              required
            />
            <input
              type="text"
              name="direccion"
              value={nuevoProveedor.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              required
            />
            <input
              type="text"
              name="telefono"
              value={nuevoProveedor.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              required
            />
            <input
              type="email"
              name="email"
              value={nuevoProveedor.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
            />
            <div className="button-container">
              <button type="submit" className="guardar-btn">
                {modalType === 'agregar' ? 'Agregar Proveedor' : 'Guardar Cambios'}
              </button>
              <button type="button" className="cancelar-btn" onClick={toggleModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProveedoresList;