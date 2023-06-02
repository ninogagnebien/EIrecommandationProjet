import axios from 'axios';
import './Movie.css';

function Movie({ movie }) {
  return (
    <table className="movieTable">
      <tr>
        <td>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            className="afficheFilm"
          />
        </td>
        <td>
          <h3>{movie.title}</h3>
        </td>
        <td>
          <h5>{movie.release_date}</h5>
        </td>
      </tr>
    </table>
  );
}

export default Movie;
