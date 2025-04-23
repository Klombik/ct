import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Главная</Link>
      <Link to="/diary">Дневник</Link>
      <Link to="/calculator">Калькулятор</Link>
      <Link to="/products">Продукты</Link>
      <Link to="/profile">Профиль</Link>
    </nav>
  );
}

export default Navbar;