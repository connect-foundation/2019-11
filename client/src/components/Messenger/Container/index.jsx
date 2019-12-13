import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import RoomElement from "./RoomElement";
import ChatContainer from "./ChatContainer";
import firebase from "../../../shared/firebase";

import userContext from "../../../context/UserContext";
import FoundImg from "../../../assets/found.png";

const MessengerDiv = styled.div`
  position: absolute;
  font-family: "BMJUA";
  left: 6rem;
  bottom: 1rem;
  width: ${props => (props.show ? "20" : 0)}rem;
  height: ${props => (props.show ? "25" : 0)}rem;
  border: ${props => (props.show ? "solid 0.1rem" : "")};
  border-color: var(--color-primary);
  background-color: white;
  border-radius: 10px;
  z-index: 30;

  transition: all 0.3s ease-in-out;
  &::before {
    overflow: hidden;
  }
  &::after {
    content: "";
    position: absolute;
    border-right: 1rem solid var(--color-primary);
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border: ${props => (props.show ? "" : 0)}rem;
    bottom: 1rem;
    left: -1rem;
  }
`;

const MessengerScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const MessengerInfo = styled.div`
  display: flex;
  font-family: "BMJUA";
  width: 17rem;
  flex-direction: column;
  justify-content: center;
  margin: 3rem auto;
  img {
    margin: 1rem auto;
    width: 10rem;
    height: 10rem;
  }
`;
function Container(props) {
  const [RoomList, setRoomList] = useState([]);
  const [isRoomList, setIsRoomList] = useState(true);
  const [RoomNumber, setRoomNumber] = useState(0);
  const [RoomUserId, setRoomUserId] = useState(0);

  const [user] = useContext(userContext);

  const USERID = user.id;

  let count = 0;
  function OpenMessenger() {
    if (count) {
      props.open();
    }
  }
  function listener(result) {
    if (result.val() === null) return;
    OpenMessenger();
    count++;
    let roomNumbers = Object.entries(result.val()).map(([key, value]) => ({
      RoomNumber: key,
      RecentMsg: value.recent ? value.recent.text : "",
      opponentUserId: getOpponentUserId(value)
    }));
    console.log(Object.entries(result.val()));
    setRoomList(roomNumbers);
  }
  useEffect(() => {
    firebase.getRoomList(String(USERID)).on("value", listener);
    return firebase.getRoomList(String(USERID)).off("value", function listener(result) {});
  }, [isRoomList]);

  function clickRoomList(flag) {
    setIsRoomList(flag);
  }
  const writeChat = e => {
    e.preventDefault();
    if (e.target.messengerText.value === "") return;
    firebase.writeChat(e.target.roomNumber.value, USERID, e.target.messengerText.value); //방번호, 유저번호
    e.target.messengerText.value = "";
  };

  function getOpponentUserId(object) {
    return Object.keys(object).filter(word => word !== String(USERID) && word !== "recent");
  }
  let initMessenger = () => {
    return isRoomList ? (
      <MessengerScroll>
        {RoomList.length === 0 ? (
          <MessengerInfo>
            <div>
              회원가입을 환영합니다!
              <br />
              <br />
              여기는 중고거래 사이트 팔다입니다!
              <br />
              <br />
              판매자와 소통을 시작해보세요!
              <br />
            </div>
            <img src={FoundImg} alt={"Image Found"}></img>
          </MessengerInfo>
        ) : (
          RoomList.map(value => {
            return (
              <RoomElement
                key={value.opponentUserId}
                clickroom={() => {
                  setRoomNumber(value.RoomNumber);
                  setRoomUserId(value.opponentUserId);
                  clickRoomList(false);
                }}
                roomUserId={value.opponentUserId}
                RecentMsg={value.RecentMsg}
              />
            );
          })
        )}
      </MessengerScroll>
    ) : (
      <ChatContainer
        clickback={() => {
          clickRoomList(true);
        }}
        roomNumber={RoomNumber}
        roomUserId={RoomUserId}
        writeChat={writeChat}
      ></ChatContainer>
    );
  };

  return <MessengerDiv show={props.show}>{initMessenger()}</MessengerDiv>;
}

export default Container;
