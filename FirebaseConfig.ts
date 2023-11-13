// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, getReactNativePersistence,initializeAuth} from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APP_FIREBASE_KEY,
    authDomain: process.env.EXPO_PUBLIC_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_FIREBASE_ID,
    measurementId: process.env.EXPO_PUBLIC_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP,{
    persistence:getReactNativePersistence(AsyncStorage)
})
// export const FIREBASE_AUTH=getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);