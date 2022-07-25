import React from "react";
import { db } from "../firebase/config";
import { useState } from "react";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);
  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }
    const unsubscribe = collection.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribe;
  }, [collection, condition]);
  return documents;
};
export default useFirestore;
