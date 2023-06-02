import { Link } from 'react-router-dom';
import './Header.css';
import MovieMatch from 'C:/Users/victo/EIrecommandationProjet/frontend/src/components/Header/MovieMatch.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
      <button className="round-button">
        <FontAwesomeIcon icon={ faUser } />
      </button>
    </div>
  );
};

export default Header;
