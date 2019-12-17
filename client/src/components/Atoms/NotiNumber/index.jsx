import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NotificationContext from "../../../context/NotificationContext";
import { usePrevious } from "../../../hooks/usePrevious";

const NotiNumberStyle = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 17px;
  font-size: 0.8rem;
  border-radius: 50%;
  background-color: red;
  border: 1px solid red;
  color: white;
  z-index: 1;
  font-weight: bold;
`;

const NotiNumber = props => {
  const { active } = props;
  const [notifications] = useContext(NotificationContext);
  const prevCount = usePrevious(notifications.length);

  if (active) {
    return <></>;
  }

  if (prevCount < notifications.length) {
    return <NotiNumberStyle>N</NotiNumberStyle>;
  }

  return <></>;
};

export default NotiNumber;
