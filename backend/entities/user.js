import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
  },

  relations: {
    favoris: {
      type: 'many-to-many',
      target: 'Movie', // CategoryEntity
      joinTable: true,
      cascade: true,
    },
    liste: {
      type: 'many-to-many',
      target: 'Movie', // CategoryEntity
      joinTable: true,
      cascade: true,
    },
  },
});

export default User;
