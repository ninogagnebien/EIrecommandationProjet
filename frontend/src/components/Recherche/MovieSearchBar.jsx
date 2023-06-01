import React, { useState } from 'react';
import './MovieSearchBar.css';

function MovieSearchBar({ onSearch, onClear,movies }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value === '') {
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
      <div key={movie.id} >
        <Link to={`/movie/${movie.id}`} className='resultatsRecherche'>
          <h3>{movie.title}</h3>
        </Link></div>
    ))}
    </span>
  );
}

export default MovieSearchBar;
