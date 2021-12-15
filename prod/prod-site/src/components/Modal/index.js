import React from "react";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import tree from "./tree.png";

function Modal(props) {
  if (props.isActive) {
    document.body.style.overflow = "hidden";
  }

  return (
    <div className={props.isActive ? "Modal Modal-active" : "Modal"}>
      <div className="Modal-content">
        <div className="Modal-content-container">
          {props.children}
          {/* <div className="Modal-content-container-tree">
            <img src={tree} alt="" />
          </div> */}
          <div
            className="Modal-close"
            onClick={() => {
              props.onClose();
              document.body.style.overflow = "overlay";
            }}
          >
            <FaPlus className="Modal-close-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
