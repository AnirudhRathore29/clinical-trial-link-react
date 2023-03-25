// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
// console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_KEY);
var firebaseConfig = {
    apiKey: "AIzaSyC3DXdLs93NgMBxiHZVJ_HIobFY-sM0zKU",
    authDomain: "clinical-trial-7fa28.firebaseapp.com",
    projectId: "clinical-trial-7fa28",
    storageBucket: "clinical-trial-7fa28.appspot.com",
    messagingSenderId: "6063884775",
    appId: "1:6063884775:web:fae1bfef5886ad27609542",
    measurementId: "G-SZZ0WTS0VQ",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

console.log("swmessaging", messaging);

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});