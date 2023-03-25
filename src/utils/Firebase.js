import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";


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

// console.log("messagingmessaging", messaging);
export const getTokenFunc = (setTokenFound) => {
    console.log("process.env.REACT_APP_GENERATED_MESSAGING_KEY", process.env.REACT_APP_GENERATED_MESSAGING_KEY);
    // console.log("messaging", messaging);
    isSupported()
    .then(async () => {
        const messaging = getMessaging(firebaseApp);
        try {
            const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_GENERATED_MESSAGING_KEY });
            console.log("currentTokencurrentToken", currentToken);
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                setTokenFound(currentToken);
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
            }
        } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
        }
    })
    .catch(() => {
        console.log("not supported");
    })
}

console.log("dbdbdb", storage);
// console.log("storage", storage);

export const onMessageListener = () =>
new Promise((resolve) => {
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});