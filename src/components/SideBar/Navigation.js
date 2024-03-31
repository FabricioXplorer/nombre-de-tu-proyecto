import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faListAlt,faMoneyBill,faCreditCard, faUserCircle, faList, faBox, faChartBar, faShoppingCart, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';

function Navigation() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (itemName) => {
    setExpandedItem(itemName === expandedItem ? null : itemName);
  };

  return (
    
    <nav className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Clientes')}>
            <FontAwesomeIcon icon={faUserCircle} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Clientes</span>}
          </div>
          {expandedItem === 'Clientes' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/clientes">Clientes</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Categorias')}>
            <FontAwesomeIcon icon={faListAlt} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Categorías</span>}
          </div>
          {expandedItem === 'Categorias' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/categorias">Categorías</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Productos')}>
            <FontAwesomeIcon icon={faBox} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Productos</span>}
          </div>
          {expandedItem === 'Productos' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/productos">Productos</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Ventas')}>
            <FontAwesomeIcon icon={faCreditCard} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Ventas</span>}
          </div>
          {expandedItem === 'Ventas' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/ventas">Ventas</a>
              </li>
              <li className="submenu-item">
                <a href="/detalles-ventas">Detalle de Ventras</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Compras')}>
            <FontAwesomeIcon icon={faShoppingCart} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Compras</span>}
          </div>
          {expandedItem === 'Compras' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/compras">Compras</a>
              </li>
              <li className="submenu-item">
                <a href="/proveedores">Proveedores</a>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-item">
          <div className="sidebar-link" onClick={() => toggleExpand('Contabilizacion')}>
            <FontAwesomeIcon icon={faMoneyBill} className="sidebar-icon" />
            {expandedItem === '' && <span className="navigation-label">Contabilización</span>}
          </div>
          {expandedItem === 'Contabilizacion' && (
            <ul className="submenu">
              <li className="submenu-item">
                <a href="/contabilizacion">Contabilidad</a>
              </li>
              <li className="submenu-item">
                <a href="/movimientos">Movimientos</a>
              </li>
              <li className="submenu-item">
                <a href="/ingresos">Ingresos</a>
              </li>
              <li className="submenu-item">
                <a href="/egresos">Egresos</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
