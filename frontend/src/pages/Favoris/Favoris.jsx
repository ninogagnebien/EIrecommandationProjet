import './Favoris.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Favoris() {
  const [movies, setMovies] = useState([]);
  const fetchMovie = () => {
    axios
      .get(`http://localhost:8000/movies/favoris`)
      .then((response) => {
        setMovies(response.data.user.favoris);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div>
      <h1>Vos films favoris </h1>

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

export default Favoris;
