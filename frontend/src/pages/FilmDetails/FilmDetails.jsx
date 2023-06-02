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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDansMaListe, setIsDansMaListe] = useState(false);


  //récupère le film demandé
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

  //vérifie si le film est favori
  const verifFavori = () => {
    axios
      .get(`http://localhost:8000/movies/favoris`)
      .then((response) => {
        const favoris = response.data.user.favoris;
        const isMovieFavorite = favoris.some(
          (favori) => favori.id === parseInt(params.id)
        );
        setIsFavorite(isMovieFavorite);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //vérifie si le film est dans la liste des films à regarder
  const verifDansMaListe = () => {
    axios
      .get(`http://localhost:8000/movies/maliste`)
      .then((response) => {
        const liste = response.data.user.liste;
        const isMovieDansMaListe = liste.some(
          (movieDansListe) => movieDansListe.id === parseInt(params.id)
        );
        setIsDansMaListe(isMovieDansMaListe);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovie();
    verifFavori();
    verifDansMaListe();
  }, []);

  //ajoute le film à la base de données des films favoris
  const handleAddToFavorites = () => {
    const movieId = params.id; // ID du film à ajouter aux favoris
    const userId = 1; // ID de l'utilisateur

    axios
      .post(`http://localhost:8000/movies/ajout/favoris/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setIsFavorite(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //supprime le film de la base de données des favoris
  const handleRemoveFromFavorites = () => {
    const movieId = params.id; // ID du film à supprimer des favoris

    axios
      .delete(`http://localhost:8000/movies/suppression/favoris/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setIsFavorite(false); // Met à jour l'état pour indiquer que le film n'est plus dans les favoris
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //idem avec la base de données des films à regarder plus tard
  const handleAddToMaliste = () => {
    const movieId = params.id; // ID du film à ajouter aux favoris
    const userId = 1; // ID de l'utilisateur

    axios
      .post(`http://localhost:8000/movies/ajout/maliste/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setIsDansMaListe(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveFromMaliste = () => {
    const movieId = params.id; // ID du film à supprimer des favoris

    axios
      .delete(`http://localhost:8000/movies/suppression/maliste/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setIsDansMaListe(false); // Met à jour l'état pour indiquer que le film n'est plus dans les favoris
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
          {/* <h4>Recommandé à {movie?.r}</h4> */}
          <p><span className='petit-titre'>Langue originale : </span>{movie?.original_language}</p>
          <p><span className='petit-titre'>Popularité : </span>{movie?.popularity}</p>
          <p ><span className='petit-titre'>Résumé :</span> {movie?.overview}</p>
        </div>
      </div>
      <div className="container">
        <div className="boutoncoeur">
          <button
            className={`round-button ${isFavorite ? 'clicked' : ''}`}
            onClick={() => {
              if (isFavorite) {
                handleRemoveFromFavorites(); // Supprime le film des favoris s'il est déjà présent et que l'on appuie sur le bouton
              } else {
                handleAddToFavorites(); // Ajoute le film aux favoris s'il n'est pas présent
              }
            }}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: isFavorite ? 'red' : 'gray',
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
            className={`round-button ${isDansMaListe ? 'clicked' : ''}`}
            onClick={() => {
              if (isDansMaListe) {
                handleRemoveFromMaliste(); // Supprime le film de la liste des films à regarder s'il y est déjà et que l'on appuie sur le bouton
              } else {
                handleAddToMaliste(); // Ajoute le film aux favoris s'il n'est pas présent
              }
            }}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              backgroundColor: isDansMaListe ? 'green' : 'gray',
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
