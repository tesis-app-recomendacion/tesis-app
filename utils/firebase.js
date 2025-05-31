// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9uD5vxXFOD8Kz2BrqW1sZZmhS_M8YQEI",
  authDomain: "app-recomendacion-robotica-edu.firebaseapp.com",
  projectId: "app-recomendacion-robotica-edu",
  storageBucket: "app-recomendacion-robotica-edu.firebasestorage.app",
  messagingSenderId: "379445311506",
  appId: "1:379445311506:web:45448bdd935fc8ab6a40cb",
  measurementId: "G-HTV477ZEWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);