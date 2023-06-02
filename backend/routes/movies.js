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

router.post('/ajout/maliste/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);

  const movieId = req.params.movieId; //ID du film à ajouter
  const userId = 1; // ID de l'utilisateur

  // Vérifier si le film existe dans la base de données
  movieRepository
    .findOne({ where: { id: movieId } })
    .then(function (movie) {
      if (movie) {
        // Récupérer l'utilisateur
        userRepository
          .findOne({ where: { id: userId }, relations: { liste: true } })
          .then(function (user) {
            if (user) {
              // Ajouter le film à la liste des favoris de l'utilisateur
              user.liste.push(movie);

              // Sauvegarder les modifications
              userRepository
                .save(user)
                .then(function () {
                  res
                    .status(201)
                    .json({ message: 'Film bien ajouté à ma liste' });
                })
                .catch(function (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error while saving user' });
                });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while finding user' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while finding movie' });
    });
});

router.delete('/suppression/maliste/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);

  const movieId = req.params.movieId; // ID du film à supprimer
  const userId = 1; // ID de l'utilisateur

  // Vérifier si le film existe dans la base de données
  movieRepository
    .findOne({ where: { id: movieId } })
    .then(function (movie) {
      if (movie) {
        // Récupérer l'utilisateur
        userRepository
          .findOne({ where: { id: userId }, relations: { liste: true } })
          .then(function (user) {
            if (user) {
              // Supprimer le film de la liste de l'utilisateur
              const liste = user.liste.filter((film) => film.id !== movie.id);
              user.liste = liste;

              // Sauvegarder les modifications
              userRepository
                .save(user)
                .then(function () {
                  res.status(200).json({
                    message: 'Film removed from user list successfully',
                  });
                })
                .catch(function (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error while saving user' });
                });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while finding user' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while finding movie' });
    });
});

router.post('/ajout/favoris/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);

  const movieId = req.params.movieId; //ID du film à ajouter
  const userId = 1; // ID de l'utilisateur

  // Vérifier si le film existe dans la base de données
  movieRepository
    .findOne({ where: { id: movieId } })
    .then(function (movie) {
      if (movie) {
        // Récupérer l'utilisateur
        userRepository
          .findOne({ where: { id: userId }, relations: { favoris: true } })
          .then(function (user) {
            if (user) {
              // Ajouter le film à la liste des favoris de l'utilisateur
              user.favoris.push(movie);

              // Sauvegarder les modifications
              userRepository
                .save(user)
                .then(function () {
                  res
                    .status(201)
                    .json({ message: 'Movie added to favorites successfully' });
                })
                .catch(function (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error while saving user' });
                });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while finding user' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while finding movie' });
    });
});

router.delete('/suppression/favoris/:movieId', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);

  const movieId = req.params.movieId; // ID du film à supprimer
  const userId = 1; // ID de l'utilisateur

  // Vérifier si le film existe dans la base de données
  movieRepository
    .findOne({ where: { id: movieId } })
    .then(function (movie) {
      if (movie) {
        // Récupérer l'utilisateur
        userRepository
          .findOne({ where: { id: userId }, relations: { favoris: true } })
          .then(function (user) {
            if (user) {
              // Supprimer le film de la liste des favoris de l'utilisateur
              const favoris = user.favoris.filter(
                (favori) => favori.id !== movie.id
              );
              user.favoris = favoris;

              // Sauvegarder les modifications
              userRepository
                .save(user)
                .then(function () {
                  res.status(200).json({
                    message: 'Movie removed from favorites successfully',
                  });
                })
                .catch(function (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error while saving user' });
                });
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while finding user' });
          });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while finding movie' });
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
