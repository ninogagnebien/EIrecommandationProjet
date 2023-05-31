import express from 'express';
const router = express.Router();
import axios from 'axios';
import Movie from '../entities/movies.js';
import { appDataSource } from '../datasource.js';

// const movies = useFetchMovies();
const options = {
  url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
  },
};

router.post('/alimenter', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const movies = response.data.results;
      const promiseArray = movies.map((movie) => {
        const newDocument = movieRepository.create({
          releaseDate: movie.release_date,
          title: movie.title,
        });

        return (
          movieRepository
            .insert(newDocument)
            //   .then(function (newDocument) {
            //   })
            .catch(function (error) {
              console.error(error);
              if (error.code === '23505') {
                res.status(400).json({
                  message: `Movie with name "${movie.title}" already exists`,
                });
              } else {
                res
                  .status(500)
                  .json({ message: 'Error while creating the movie' });
              }
            })
        );
      });
      Promise.all(promiseArray).then(function () {
        res.json({ message: 'Tous les films sont dans la base de données' });
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;
