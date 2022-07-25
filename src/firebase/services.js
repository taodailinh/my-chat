import { serverTimestamp } from "firebase/firestore";
import firebaseApp, { db } from "./config";
export const addDocument = (collection, data) => {
  const query = db.collection(collection);
  query.add({
    ...data,
    createdAt: serverTimestamp(),
  });
};
