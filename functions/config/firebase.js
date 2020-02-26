let firebase = require('firebase');

let firebaseConfig ={
    apiKey: "AIzaSyCfVv9IZJhm4sGRcFhLL_SB9pYkQladtzA",
    authDomain: "web-app-3d24a.firebaseapp.com",
    databaseURL: "https://web-app-3d24a.firebaseio.com",
    projectId: "web-app-3d24a",
    storageBucket: "web-app-3d24a.appspot.com",
    messagingSenderId: "794440820156",
    appId: "1:794440820156:web:42173cbf02d4fdebdd37b9"
  };

firebase.initializeApp(firebaseConfig);
exports.firebase=firebase;
exports.config = firebaseConfig;