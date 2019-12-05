import * as firebase from "firebase"
import "firebase/database"
import firebaseConfig from '../config/firebase.js'

function Firebase() {
  if (!firebase.apps.length) {
    //로딩 여부
    firebase.initializeApp(firebaseConfig) //설정 초기화
  }
  firebase.analytics()
  this.database = firebase.database()

  /**
   * 채팅 방 생성
   *
   */
  this.makeRoom = (myid, sellerid) => {
    return this.database
      .ref("/rooms/")
      .orderByChild(String(myid))
      .equalTo(true)
      .once("value")
      .then(result => {
        if (result.val() !== null) {
          let check = Object.keys(result.val()).reduce((acc, ele) => {
            if (
              Object.keys(result.val()[ele]).find(element => element === String(sellerid)) !==
              undefined
            ) {
              acc = false
            }
            return acc
          }, true)
          if (check) {
            let temp = {}
            temp[myid] = true
            temp[sellerid] = true
            return this.database.ref("/rooms/").push(temp)
          }
        } else {
          let temp = {}
          temp[myid] = true
          temp[sellerid] = true
          return this.database.ref("/rooms/").push(temp)
        }
      })
  }

  /**
   * 채팅 방 리스너
   */
  this.getRoomChat = roomnumber => {
    return this.database.ref("/messages/" + roomnumber + "/")
  }

  /**
   * 유저가 참여한 채팅방 목록 리스너
   */
  this.getRoomList = userid => {
    return this.database
      .ref("/rooms/")
      .orderByChild(userid)
      .equalTo(true)
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
