const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCM8LVafRLoXu9xX9aWebprFDutLoIGDi8",
    authDomain: "react-todo-d2dac.firebaseapp.com",
    projectId: "react-todo-d2dac",
    storageBucket: "react-todo-d2dac.appspot.com",
    messagingSenderId: "786870825604",
    appId: "1:786870825604:web:8d2fc926f9c5c79e7e08d1"
});

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };