// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8GGmfSCZPskxlJA8LVf33mlxKrY7E0Yo",
    authDomain: "movie-55676.firebaseapp.com",
    projectId: "movie-55676",
    storageBucket: "movie-55676.firebasestorage.app",
    messagingSenderId: "498386454783",
    appId: "1:498386454783:web:ba1991fb96eeffc961e4ca",
    measurementId: "G-FVVT5PVXES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
