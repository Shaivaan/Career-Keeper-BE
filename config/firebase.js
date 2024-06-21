const admin = require('firebase-admin');
const { firebaseConfig } = require('./firebaseConfigs');


const config = {
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
  }
admin.initializeApp(config);

const database = admin.firestore();

module.exports = { database };