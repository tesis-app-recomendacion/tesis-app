import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9uD5vxXFOD8Kz2BrqW1sZZmhS_M8YQEI",
  authDomain: "app-recomendacion-robotica-edu.firebaseapp.com",
  projectId: "app-recomendacion-robotica-edu",
  storageBucket: "app-recomendacion-robotica-edu.firebasestorage.app",
  messagingSenderId: "379445311506",
  appId: "1:379445311506:web:45448bdd935fc8ab6a40cb",
  measurementId: "G-HTV477ZEWS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
