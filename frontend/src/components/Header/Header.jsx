import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/liste">
        Ma liste
      </Link>
      <Link className="Link" to="/categories">
        Films par catégories
      </Link>
      <Link className="Link" to="/preferences">
        Mes favoris
      </Link>
    </div>
  );
};

export default Header;
