import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MESSAGING_ID,
})

export const db = firebaseApp.firestore()
export const storage = getStorage(firebaseApp);
const messaging = getMessaging(firebaseApp);


export const getTokenFunc = (setTokenFound) => {
    console.log("process.env.REACT_APP_GENERATED_MESSAGING_KEY", process.env.REACT_APP_GENERATED_MESSAGING_KEY);
    console.log("messaging", messaging);
    return getToken(messaging, {vapidKey: process.env.REACT_APP_GENERATED_MESSAGING_KEY}).then((currentToken) => {
        console.log("currentTokencurrentToken", currentToken);
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
}

console.log("dbdbdb", storage);
// console.log("storage", storage);