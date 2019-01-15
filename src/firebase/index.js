import firebase from "firebase/app";
require("dotenv").config();
import "firebase/storage";

// Initialize Firebase
var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "animal-foster-project.firebaseapp.com",
    databaseURL: "https://animal-foster-project.firebaseio.com",
    projectId: "animal-foster-project",
    storageBucket: "animal-foster-project.appspot.com",
    messagingSenderId: "303201055582"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
