import * as firebase from "firebase"
import "firebase/database"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

function Firebase() {
  if (!firebase.apps.length) {
    //로딩 여부
    firebase.initializeApp(firebaseConfig) //설정 초기화
  }
  firebase.analytics()
  this.database = firebase.database()

  /**
   * 채팅 방 리스너
   */
  this.getRoomChat = (roomnumber, func) => {
    return this.database.ref("/messages/" + roomnumber + "/").on("value", func)
  }

  /**
   * 유저가 참여한 채팅방 목록 리스너
   */
  this.getRoomList = (userid, func) => {
    return this.database
      .ref("/rooms/")
      .orderByChild(userid)
      .equalTo(true)
      .on("value", func)
  } //query: room에서 1:true인것을 찾아라

  /**
   * 해당 채팅방에 메시지 입력
   */
  this.writeChat = (roomNumber, userid, text) => {
    this.database.ref("/messages/" + roomNumber + "/").push({
      userid: userid,
      text: text,
      time: this.now()
    })
    this.database.ref("/rooms/" + roomNumber + "/recent/").set({
      text: text
    })
  }
  this.now = () => {
    return new Date().getTime()
  }

  /**
   * 유저 신고
   */
  this.writeUserReport = (targetid, text) => {
    this.database.ref("/report/user/").push({
      targetid: targetid,
      text: text,
      time: this.now()
    })
  }

  /**
   * 제품 신고
   */
  this.writeProductReport = (targetid, text) => {
    this.database.ref("/report/product/").push({
      targetid: targetid,
      text: text,
      time: this.now()
    })
  }
}

export default new Firebase()
