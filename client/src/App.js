import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import UserContext from "./context/UserContext";
import "./style/App.css";
import ModalContext from "./context/ModalContext";
import { Modal } from "../src/components/Molecules/CustomModal/Modal";
import NotificationContext from "./context/NotificationContext";
import MessengerContext from "./context/MessengerContext";
import SocketContext from "./context/SocketContext";
import { useSocket } from "./hooks/useSocket";

function App() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState({
    isOpen: false,
    component: null,
    props: {}
  });
  const [notifications, setNotifications] = useState([]);
  const [messengerOpen, setMessengerOpen] = useState(false);
  const { socket } = useSocket(user, setNotifications);

  return (
    <BrowserRouter>
      <MessengerContext.Provider value={[messengerOpen, setMessengerOpen]}>
        <ModalContext.Provider value={[modal, setModal]}>
          <UserContext.Provider value={[user, setUser]}>
            <SocketContext.Provider value={{ socket }}>
              <NotificationContext.Provider
                value={[notifications, setNotifications]}
              >
                {modal.isOpen ? <Modal /> : null}
                <div className="App">
                  <Router />
                </div>
              </NotificationContext.Provider>
            </SocketContext.Provider>
          </UserContext.Provider>
        </ModalContext.Provider>
      </MessengerContext.Provider>
    </BrowserRouter>
  );
}

export default App;
