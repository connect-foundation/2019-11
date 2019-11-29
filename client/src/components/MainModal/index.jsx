import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

const MainModal = ({ open, onClose, login }) => {
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleSignUpClick = () => {
    setSignUpOpen(true);
  };

  const handleOnClose = () => {
    onClose();
    setSignUpOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleOnClose}>
      {signUpOpen === false ? (
        <LoginDialog
          close={handleOnClose}
          signUp={handleSignUpClick}
          login={login}
        />
      ) : (
        <SignUpDialog close={handleOnClose} login={login} />
      )}
    </Dialog>
  );
};

export default MainModal;
