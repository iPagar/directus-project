import React, { useState } from "react";
import frame from "./frame.png";
import upncity from "./upncity.png";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import Button from "../Button";
import Join from "../Join";
import { Parallax } from "react-scroll-parallax";

function Intro() {
  const data = useStaticQuery(graphql`
    query IntroQuery {
      directus {
        Intro {
          title
          subtitle
          id
          desc
        }
      }
    }
  `);
  const [isJoinActive, setIsJoinActive] = useState(false);
  const onJoinButtonClick = () => {
    setIsJoinActive(!isJoinActive);
  };

  return (
    <div className="Intro">
      <div className="Intro-container">
        <div className="Intro-content">
          <img src={frame} alt="" />
          <div className="Intro-title title animate-fadein-up">
            {data.directus.Intro.title.split(" ").map((part, i) => (
              <React.Fragment key={i}>
                {part}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="Intro-subtitle animate-fadein-up">
            {data.directus.Intro.subtitle}
          </div>
          <br />
          <div className="Intro-desc animate-fadein-up">
            {data.directus.Intro.desc}
          </div>
          <div className="Intro-button-container animate-fadein">
            <Button large onClick={onJoinButtonClick}>
              ХОЧУ УЧАСТВОВАТЬ!
            </Button>
          </div>
        </div>
      </div>
      <Join onClose={onJoinButtonClick} isActive={isJoinActive} />
      <Parallax
        className="Intro-upncity-container"
        y={["0px", "300px"]}
        tagOuter="div"
      >
        <img src={upncity} alt="" className="Intro-upncity" />
      </Parallax>
    </div>
  );
}

export default Intro;
