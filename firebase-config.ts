// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwRFv8xHZ9PWmPa4eNUKfZTdu62RIYOhk",
    authDomain: "codeprojekt-fb8eb.firebaseapp.com",
    projectId: "codeprojekt-fb8eb",
    storageBucket: "codeprojekt-fb8eb.firebasestorage.app",
    messagingSenderId: "869175359687",
    appId: "1:869175359687:web:b94462507c96809c6ee6e2",
    measurementId: "G-J4F9Q0MXV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
