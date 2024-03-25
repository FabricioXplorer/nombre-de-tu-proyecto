import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Clientes from './components/Clientes';
import Categorias from './components/Categorias';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import DetallesVentas from './components/DetallesVentas';
import Compras from './components/Compras';
import Contabilizacion from './components/Contabilizacion';
import Movimientos from './components/Movimientos';
import Ingresos from './components/Ingresos';
import Egresos from './components/Egresos';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
