import express from 'express';
const router = express.Router();
import { getRepository, Not } from 'typeorm';
import { IsNull } from 'typeorm';
import Movie from '../entities/movies.js';
import User from '../entities/user.js';
import { appDataSource } from '../datasource.js';

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({ relations: { genres: true } })
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.get('/popular', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({
      take: 20,
      order: { popularity: 'DESC' },
      relations: { genres: true },
    })
    .then(function (movies) {
      res.json({ movies });
    });
});

router.get('/top10', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({
      take: 10,
      order: { popularity: 'DESC' },
      relations: { genres: true },
    })
    .then(function (movies) {
      res.json({ movies });
    });
});

router.get('/new', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({
      where: { release_date: Not(IsNull()) },
      take: 20,
      order: { release_date: 'DESC' },
      relations: { genres: true },
    })
    .then(function (movies) {
      res.json({ movies });
    });
});

router.get('/categories/:genreId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({
      relations: ['genres'],
      where: {
        genres: { id: req.params.genreId },
      },
    })
    .then(function (movie) {
      res.json({ movie });
    });
});

router.get('/favoris', function (req, res) {
  appDataSource
    .getRepository(User)
    .findOne({ where: { id: 1 }, relations: { favoris: true } })
    .then(function (user) {
      res.json({ user });
    });
});

router.get('/recommandations', function (req, res) {
  appDataSource
    .getRepository(User)
    .findOne({
      where: { id: 1 },
      relations: { recommandations: true },
      take: 20,
    })
    .then(function (user) {
      res.json({ user });
    });
});


router.get('/maliste', function (req, res) {
  appDataSource
    .getRepository(User)
    .findOne({ where: { id: 1 }, relations: { liste: true } })
    .then(function (user) {
      res.json({ user });
    });
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    releaseDate: req.body.releaseDate,
    title: req.body.title,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with name "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie' });
      }
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

router.get('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .findOne({ where: { id: req.params.movieId }, relations: { genres: true } })
    .then(function (movie) {
      res.json({ movie });
    });
});

export default router;
