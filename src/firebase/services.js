import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "./config";
export const addDocument = async (collections, data) => {
  console.log("Service is working");
  const addedDoc = await addDoc(collection(db, collections), data);
  console.log("added doc", addedDoc);
};
