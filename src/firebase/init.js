// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR93IzR9BrcpIoeG4mJDlfT4_-GgrE8GY",
  authDomain: "fir-practice-24771.firebaseapp.com",
  projectId: "fir-practice-24771",
  storageBucket: "fir-practice-24771.firebasestorage.app",
  messagingSenderId: "259777501250",
  appId: "1:259777501250:web:96941f1737b3483f36f5db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db =  getFirestore();