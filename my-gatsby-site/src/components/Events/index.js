import React, { useState, useRef } from "react";
import "./style.css";
import Join from "../Join";
import Button from "../Button";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useStaticQuery, graphql } from "gatsby";
import { useInViewport } from "react-in-viewport";

function EventsItem(props) {
  const width = useWindowWidth();
  const path = `${props.siteUrl}/assets/${props.event.img.id}`;
  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const classNameDate =
    "Events-item-date" +
    (inViewport && enterCount === 1 ? " animate-fadein-down" : "");
  const classNameDesc =
    "Events-item-desc" +
    (inViewport && enterCount === 1 ? " animate-fadein-down" : "");
  const classNameTitle =
    "Events-item-title" +
    (inViewport && enterCount === 1 ? " animate-fadein-down" : "");

  return (
    <>
      {width > 800 && (
        <div className={classNameDate} ref={itemRef}>
          {new Intl.DateTimeFormat("ru", {
            day: "numeric",
            month: "long",
          }).format(new Date(props.event.date))}
        </div>
      )}
      <img src={path} alt="" className="Events-item-img" />
      <div className={classNameTitle} style={{ animationDelay: `${2 / 10}s` }}>
        {width <= 800 && (
          <div className="Events-item-date">
            {new Intl.DateTimeFormat("ru", {
              day: "numeric",
              month: "long",
            }).format(new Date(props.event.date))}
          </div>
        )}
        <div className="Events-item-title">{props.event.title}</div>
      </div>
      {width > 800 && <div></div>}
      <div className="Events-item-divider-container">
        {!props.isLast && <div className="Events-item-divider"></div>}
      </div>
      <div
        className={`${classNameDesc} ${
          props.isLast && "Events-item-desc-last"
        }`}
        style={{ animationDelay: `${2 / 10}s` }}
      >
        {props.event.desc}
      </div>
    </>
  );
}

function Events() {
  const data = useStaticQuery(graphql`
    query EventsQuery {
      directus {
        Events {
          desc
          id
          img {
            id
          }
          title
          date
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
  const events = data.directus.Events.filter((event) => {
    return new Date(event.date) > new Date();
  });

  const subtitle =
    events.length > 1
      ? new Intl.DateTimeFormat("ru", { month: "long" }).format(
          new Date(events[0].date)
        ) +
        " - " +
        new Intl.DateTimeFormat("ru", { month: "long" }).format(
          new Date(events[events.length - 1].date)
        )
      : events.length === 1
      ? Intl.DateTimeFormat("ru", { month: "long" }).format(
          new Date(events[0].date)
        )
      : "Нет ближайших мероприятий";
  const [isJoinActive, setIsJoinActive] = useState(false);
  const onJoinButtonClick = () => {
    setIsJoinActive(!isJoinActive);
  };

  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const classNameTitle =
    "Events-title title" +
    (inViewport && enterCount === 1 ? " animate-fadein" : "");
  const classNameSubtitle =
    "Events-subtitle" +
    (inViewport && enterCount === 1 ? " animate-fadein" : "");

  return (
    <div className="Events" ref={itemRef}>
      <div className="Events-content">
        <div className={classNameTitle}>Ближайшие мероприятия</div>
        <div className={classNameSubtitle}>{subtitle}</div>
        <div className="Events-item-list">
          {events
            .filter((event) => {
              return new Date(event.date) > new Date();
            })
            .map((event, i) => (
              <EventsItem
                key={event.id}
                event={event}
                siteUrl={data.site.siteMetadata.siteUrl}
                isLast={events.length - 1 === i}
              />
            ))}
        </div>
        {events.length > 0 && (
          <div className="Events-button-container">
            <Button onClick={onJoinButtonClick}>УЧАСТВОВАТЬ</Button>
          </div>
        )}
      </div>
      <Join onClose={onJoinButtonClick} isActive={isJoinActive} />
    </div>
  );
}

export default Events;
