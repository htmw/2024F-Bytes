const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');


const firebaseConfig = {
    apiKey: "AIzaSyAe7TJricoqXVbED19z0Zxrs4doWVVCbK0",
    authDomain: "speakez-c8803.firebaseapp.com",
    databaseURL: "https://speakez-c8803-default-rtdb.firebaseio.com",
    projectId: "speakez-c8803",
    storageBucket: "speakez-c8803.firebasestorage.app",
    messagingSenderId: "498760908458",
    appId: "1:498760908458:web:c06c7e89203985e7f69ad3",
    measurementId: "G-G7D516L074"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;
