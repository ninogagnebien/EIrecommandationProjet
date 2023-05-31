import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    isLiked: {
      type: Boolean,
      nullable: true,
    },
    releaseDate: {
      type: Date,
    },
    title: { type: String },
  },
});

export default Movie;
