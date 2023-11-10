const development = {
  database: {
    host: 'localhost',
    port: 27017,
    name: 'eLibrary',
  },
};

const production = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'eLibrary',
  },
};

const config = process.env.NODE_ENV === 'production' ? production : development;

module.exports = config;
