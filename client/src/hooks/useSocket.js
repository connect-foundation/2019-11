import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import apiConfig from "../config/api";

const { chatUrl } = apiConfig;

export const useSocket = (user, setNotifications) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (Object.keys(user).length === 0) return;

    const socket = io(chatUrl);

    socket.on("connect", () => {
      setSocket(socket);
    });

    socket.on("auctionResult", ({ type, product }) => {
      setNotifications(notis => [...notis, { type, product }]);
    });

    return () => {
      socket.close();
    };
  }, [user]);

  return { socket };
};
