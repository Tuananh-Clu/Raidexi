import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBuXcAvGt4y9z3jjnNjzKI2relU2nYHyRQ",
  authDomain: "raidexi.firebaseapp.com",
  projectId: "raidexi",
  storageBucket: "raidexi.firebasestorage.app",
  messagingSenderId: "467021714090",
  appId: "1:467021714090:web:27f3dbfa6a8c7ea19176d3",
  measurementId: "G-4WEEKZJVWL"
};
const firebaseapp=initializeApp(firebaseConfig);
const auth =getAuth(firebaseapp);
const provider = new GoogleAuthProvider();
export {auth,provider};