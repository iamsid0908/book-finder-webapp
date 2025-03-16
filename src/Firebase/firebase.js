import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdcrLDqkk-bt-YyHc4Srb0Rta24bQ-Eqw",
  authDomain: "book-world-b0429.firebaseapp.com",
  projectId: "book-world-b0429",
  storageBucket: "book-world-b0429.firebasestorage.app",
  messagingSenderId: "943978359447",
  appId: "1:943978359447:web:07776959ef000f438bd7d2",
  measurementId: "G-P0SHSQVWPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider=new GoogleAuthProvider

export {app, auth, db,googleProvider};