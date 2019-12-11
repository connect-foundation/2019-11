import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import UserContext from "./context/UserContext";
import "./style/App.css";
import ModalContext from "./context/ModalContext";

function App() {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState({
    isOpen: false,
    component: null,
    message: "",
    props: {}
  });
  const ModalContent = modal.component;

  const handleClickModalBack = e => {
    setModal(state => ({ ...state, isOpen: false }));
  };

  return (
    <BrowserRouter>
      <ModalContext.Provider value={[modal, setModal]}>
        <UserContext.Provider value={[user, setUser]}>
          {modal.isOpen ? (
            <div id="modal">
              <div className="background" onClick={handleClickModalBack}></div>
              <div className="content">
                <ModalContent message={modal.message} {...modal.props} />
              </div>
            </div>
          ) : null}
          <div className="App">
            <Router />
          </div>
        </UserContext.Provider>
      </ModalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
