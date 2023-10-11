require('dotenv').config();

const x = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
    },
    pool: {
      min: 0,
      max: 5,
      acquire: 60000,
      idle: 10000
    },
    logging: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
    },
    pool: {
      min: 0,
      max: 5,
      acquire: 60000,
      idle: 10000
    },
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
    },
    pool: {
      min: 0,
      max: 5,
      acquire: 60000,
      idle: 10000
    },
    logging: false
  },
};
module.exports = x;