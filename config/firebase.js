const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();


const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(serviceAccountPath)))
});
const database = admin.firestore();
module.exports = { database };