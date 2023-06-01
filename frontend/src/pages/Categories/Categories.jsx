import { useParams } from 'react-router-dom';
import './Categories.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';
import { Link } from 'react-router-dom';


function CategoryMovies() {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const fetchMovie = () => {
  const genres_id={
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
    Western: 37
   }
    axios
      .get(`http://localhost:8000/movies/categories/${genres_id[params.category]}`) //INSERER COMMANDE POUR RECUPERER LES FILMS D UN GENRE //${params.category}
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
    <div>
    <h1>Voici les films du genre : {params.category}</h1>

    <div>{movies.map((movie) => (
    <div key={movie.id} >
    <Link to={`/movie/${movie.id}`} className='resultatsRecherche'>
    <h3>{movie.title}</h3>
    </Link></div>
    ))}
    </div>
    </div>
  )

  {
    /* </div><div className="App">{movie?.title}</div>; */
  }
}

export default CategoryMovies;
