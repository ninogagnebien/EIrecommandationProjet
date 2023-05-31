import { useParams } from 'react-router-dom';
import './FilmDetails.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function FilmDetails() {
  const params = useParams();
  const [movie, setMovie] = useState({});

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

  return <div className="App">{movie?.title}</div>;
}

export default FilmDetails;
