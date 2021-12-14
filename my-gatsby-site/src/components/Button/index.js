import React from "react";
import "./style.css";

function Button(props) {
  return (
    <button
      className={`Button ${
        !props.isSecondary ? "Button-primary" : "Button-secondary"
      } ${props.large ? "Button-large" : ""}`}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
}

export default Button;
