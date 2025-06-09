// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR2eUtk5dgFtkFEdK-Hj5355bPy6PqHJw",
  authDomain: "proper-web-94784.firebaseapp.com",
  projectId: "proper-web-94784",
  storageBucket: "proper-web-94784.firebasestorage.app",
  messagingSenderId: "537756614200",
  appId: "1:537756614200:web:6bf9ee835210c671bbf0cd",
  measurementId: "G-8KP01DQT6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db }