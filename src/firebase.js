// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzmoMGNJxuEsgtDPd2EMaxDRFtwzgUU3g",
  authDomain: "a-job-portal-65f1d.firebaseapp.com",
  projectId: "a-job-portal-65f1d",
  storageBucket: "a-job-portal-65f1d.firebasestorage.app",
  messagingSenderId: "715099498849",
  appId: "1:715099498849:web:535431d6b4a97e1d08bd20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;