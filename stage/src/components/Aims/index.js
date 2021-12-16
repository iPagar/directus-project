import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import park from "./park.png";
import noroot from "./noroot.png";
import { useInViewport } from "react-in-viewport";
import { Parallax } from "react-scroll-parallax";

function Aims() {
  const data = useStaticQuery(graphql`
    query AimsQuery {
      directus {
        Aims {
          desc
          id
        }
      }
    }
  `);
  const titleRef = useRef();
  const { inViewport: inTitleViewport, enterCount: enterTitleCount } =
    useInViewport(titleRef);
  const classNameTitle =
    "Aims-title title" +
    (inTitleViewport && enterTitleCount === 1 ? " animate-fadein-up" : "");

  return (
    <div className="Aims">
      <div className="Aims-content">
        <div className="Aims-img-images">
          <img src={park} className="Aims-img-park" alt="" />
          <Parallax
            className="Aims-img-noroot-container"
            y={[0, 25]}
            x={[0, 100]}
            tagOuter="div"
          >
            <img src={noroot} className="Aims-img-noroot" alt="" />
          </Parallax>
        </div>

        <div className="Aims-content-list">
          <div className={classNameTitle} ref={titleRef}>
            Направления работы
          </div>
          {data.directus.Aims.map((aim, i) => (
            <div key={aim.id} className="Aims-item">
              <div className="Aims-item-index-container">
                <div className="Aims-item-index">{i + 1}</div>
              </div>
              <div>{aim.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Aims;
