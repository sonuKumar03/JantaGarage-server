let admin = require('firebase-admin');
var serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://web-app-3d24a.firebaseio.com",
    storageBucket: "gs://web-app-3d24a.appspot.com.appspot.com"

});

const db = admin.firestore();

module.exports={ db,admin}; 