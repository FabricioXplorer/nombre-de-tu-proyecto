import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/SideBar/Navigation';
import Clientes from './components/Cliente/Clientes';
import Categorias from './components/Categorias/Categorias';
import Productos from './components/Productos/Productos';
import Ventas from './components/Ventas/Ventas';
import DetallesVentas from './components/DetallesVentas/DetallesVentas';
import Compras from './components/Compras/Compras';
import Contabilizacion from './components/Contabilizacion/Contabilizacion';
import Movimientos from './components/Movimientos/Movimientos';
import Ingresos from './components/Ingresos/Ingresos';
import Egresos from './components/Egresos/Egresos';
import Proveedores from './components/Proveedores/Proveedores';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/detalles-ventas" element={<DetallesVentas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/contabilizacion" element={<Contabilizacion />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/ingresos" element={<Ingresos />} />
          <Route path="/egresos" element={<Egresos />} />
          <Route path="/proveedores" element={<Proveedores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
