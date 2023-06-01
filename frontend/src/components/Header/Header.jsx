import { Link } from 'react-router-dom';
import './Header.css';
import MovieMatch from 'C:/Users/victo/EIrecommandationProjet/frontend/src/components/Header/MovieMatch.png';

const Header = () => {
  return (
    <div className="Header-container">
      <img src={MovieMatch} className="logo"/>
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
