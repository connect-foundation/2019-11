import * as firebase from "firebase"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAHSM3f4Y4c8Kozd0Pg9hiu-5_nfH_vsco",
  authDomain: "palda-df880.firebaseapp.com",
  databaseURL: "https://palda-df880.firebaseio.com",
  projectId: "palda-df880",
  storageBucket: "palda-df880.appspot.com",
  messagingSenderId: "394836051912",
  appId: "1:394836051912:web:40109fba8a83287b47a2fd",
  measurementId: "G-5QB5V3XCBN"
}

function Firebase() {
  if (!firebase.apps.length) {
    //로딩 여부
    firebase.initializeApp(firebaseConfig) //설정 초기화
  }
  firebase.analytics()
  this.database = firebase.database()

  /**
   * 해당 채팅 방의 정보조회
   */
  this.getRoomData = roomnumber => {
    return this.database.ref("/rooms/" + roomnumber + "/").once("value")
  }

  /**
   * 해당 채팅 방의 최근 메시지 조회
   */
  this.getRoomRecentMsg = roomnumber => {
    return this.database
      .ref("/messages/" + roomnumber + "/")
      .orderByChild("time")
      .limitToLast(1)
      .once("value")
      .then(msg => {
        return msg.val()
      })
  }

  /**
   * 유저가 참여한 채팅방 조회
   */
  this.getRoomList = userid => {
    return this.database
      .ref("/rooms/")
      .orderByChild(userid)
      .equalTo(true)
      .once("value")
      .then(list => {
        return list.val()
      })
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
}

export default new Firebase()
