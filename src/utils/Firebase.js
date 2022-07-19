import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyC3DXdLs93NgMBxiHZVJ_HIobFY-sM0zKU',
    authDomain: 'clinical-trial-7fa28.firebaseapp.com',
    projectId: 'clinical-trial-7fa28',
    storageBucket: 'clinical-trial-7fa28.appspot.com',
    messagingSenderId: '6063884775',
    appId: '1:6063884775:web:fae1bfef5886ad27609542',
    measurementId: 'G-SZZ0WTS0VQ',
})

const db = firebaseApp.firestore()



export default db;