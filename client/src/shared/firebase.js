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
  this.getChatReceive = this.database.ref("messenger/") //데이터 리스너

  this.getRoomData = roomNumber => {
    return this.database.ref("messeger/" + roomNumber).once("value")
  }

  this.getChatReceive.on("value", function(snapshot) {
    // updateStarCount(postElement, snapshot.val())
    return snapshot.val()
  })

  this.getChatAll = roomNumber => {
    return this.database.ref("messeger/" + roomNumber).on("value", function(text) {
      return text.val()
    })
  }

  this.writeChat = (roomNumber, userid, text) => {
    this.database.ref("messenger/" + roomNumber).push({
      userid: userid,
      text: text,
      time: this.now()
    })
  }
  this.now = () => {
    return new Date().toString()
  }
}

export default new Firebase()
