// import React, { useState } from 'react';
// import './Carrousel.css';

// function Carrousel({ movies }) {
//   const [indexCourant, setIndexCourant] = useState(0);

//   const afficherFilmPrecedent = () => {
//     setIndexCourant((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : movies.length - 1
//     );
//   };

//   const afficherFilmSuivant = () => {
//     setIndexCourant((prevIndex) =>
//       prevIndex < movies.length - 1 ? prevIndex + 1 : 0
//     );
//   };

//   const filmCourant = movies[indexCourant];

//   return (
//     <div>
//       <h2>Carrousel de Films</h2>
//       <div className="carrousel">
//         <button onClick={afficherFilmPrecedent}>Précédent</button>
//         <div className="afficheTitre"><img
//           src={`https://image.tmdb.org/t/p/w500${filmCourant.poster_path}`}
//           alt={filmCourant.title}
//           className="afficheFilm"
//         />
//         <h4>{filmCourant.title}</h4>
//         </div>
//         <button onClick={afficherFilmSuivant}>Suivant</button>
//       </div>
//     </div>
//   );
// }

// export default Carrousel;

import React, { useState } from 'react';
import './Carrousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Like from '../Like/Like';
import CarrouselItem from './CarrousselItem';

function Carrousel({ movies }) {
  const [indexCourant, setIndexCourant] = useState(0);

  const afficherFilmPrecedent = () => {
    setIndexCourant((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : movies.length - 1
    );
  };

  const afficherFilmSuivant = () => {
    setIndexCourant((prevIndex) =>
      prevIndex < movies.length - 1 ? prevIndex + 1 : 0
    );
  };

  const filmCourant = movies[indexCourant];
  if (filmCourant === undefined) {
    return null;
  }

  return (
    <div>
      <h2>Carrousel de Films</h2>
      <div className="carrousel">
        <button onClick={afficherFilmPrecedent}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <CarrouselItem
          posterPath={filmCourant.poster_path}
          title={filmCourant.title}
        />
        <button onClick={afficherFilmSuivant}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Carrousel;
