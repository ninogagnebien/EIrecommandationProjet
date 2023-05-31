import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    isLiked: {
      type: Boolean,
      nullable: true,
    },
    release_date: {
      type: Date,
      nullable: true,
    },
    title: { type: String },
    backdrop_path: { type: String, nullable: true },
    adult: { type: Boolean, nullable: true },
    genre_ids: { type: String, nullable: true },
    original_language: { type: String, nullable: true },
    original_title: { type: String, nullable: true },
    overview: { type: String, nullable: true },
    poster_path: { type: String, nullable: true },
    popularity: { type: Number, nullable: true },
    vote_average: { type: Number, nullable: true },
    vote_count: { type: Number, nullable: true },
  },
  relations: {
    genres: {
      type: 'many-to-many',
      target: 'Genre', // CategoryEntity
      joinTable: true,
      cascade: true,
    },
  },
});

export default Movie;
