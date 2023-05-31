import logo from './logo.svg';
import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import useFetchMovies from './useFetchMovies';
import Movie from '../../components/Movie/Movie';
import Carrousel from '../../components/Carrousel/Carrousel';
import CategorySection from '../../components/Categories/CategorySection';
import Slider from '../../components/Slider/Slider';
import MovieSearchBar from '../../components/Recherche/MovieSearchBar';

function Home() {
  const [movieName, setMovieName] = useState('');
  const movies = useFetchMovies();
  const moviesNames = movies.map((movie) => movie.title);
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const handleSearch = (searchValue) => {
    // Filtrer les films en fonction de la valeur de recherche
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
  };
  const handleClear = () => {
    setFilteredMovies([]); // Effacer la liste des films
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Rechercher un film :
          <div>
            <MovieSearchBar onSearch={handleSearch} onClear={handleClear}/>
            {/* Afficher les films filtrés */}
            {filteredMovies.map(movie => (
              <div key={movie.id}>{movie.title}</div>
            ))}
          </div>
        </p>
        <h2>Vos Recommendations</h2>
        <Slider recommendations={movies} />
        <h2>Nouveautés</h2>
        <Slider recommendations={movies} />
        <h2>Top 10</h2>
        <Slider recommendations={movies} />
        <CategorySection /> 
        
      </header>
    </div>
  );
}

export default Home;


// afficher tableau de films :
{/* <h1>Voici les {movies.length} films les plus populaires</h1>
        {/* {moviesNames.map((titre)=>(<li>{titre}</li>))} */}
        // <table>
        //   <tr>
        //     <td>
        //       <h4>Affiche</h4>
        //     </td>
        //     <td>
        //       <h3>Titre</h3>
        //     </td>
        //     <td>
        //       <h3>Date de sortie</h3>
        //     </td>
        //   </tr>
        // </table>
        // {movies.map((movie) => (
        //   <Movie movie={movie} />
        // ))} */}

        //        <Carrousel movies={movies} />