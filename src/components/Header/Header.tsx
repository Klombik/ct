import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header__title">Трекер калорий</h1>
      <nav className="header__nav">
        <ul className="nav-list">
          <li className="nav-list__item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-list__link active' : 'nav-list__link'}>
              Главная
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink to="/diary" className={({ isActive }) => isActive ? 'nav-list__link active' : 'nav-list__link'}>
              Дневник
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink to="/calculator" className={({ isActive }) => isActive ? 'nav-list__link active' : 'nav-list__link'}>
              Калькулятор
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-list__link active' : 'nav-list__link'}>
              Продукты
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-list__link active' : 'nav-list__link'}>
              Профиль
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;