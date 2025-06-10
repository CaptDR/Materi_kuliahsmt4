// firebaseConfig.js
import { getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBDc71X7fTO45pJCR2wXCa0q1QpvKFyjLY",
    authDomain: "deltaromeo-app.firebaseapp.com",
    projectId: "deltaromeo-app",
    storageBucket: "deltaromeo-app.appspot.com",
    messagingSenderId: "530756757187",
    appId: "1:530756757187:android:d32d050c1ff7d1af966476"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth + persistence untuk React Native
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };