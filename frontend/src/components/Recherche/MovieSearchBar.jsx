import React, { useState } from 'react';

function MovieSearchBar({ onSearch, onClear }) {
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

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleSearchInputChange}
      placeholder="Rechercher un film..."
    />
  );
}

export default MovieSearchBar;
