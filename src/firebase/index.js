import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWheWKB_CZ5fY-sMqcTkuJ5zKGWhwekR8",
    authDomain: "animal-foster-project.firebaseapp.com",
    databaseURL: "https://animal-foster-project.firebaseio.com",
    projectId: "animal-foster-project",
    storageBucket: "animal-foster-project.appspot.com",
    messagingSenderId: "303201055582"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
