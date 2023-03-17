const dotenv = require('dotenv');
const admin = require('firebase-admin')
const serviceAccount = require("../serviceAccountKey.json");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  urlDb : process.env.URL_MONGODB_DEV,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SCRET_KEY,
  gmail: process.env.EMAIL,
  password: process.env.PASSWORD,
  admin
};