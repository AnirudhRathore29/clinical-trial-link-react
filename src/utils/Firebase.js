import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";


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

console.log("dbdbdb", storage);
// console.log("storage", storage);