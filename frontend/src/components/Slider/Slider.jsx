import React from 'react';
import Slider from 'react-slick';
import './Slider.css';
import { Link } from 'react-router-dom';

function RecommendationSection({ recommendations }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,

    centerMode: true, // Active le mode centré
    centerPadding: '100px', // Ajoute un espacement entre les éléments
  };

  return (
    <div>
      <Slider {...settings}>
        {recommendations.map((movie) => (
          <div className="slider-item" key={movie.title}>
            <Link to={`/movie/${movie.id}`}>
              <div className="slider-item-content">
                <div
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
                    height: '100%',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    // margin: 3px
                  }}
                >
                  {/* <h3>{movie.title}</h3>
                  <p>Langue: {movie.original_language}</p>
                  <p>Note: {movie.vote_average}</p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecommendationSection;
