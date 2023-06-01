import { useParams } from 'react-router-dom';
import './FilmDetails.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import RatingStars from 'react-rating-stars-component';

function FilmDetails() {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);

  const fetchMovie = () => {
    axios
      .get(`http://localhost:8000/movies/${params.id}`)
      .then((response) => {
        setMovie(response.data.movie);
      })
      .catch((error) => {
        console.error(error);
      }); 
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="App">
      <div className="poster"
        >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          class="left-image"
        />

      <div className="details">
        <h1>{movie?.title}</h1>
        <p>Langue originale : {movie?.original_language}</p>
        <p>Popularité : {movie?.popularity}</p>
        <p className='resume'>Résumé : {movie?.overview}</p>
        
      </div>
      </div>
      <p className='rating'>
          <RatingStars
            count={5} // Nombre d'étoiles à afficher
            onChange={setRating} // Fonction de rappel appelée lorsque la note change
            value={rating} // Valeur actuelle de la note
            size={30} // Taille des étoiles en pixels
            activeColor="#ffd700" // Couleur des étoiles sélectionnées
          />
        </p>
    </div>
  );

  {
    /* </div><div className="App">{movie?.title}</div>; */
  }
}

export default FilmDetails;
