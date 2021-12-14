import React, { useRef } from "react";
import tr2 from "./tr2.png";
import run from "./run.png";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import { Parallax } from "react-scroll-parallax";
import { useInViewport } from "react-in-viewport";

function Objective() {
  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const classNameImg =
    "Objective-img" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");
  const data = useStaticQuery(graphql`
    query ObjectiveQuery {
      directus {
        Objective {
          title
          subtitle
          desc
        }
      }
    }
  `);

  return (
    <div className="Objective">
      <div className="Objective-container">
        <div className="Objective-stats"></div>
        <div className="Objective-content">
          <div className="Objective-content-container">
            <div className="Objective-text">
              <div className="Objective-subtitle">
                {data.directus.Objective.title}
              </div>
              <div className="Objective-title title">
                {data.directus.Objective.subtitle}
              </div>
              <div className="Objective-desc">
                {data.directus.Objective.desc}
              </div>
            </div>
            <div className="Objective-img-container">
              <img src={tr2} alt="" className={classNameImg} ref={itemRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="Objective-background-container">
        <Parallax y={["0px", "100px"]} x={["0px", "100px"]} tagOuter="div">
          <img src={run} alt="" className="Objective-background-run" />
        </Parallax>
      </div>
    </div>
  );
}

export default Objective;
