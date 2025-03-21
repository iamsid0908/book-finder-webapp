import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APIKEY}`,
  authDomain: `${import.meta.env.VITE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_APPID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENTID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider=new GoogleAuthProvider

export {app, auth, db,googleProvider};