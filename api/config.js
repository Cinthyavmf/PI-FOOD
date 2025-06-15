const PORT = process.env.PORT || 3001;

const API_KEY = process.env.API_KEY;

const DB_USER = process.env.DB_USER || 'postgres'; 
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'food';
const DB_PORT = process.env.DB_PORT || 5432

module.exports = {PORT, API_KEY, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT};