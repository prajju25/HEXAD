const dotenv = require('dotenv');

console.log("Fetching env properties from Path : "+__dirname+ "/.env");
dotenv.config({path: __dirname + '/.env'})

module.exports = process.env;