import React, { useState } from 'react'; //importe le langage et la fonction useState
import './MovieSearchBar.css'; //importe la page qui gère le design

function MovieSearchBar({ onSearch, onClear, movies }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (event) => {
    //à chaque évenement sur la barre de recherche:
    const value = event.target.value; // renvoie ce qui est actuellement dans la barre de recherche
    setSearchValue(value); //searchValue prend la valeur dans la barre de recherche (mise à jour)
    if (value === '') {
      //si il n'y a rien
      onClear(); // Appeler la fonction pour effacer la liste des films
    } else {
      onSearch(value); // Appeler la fonction de recherche passée en tant que prop
    }
  };
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = (searchValue) => {
    // Filtrer les films en fonction de la valeur de recherche
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
  };
  const handleClear = () => {
    //s'il n'y a rien dans la barre de recherche
    setFilteredMovies([]); // Effacer la liste des films
  };

  return (
    <span className="search-bar">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChange}
        placeholder="Rechercher un film..."
      />
      {filteredMovies.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`} className="resultatsRecherche">
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </span>
  );
}

export default MovieSearchBar;
