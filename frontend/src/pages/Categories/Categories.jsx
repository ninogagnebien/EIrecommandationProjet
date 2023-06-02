import { useParams } from 'react-router-dom';
import './Categories.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';

function CategoryMovies() {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const fetchMovie = () => {
    const genres_id = {
      Action: 28,
      Aventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      ScienceFiction: 878,
      TVmovie: 10770,
      Thriller: 53,
      War: 10752,
      Western: 37,
    };
    axios
      .get(
        `http://localhost:8000/movies/categories/${genres_id[params.category]}`
      )
      .then((response) => {
        setMovies(response.data.movie);
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
      <h1> Nos films du genre {params.category} :</h1>

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

export default CategoryMovies;
