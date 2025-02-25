// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importing getAuth for authentication
//import { getFirestore } from 'firebase/firestore'; // Importing getFirestore for Firestore
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
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

// Initialize Firebase services
export const auth = getAuth(app); // Exporting the authentication instance
//export const db = getFirestore(app); // Exporting the Firestore instance

export const storage = getStorage(app); // Exporting the storage instance for images
