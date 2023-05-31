import express from 'express';
const router = express.Router();
import axios from 'axios';
import Movie from '../entities/movies.js';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genres.js';

// const options = {
//   url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
//   },
// };

// router.post('/alimenter', function (req, res) {
//   const movieRepository = appDataSource.getRepository(Movie);
//   axios
//     .request(options)
//     .then(function (response) {
//       console.log(response.data);
//       const movies = response.data.results;
//       const promiseArray = movies.map((movie) => {
//         const newDocument = movieRepository.create({
//           releaseDate: movie.release_date,
//           title: movie.title,
//         });

//         return (
//           movieRepository
//             .insert(newDocument)
//             //   .then(function (newDocument) {
//             //   })
//             .catch(function (error) {
//               console.error(error);
//               if (error.code === '23505') {
//                 res.status(400).json({
//                   message: `Movie with name "${movie.title}" already exists`,
//                 });
//               } else {
//                 res
//                   .status(500)
//                   .json({ message: 'Error while creating the movie' });
//               }
//             })
//         );
//       });
//       Promise.all(promiseArray).then(function () {
//         res.json({ message: 'Tous les films sont dans la base de données' });
//       });
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// });

// router.delete('/:movieId', function (req, res) {
//   appDataSource
//     .getRepository(Movie)
//     .delete({ id: req.params.movieId })
//     .then(function () {
//       res.status(204).json({ message: 'Movie successfully deleted' });
//     })
//     .catch(function () {
//       res.status(500).json({ message: 'Error while deleting the movie' });
//     });
// });

// const options = {
//     url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=500&sort_by=popularity.desc',
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
//     },
//   };

router.post('/alimenter', function (req, res) {
  const options = {
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=500&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };
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
          id: movie.id,
          backdrop_path: movie.backdrop_path,
          adult: movie.adult,
          genre_ids: movie.genre_ids.toString(),
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          popularity: movie.popularity,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          genres: movie.genre_ids.map((id) => ({ id })),
        });

        return (
          movieRepository
            .save(newDocument)
            //   .then(function (newDocument) {
            //   })
            .catch(function (error) {
              console.log(newDocument.genre_ids.toString());

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

router.post('/genres', function (req, res) {
  const options = {
    url: 'https://api.themoviedb.org/3/genre/movie/list?language=fr',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };
  const genreRepository = appDataSource.getRepository(Genre);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const genres = response.data.genres;
      const promiseArray = genres.map((genre) => {
        const newDocument = genreRepository.create({
          id: genre.id,
          name: genre.name,
        });

        return (
          genreRepository
            .save(newDocument)
            //   .then(function (newDocument) {
            //   })
            .catch(function (error) {
              console.error(error);
              if (error.code === '23505') {
                res.status(400).json({
                  message: `Movie with name "${genre.title}" already exists`,
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
        res.json({ message: 'Tous les genres sont dans la base de données' });
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