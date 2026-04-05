import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnvironmentData } from "worker_threads";
const firebaseConfig = {
  apiKey: process.env.RAIDEXI_FIREBASE_API_KEY || "",
  authDomain: process.env.RAIDEXI_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.RAIDEXI_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.RAIDEXI_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.RAIDEXI_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.RAIDEXI_FIREBASE_APP_ID || "",
  measurementId: process.env.RAIDEXI_FIREBASE_MEASUREMENT_ID || ""
};
const firebaseapp=initializeApp(firebaseConfig);
const auth =getAuth(firebaseapp);
const provider = new GoogleAuthProvider();
export {auth,provider};