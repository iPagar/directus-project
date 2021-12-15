import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import caf from "./caf.png";
import env from "./env.png";
import { FaAngleRight } from "react-icons/fa";
import wave from "./wave.svg";
import { useInViewport } from "react-in-viewport";

function Map() {
  const data = useStaticQuery(graphql`
    query MapQuery {
      directus {
        Map {
          desc
          id
          title
          img {
            id
          }
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);
  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const classNameTitle =
    "Map-title title" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");

  const mapRef = useRef();
  const { inViewport: inMapViewport, enterCount: enterMapCount } =
    useInViewport(mapRef);
  const classNameMap =
    "Map-img-container" +
    (inMapViewport && enterMapCount === 1 ? " animate-fadein" : "");

  const envRef = useRef();
  const { inViewport: inEnvViewport, enterCount: enterEnvCount } =
    useInViewport(envRef);
  const classNameEnv =
    "Map-background-env" +
    (inEnvViewport && enterEnvCount === 1 ? " animate-fadein" : "");

  const cafRef = useRef();
  const { inViewport: inCafViewport, enterCount: enterCafCount } =
    useInViewport(cafRef);
  const classNameCaf =
    "Map-background-caf" +
    (inCafViewport && enterCafCount === 1 ? " animate-fadein-right" : "");

  return (
    <div className="Map" ref={itemRef}>
      <div className="Map-content">
        <div className={classNameTitle}>{data.directus.Map.title}</div>
        <div className="Map-desc">{data.directus.Map.desc}</div>
        <a
          href="https://map.greenkgd.ru/"
          target="_blank"
          className={classNameMap}
          ref={mapRef}
          style={{ animationDelay: `${2 / 10}s` }}
        >
          <img
            src={`${data.site.siteMetadata.siteUrl}/assets/${data.directus.Map.img.id}`}
            className="Map-img"
            alt=""
          />
        </a>
        <div className="Map-button">
          <a
            href="https://map.greenkgd.ru/"
            target="_blank"
            className="Map-button-link"
          >
            <div>Подробнее</div>
            <FaAngleRight />
          </a>
        </div>
      </div>
      <div className="Map-background">
        <div className="Map-background-content">
          <div className="Map-background-caf-container">
            <img src={caf} alt="" className={classNameCaf} ref={cafRef} />
          </div>
          <div className="Map-background-env-container">
            <img src={env} alt="" className={classNameEnv} ref={envRef} />
          </div>
        </div>
      </div>
      <div className="Map-background-wave-container">
        <img src={wave} alt="" className="Map-background-wave" />
      </div>
    </div>
  );
}

export default Map;
