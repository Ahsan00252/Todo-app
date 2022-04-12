import React from "react";
import { useEffect } from "react";

function Alert({ msg, type, removeAlert }) {
  useEffect(() => {
    const timeout = setInterval(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="para">
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
}

export default Alert;
