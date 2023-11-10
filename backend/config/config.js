const development = {
    server: {
      port: 3000,
    },
  };
  
  const production = {
    server: {
      port: process.env.PORT || 3000,
    },
  };
  
  const config = process.env.NODE_ENV === 'production' ? production : development;
  
  module.exports = config;
  