import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import btncity from "./btncity.png";
import beetbarrel from "./beetbarrel.svg";
import { useInViewport } from "react-in-viewport";

function Contacts() {
  const data = useStaticQuery(graphql`
    query ContactsQuery {
      directus {
        Contacts {
          title
          id
          img {
            id
          }
          href
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

  const contentRef = useRef();
  const { inViewport, enterCount } = useInViewport(contentRef);
  const classNameItem =
    "Contacts-item" +
    (inViewport && enterCount === 1 ? " animate-fadein-right" : "");
  const classNameCreators =
    "Contacts-creators" +
    (inViewport && enterCount === 1 ? " animate-fadein-right" : "");

  return (
    <div className="Contacts">
      <div className="Contacts-content" ref={contentRef}>
        {data.directus.Contacts.map((contact, i) => (
          <div
            key={contact.id}
            className={classNameItem}
            style={{ animationDelay: `${i / 10}s` }}
          >
            <div className="Contacts-item-title">{contact.title}</div>
            <a
              href="https://map.greenkgd.ru/"
              target="_blank"
              className="Contacts-item-img-container"
            >
              <img
                src={`${data.site.siteMetadata.siteUrl}/assets/${contact.img.id}`}
                className="Contacts-item-img"
                alt=""
              />
            </a>
          </div>
        ))}
        <div
          className={classNameCreators}
          style={{ animationDelay: `${data.directus.Contacts.length / 10}s` }}
        >
          Создали и поддерживают{" — "}
          <a href="https://beetbarrel.ru/" target="_blank">
            <img src={beetbarrel} alt="" className="Contacts-beetbarrel" />{" "}
          </a>
          <br />
          {" и "}
          <a href="https://odin-it.ru/" target="_blank">
            <strong>ODIN-IT</strong>
          </a>
        </div>
      </div>
      <img src={btncity} alt="" className="Contacts-img" />
    </div>
  );
}

export default Contacts;
