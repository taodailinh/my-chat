import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDfYZeqK8ykC32sge9FlHXpgcI2uPYGvGE",
  authDomain: "my-chat-fed35.firebaseapp.com",
  projectId: "my-chat-fed35",
  storageBucket: "my-chat-fed35.appspot.com",
  messagingSenderId: "10236064412",
  appId: "1:10236064412:web:5f79b481326fc9f31fb359",
  measurementId: "G-8GVT6YSEWW",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export { db, auth };
export default firebaseApp;
