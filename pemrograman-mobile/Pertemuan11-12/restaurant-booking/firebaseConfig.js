import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACBMvthcCedwR4nZ-Xiu4V07OyeEBEQic",
    authDomain: "restaurant-booking-666dc.firebaseapp.com",
    projectId: "restaurant-booking-666dc",
    storageBucket: "restaurant-booking-666dc.firebasestorage.appspot.com",
    messagingSenderId: "396272933577",
    appId: "1:396272933577:android:25aaf3d45abf8d9ef24b18"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };