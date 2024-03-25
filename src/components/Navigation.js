import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faBox, faChartBar, faShoppingCart, faMoneyBill, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav-container">
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/clientes" className="nav-link">
            <FontAwesomeIcon icon={faUser} className="navigation-icon" />
            <span className="navigation-icon">Clientes</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/categorias" className="nav-link">
            <FontAwesomeIcon icon={faList} className="navigation-icon" />
            <span className="navigation-icon">Categorías</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productos" className="nav-link">
            <FontAwesomeIcon icon={faBox} className="navigation-icon" />
            <span className="navigation-icon">Productos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ventas" className="nav-link">
            <FontAwesomeIcon icon={faChartBar} className="navigation-icon" />
            <span className="navigation-icon">Ventas</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/detalles-ventas" className="nav-link">
            <FontAwesomeIcon icon={faChartBar} className="navigation-icon" />
            <span className="navigation-icon">Detalles Ventas</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/compras" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="navigation-icon" />
            <span className="navigation-icon">Compras</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contabilizacion" className="nav-link">
            <FontAwesomeIcon icon={faArrowAltCircleDown} className="navigation-icon" />
            <span className="navigation-icon">Contabilización</span>
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/movimientos" className="nav-link">
                <FontAwesomeIcon icon={faChartBar} className="submenu-icon" />
                <span className="navigation-icon">Movimientos</span>
              </Link>
            </li>
            <li>
              <Link to="/ingresos" className="nav-link">
                <FontAwesomeIcon icon={faMoneyBill} className="submenu-icon" />
                <span className="navigation-icon">Ingresos</span>
              </Link>
            </li>
            <li>
              <Link to="/egresos" className="nav-link">
                <FontAwesomeIcon icon={faMoneyBill} className="submenu-icon" />
                <span className="navigation-icon">Egresos</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
