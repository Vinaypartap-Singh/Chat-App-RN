import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOx4KBFMjM-zEok6e4CivCAqUddF99zpc",
  authDomain: "chat-app-react-native-ffbc9.firebaseapp.com",
  projectId: "chat-app-react-native-ffbc9",
  storageBucket: "chat-app-react-native-ffbc9.appspot.com",
  messagingSenderId: "247335697262",
  appId: "1:247335697262:web:d2136638eab10e568f5f7f",
};
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
