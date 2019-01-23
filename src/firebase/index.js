import firebase from "firebase/app";
import "firebase/storage";
import "firebase/messaging";
import { FIREBASE_API_KEY, WEB_PUSH_KEY } from "./keys";

// Initialize Firebase
var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "animal-foster-project.firebaseapp.com",
    databaseURL: "https://animal-foster-project.firebaseio.com",
    projectId: "animal-foster-project",
    storageBucket: "animal-foster-project.appspot.com",
    messagingSenderId: "303201055582"
};
firebase.initializeApp(config);

//Firebase Storage

const storage = firebase.storage();

// //Firebase Cloud Messaging
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(WEB_PUSH_KEY);

// //request permission for notifications
// messaging
//     .requestPermission()
//     .then(() => console.log("Notification Permission Granted"))
//     .catch(err => {
//         console.log("Unable to get permission to notify.", err);
//     });
// //Get Instance ID token
// messaging
//     .getToken()
//     .then(currentToken => {
//         if (currentToken) {
//             sendTokenToServer(currentToken);
//             updateUIForPushEnabled(currentToken);
//         } else {
//             //Show permission request
//             console.log(
//                 "No Instance ID token available. Request permission to generate one."
//             );
//             //Show permission UI
//             updateUIForPushPermissionRequired();
//             setTokenSentToServer(false);
//         }
//     })
//     .catch(err => {
//         console.log("An error occurred while retrieving token.", err);
//         showToken("Error retrieving Instance ID token", err);
//         setTokenSentToServer(false);
//     });

// //Callback fired if Instance ID token is updated
// messaging.onTokenRefresh(() => {
//     messaging
//         .getToken()
//         .then(refreshedToken => {
//             console.log("Token refreshed");
//             //Indicate that the new Instance ID token has not yet been sent to the app server
//             setTokenSentToServer(false);
//             //Send Instance ID token to app server
//             sendTokenToServer(refreshedToken);
//         })
//         .catch(err => {
//             console.log("Unable to retrieve refreshed token", err);
//             showToken("Unable to retrieve refreshed token", err);
//         });
// });

export {
    storage,
    //  messaging,
    firebase as default
};
