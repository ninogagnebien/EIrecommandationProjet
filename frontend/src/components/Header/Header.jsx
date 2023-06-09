import { Link } from 'react-router-dom';
import './Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import MovieMatch from './MovieMatch.png';

const Header = () => {
  return (
    <div className="Header-container">
      <img src={MovieMatch} className="logo" />
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/liste">
        Ma liste
      </Link>
      <Link className="Link" to="/categories">
        Films par genres
      </Link>
      <Link className="Link" to="/preferences">
        Mes favoris
      </Link>
      <button className="userbutton">
        <FontAwesomeIcon icon={faUser} />
      </button>
    </div>
  );
};

export default Header;
