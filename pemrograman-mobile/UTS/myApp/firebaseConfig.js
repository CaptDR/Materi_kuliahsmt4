import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDc71X7fTO45pJCR2wXCa0q1QpvKFyjLY",
    authDomain: "deltaromeo-app.firebaseapp.com",
    projectId: "deltaromeo-app",
    storageBucket: "deltaromeo-app.firebasestorage.googleapis.com",
    messagingSenderId: "530756757187",
    appId: "1:530756757187:android:d32d050c1ff7d1af966476"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, db, auth };