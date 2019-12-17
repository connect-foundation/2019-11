import React, { useEffect, useContext } from "react";
import styled from "styled-components";
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

function Component() {
  const [notifications] = useContext(NotificationContext);

  return (
    <BackColor>
      <InfoDiv>
        {notifications.map(noti => {
          return (
            <NotifyItem
              key={`${noti.product.id}${noti.product.title}`}
              {...noti}
            />
          );
        })}
      </InfoDiv>
    </BackColor>
  );
}

export default Component;
