import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { fireConfig } from "../config/firestore";
import { Today } from "../util/DateUtils";

const init = () => {
  firebase.initializeApp(fireConfig); //설정 초기화
};

export const addLog = (id: number, name: string, path: string) => {
  const db = firebase.database();
  db.ref(`/API/${Today()}`).push({
    id,
    name,
    path,
    timeStamp: new Date()
  });
};

export const readLog = (date: string) => {
  const db = firebase.database();
  return db.ref(`/API/${Today()}`).toJSON();
};

export default { init };
