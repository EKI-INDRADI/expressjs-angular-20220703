require('dotenv').config();

module.exports = {
  API_3RD_HOST: process.env.API_3RD_HOST || "https://www.googleapis.com",
  API_3RD_ID: process.env.API_3RD_ID || "",
  API_3RD_SECRET_KEY: process.env.API_3RD_SECRET_KEY || "",
  API_3RD_TYPE: process.env.API_3RD_TYPE || "",
  API_3RD_MAX_REQUEST : process.env.API_3RD_MAX_REQUEST || 5,
}

