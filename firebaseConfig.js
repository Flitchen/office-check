// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvxHT2lC6vAcwU0hf0CLsBJlFR8x-hK1s",
  authDomain: "officecheck-ae859.firebaseapp.com",
  projectId: "officecheck-ae859",
  storageBucket: "officecheck-ae859.appspot.com",
  messagingSenderId: "748207531780",
  appId: "1:748207531780:web:0867d53380527f3bab5251",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const roomsRef = collection(db, "rooms");
