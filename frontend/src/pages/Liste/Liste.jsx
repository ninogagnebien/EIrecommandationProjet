import './Liste.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Liste() {
  const [movies, setMovies] = useState([]);
  const fetchMovie = () => {
    axios
      .get(`http://localhost:8000/movies/maliste`)
      .then((response) => {
        setMovies(response.data.user.liste);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="titre">
      <h1>Votre liste de films à regarder : </h1>

      <div className="movies-container">
        {movies.map((movie, index) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`} className="resultatsRecherche">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                className="movie-image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Liste;
