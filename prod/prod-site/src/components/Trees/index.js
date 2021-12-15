import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import { useInViewport } from "react-in-viewport";
import wave from "./wave.svg";

function Tree(props) {
  const imgRef = useRef();
  const { inViewport: inImgViewport, enterCount: enterImgCount } =
    useInViewport(imgRef);
  const classNameImg =
    "Trees-img" +
    (inImgViewport && enterImgCount === 1 ? " animate-fadein-up" : "");

  return (
    <img
      key={props.id}
      src={`${props.siteUrl}/assets/${props.id}`}
      className={classNameImg}
      style={{ animationDelay: `${props.index / 10}s` }}
      alt=""
      ref={imgRef}
    />
  );
}

function TreeLi(props) {
  const classNameLi =
    props.inUlViewport && props.enterUlCount === 1 ? "animate-fadein-up" : "";

  return (
    <li
      className={classNameLi}
      style={{ animationDelay: `${props.index / 10}s` }}
    >
      <div>{props.title}</div>
    </li>
  );
}

function Trees() {
  const data = useStaticQuery(graphql`
    query TreesQuery {
      directus {
        Trees {
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
  const titleRef = useRef();
  const { inViewport: inTitleViewport, enterCount: enterTitleCount } =
    useInViewport(titleRef);
  const classNameTitle =
    "Trees-title title" +
    (inTitleViewport && enterTitleCount === 1 ? " animate-fadein-up" : "");

  const ulRef = useRef();
  const { inViewport: inUlViewport, enterCount: enterUlCount } =
    useInViewport(ulRef);

  return (
    <div className="Trees">
      <div className="Trees-content">
        {data.directus.Trees.map((tree, i) => (
          <Tree
            key={tree.id}
            index={i}
            siteUrl={data.site.siteMetadata.siteUrl}
            id={tree.img.id}
          />
        ))}
        <div className="Trees-content-list">
          <div
            className={classNameTitle}
            ref={titleRef}
            style={{
              animationDelay: `${data.directus.Trees.length / 10}s`,
            }}
          >
            Деревья
            <br />и кустарники
          </div>
          <ul ref={ulRef}>
            {data.directus.Trees.map((tree, i) => (
              <TreeLi
                key={tree.id}
                index={i}
                title={tree.title}
                inUlViewport={inUlViewport}
                enterUlCount={enterUlCount}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="Trees-background-wave-container">
        <img src={wave} alt="" className="Trees-background-wave" />
      </div>
    </div>
  );
}

export default Trees;
