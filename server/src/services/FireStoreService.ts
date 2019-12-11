import * as admin from "firebase-admin";
import serviceAccount from "../config/firestore";
import { Today } from "../util/DateUtils";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_BASE_URL
});

export const addLog = (id: number, name: string, ip: string, path: string) => {
  const db = admin.firestore();
  db.collection("API")
    .doc(Today())
    .set({
      id,
      name,
      ip,
      path,
      timestamp: Date.now()
    });
};

export const readLog = (date: string) => {
  const db = admin.firestore();
  return db
    .collection("API")
    .doc(date)
    .get();
};
