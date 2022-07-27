import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
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
const db = getFirestore(firebaseApp);

// Use firebase emulator for creating fake Facebook account
connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);

export { db, auth };
export default firebaseApp;
