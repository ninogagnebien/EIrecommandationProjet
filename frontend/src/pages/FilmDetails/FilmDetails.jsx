import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import RatingStars from 'react-rating-stars-component';
import { FiHeart } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import './FilmDetails.css';

function FilmDetails() {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [isClicked1, setIsClicked1] = useState(false); //composant favoris
  const [isClicked, setIsClicked] = useState(false); //composant favoris
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDansMaListe, setIsDansMaListe] = useState(false);

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

  const verifFavori = () => {
    axios
      .get(`http://localhost:8000/movies/favoris`)
      .then((response) => {
        const favoris = response.data.user.favoris;
        const isMovieFavorite = favoris.some(
          (favori) => favori.id === params.id
        );
        setIsFavorite(isMovieFavorite);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovie();
    verifFavori();
  }, []);

  const handleAddToFavorites = () => {
    const movieId = params.id; // ID du film à ajouter aux favoris
    const userId = 1; // ID de l'utilisateur

    axios
      .post(`http://localhost:8000/movies/ajout/favoris/${movieId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToMaliste = () => {
    const movieId = params.id; // ID du film à ajouter aux favoris
    const userId = 1; // ID de l'utilisateur

    axios
      .post(`http://localhost:8000/movies/ajout/liste/${movieId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          className="left-image"
        />

        <div className="details">
          <h1>{movie?.title}</h1>
          <p>Langue originale : {movie?.original_language}</p>
          <p>Popularité : {movie?.popularity}</p>
          <p className="resume">Résumé : {movie?.overview}</p>
        </div>
      </div>
      <div className="container">
        <div className="boutoncoeur">
          <button
            className={`round-button ${
              isClicked1 || isFavorite ? 'clicked' : ''
            }`}
            onClick={() => {
              setIsClicked1(!isClicked1);
              handleAddToFavorites();
            }}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: isClicked1 || isFavorite ? 'red' : 'gray',
              color: 'white',
              border: 'none',
              margin: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiHeart size={32} />
          </button>

          <p>Favoris</p>
        </div>
        <div className="boutonplus">
          <button
            className={`round-button ${
              isClicked || isDansMaListe ? 'clicked' : ''
            }`}
            onClick={() => {
              setIsClicked(!isClicked);
              handleAddToMaliste();
            }}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: isClicked || isDansMaListe ? 'green' : 'gray',
              color: 'white',
              border: 'none',
              margin: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiPlus size={32} />
          </button>
          <p> Ma liste</p>
        </div>
        <div className="boutonrate">
          <div className="rating">
            <RatingStars
              count={5} // Nombre d'étoiles à afficher
              onChange={setRating} // Fonction de rappel appelée lorsque la note change
              value={rating} // Valeur actuelle de la note
              size={30} // Taille des étoiles en pixels
              activeColor="#ffd700" // Couleur des étoiles sélectionnées
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetails;
