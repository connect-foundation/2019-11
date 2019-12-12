import * as admin from "firebase-admin";
import serviceAccount from "../config/firestore";
import { Today } from "../util/DateUtils";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_BASE_URL
});

export const addLog = (id: number, name: string, ip: string, path: string) => {
  const db = admin.firestore();
  const timestamp = Date.now().toString();

  db.collection(Today())
    .doc(timestamp)
    .set({
      id,
      name,
      ip,
      path
    });
};

export const readLog = (date: string) => {
  const db = admin.firestore();
  return db.collection(date).get();
};
