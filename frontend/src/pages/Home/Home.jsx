import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useFetchMovies from './useFetchMovies';

import CategorySection from '../../components/Categories/CategorySection';
import Slider from '../../components/Slider/Slider';
import MovieSearchBar from '../../components/Recherche/MovieSearchBar';
import MovieMatch from 'C:/Users/victo/EIrecommandationProjet/frontend/src/pages/Home/MovieMatch.png';


function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [top10, setTop10] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [maliste, setMaliste] = useState([]);
  const moviesNames = movies.map((movie) => movie.title);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/top10`)
      .then((response) => {
        setTop10(response.data.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/favoris`)
      .then((response) => {
        setFavoris(response.data.user.favoris);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/maliste`)
      .then((response) => {
        setMaliste(response.data.user.liste);
        console.log(response.data.user.liste);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  console.log(maliste);

  return (
    <div className="App">
      <div className="Appheader">
        {/* <p className='Recherchertexte'>
          Rechercher un film : */}
        <MovieSearchBar onSearch={handleSearch} onClear={handleClear} />
        {/* Afficher les films filtrés */}
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="resultatsRecherche">
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
        {/* <div><img src="./movie.png"/></div> */}
        {/* </p> */}

        <img src={MovieMatch} className="logo2"/>
        <div className="titresection">Mes films favoris</div>
        <Slider recommendations={favoris} />
        <div className="titresection">Ma liste de films à regarder</div>
        <Slider recommendations={maliste} />
        {/* <Slider recommendations={maliste} /> */}
        <div className="titresection">Top 10</div>
        <Slider recommendations={top10} />
        <CategorySection />
      </div>
    </div>
  );
}

export default Home;
