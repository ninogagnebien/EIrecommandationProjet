import { useParams } from 'react-router-dom';
import './Categories.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';

function CategoryMovies() {
  const params = useParams();
  const [movies, setMovies] = useState({});

  // const fetchMovie = () => {
  //   axios
  //     //.get(`http://localhost:8000/genres/${params.id}`) INSERER COMMANDE POUR RECUPERER LES FILMS D UN GENRE
  //     .then((response) => {
  //       setMovies(response.data.movie);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   fetchMovie();
  // }, []);

  return (
    <div>
    <h1>Voici les films du genre : {params.category}</h1>
        <table>
          <tr>
            <td>
              <h4>Affiche</h4>
            </td>
            <td>
              <h3>Titre</h3>
            </td>
            <td>
              <h3>Date de sortie</h3>
            </td>
          </tr>
        </table>
        {/* {movies.map((movie) => (
          <Movie movie={movie} />
        ))} */}
        </div>
  );

  {
    /* </div><div className="App">{movie?.title}</div>; */
  }
}

export default CategoryMovies