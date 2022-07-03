
  require('dotenv').config();
  
  module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT:  process.env.DB_PORT || '27017',
    DB: process.env.DB || 'eki_indradi_test',
    USERNAME : process.env.DB_USERNAME || '',
    PASSWORD : process.env.DB_PASSWORD || ''
  };