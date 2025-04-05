import React, { useContext } from "react";
import DisplayStatus from "./DisplayStatus";
import { AuthContext } from "./LoginForm";

const AuthMessage = () => {
  const { statusType, statusMessage } = useContext(AuthContext);

  return (
    <DisplayStatus type={statusType} message={statusMessage} />
  );
};

export default AuthMessage;
