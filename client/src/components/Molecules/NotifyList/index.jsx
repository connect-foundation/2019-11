import React, { useContext } from "react";
import styled from "styled-components";
import userContext from "../../../context/UserContext";
import { NotifyItem } from "./NotifyItem";
import NotificationContext from "../../../context/NotificationContext";

const BackColor = styled.div`
  background-color: var(--color-gray-lighter);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-lighter);
  align-items: center;
  width: 100%;
`;

function Component(props) {
  const [notifications, setNotifications] = useContext(NotificationContext);

  return (
    <BackColor>
      <InfoDiv>
        <NotifyItem />
        <NotifyItem success />
        {notifications.map(noti => {
          return <NotifyItem {...noti} />;
        })}
      </InfoDiv>
    </BackColor>
  );
}

export default Component;
