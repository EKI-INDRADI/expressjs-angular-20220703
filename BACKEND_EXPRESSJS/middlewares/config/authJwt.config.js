require('dotenv').config();

module.exports = {
  secret: String(process.env.JWT_SECRET_KEY),
  API_3RD_API_JWT_TOKEN: String(process.env.API_3RD_API_JWT_TOKEN)
};
