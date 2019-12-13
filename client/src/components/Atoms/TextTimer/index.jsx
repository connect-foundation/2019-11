import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDiffDateTime } from "../../../utils/dateUtil";

const TextTimerStyle = styled.span``;

const TextTimer = ({ auctionDeadline }) => {
  const { d, h, m, s } = getDiffDateTime(auctionDeadline);
  const [deadLine, setDeadLine] = useState(`시간 계산중`);

  useEffect(() => {
    if (!auctionDeadline) return;

    const timer = setInterval(() => {
      const { diff, d, h, m, s } = getDiffDateTime(auctionDeadline);
      if (diff > 0) {
        setDeadLine(`D-${d} ${h}:${m}:${s}`);
      } else {
        clearInterval(timer);
        setDeadLine(`경매 마감`);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [auctionDeadline, setDeadLine]);

  return <TextTimerStyle>{deadLine}</TextTimerStyle>;
};

export default TextTimer;
