import React, { useState, useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import noroot from "./noroot.png";
import Button from "../Button";
import Join from "../Join";
import { useInViewport } from "react-in-viewport";

function Outcome() {
  const data = useStaticQuery(graphql`
    query OutcomeQuery {
      directus {
        Outcome {
          id
          desc
        }
      }
    }
  `);
  const [isJoin, setIsJoin] = useState(false);
  const onButtonClick = () => {
    setIsJoin(!isJoin);
  };

  const descRef = useRef();
  const { inViewport, enterCount } = useInViewport(descRef);
  const classNameDesc =
    "Outcome-desc" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");

  const buttonRef = useRef();
  const { inButtonViewport, enterButtonCount } = useInViewport(buttonRef);
  const classNameButton =
    "Outcome-button" +
    (inButtonViewport && enterButtonCount === 1 ? " animate-fadein" : "");

  return (
    <div className="Outcome">
      <div className="Outcome-content">
        <div className={classNameDesc}>{data.directus.Outcome.desc}</div>
        <div className="Outcome-img-container">
          <img src={noroot} alt="" className="Outcome-img" />
        </div>
      </div>
      <div className="Outcome-button-container">
        <div className={classNameButton} ref={buttonRef}>
          <Button large onClick={onButtonClick}>
            Хочу участвовать
          </Button>
        </div>
      </div>
      <Join onClose={onButtonClick} isActive={isJoin} />
    </div>
  );
}

export default Outcome;
