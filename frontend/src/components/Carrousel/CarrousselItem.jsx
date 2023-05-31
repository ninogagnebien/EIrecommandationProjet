import React, { useState } from 'react';
import './Carrousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Like from '../Like/Like';

function CarrouselItem({ posterPath, title }) {
  return (
    <div className="afficheTitre">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="afficheFilm"
      />
      <h4>{title}</h4>
      <Like></Like>
    </div>
  );
}

export default CarrouselItem;
