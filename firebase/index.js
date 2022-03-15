const admin = require('firebase-admin');

const serviceAccount = require('../security/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

module.exports = {};