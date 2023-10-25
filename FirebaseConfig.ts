// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDknUQaRG8SUhUPL906O3gYFtTqu3lzugQ",
    authDomain: "explore-the-world-23c1e.firebaseapp.com",
    projectId: "explore-the-world-23c1e",
    storageBucket: "explore-the-world-23c1e.appspot.com",
    messagingSenderId: "820862504134",
    appId: "1:820862504134:web:63e30dc46bd5531a431bc7",
    measurementId: "G-SDTPF788YB",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
