import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnvironmentData } from "worker_threads";
const firebaseConfig = {
  apiKey: getEnvironmentData("FIREBASE_API_KEY").toString() || "",
  authDomain: getEnvironmentData("FIREBASE_AUTH_DOMAIN").toString() || "",
  projectId: getEnvironmentData("FIREBASE_PROJECT_ID").toString() || "",
  storageBucket: getEnvironmentData("FIREBASE_STORAGE_BUCKET").toString() || "",
  messagingSenderId: getEnvironmentData("FIREBASE_MESSAGING_SENDER_ID").toString() || "",
  appId: getEnvironmentData("FIREBASE_APP_ID").toString() || "",
  measurementId: getEnvironmentData("FIREBASE_MEASUREMENT_ID").toString() || ""
};
const firebaseapp=initializeApp(firebaseConfig);
const auth =getAuth(firebaseapp);
const provider = new GoogleAuthProvider();
export {auth,provider};