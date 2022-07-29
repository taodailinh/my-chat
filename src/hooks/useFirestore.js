// import React from "react";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
// import { push } from "firebase/database";

const useFirestore = (collections, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      const collectionRef = collection(db, collections);
      const q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          console.log("snapshotdoc", doc.data());
        });
        const queriedDocuments = [];
        snapshot.forEach((doc) => {
          queriedDocuments.push({ ...doc.data(), id: doc.data().id });
        });
        setDocuments(queriedDocuments);
      });
      return unsubscribe;
    }
  }, [collections, condition]);
  return documents;
};

export default useFirestore;
