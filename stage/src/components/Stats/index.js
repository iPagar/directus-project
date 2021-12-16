import React, { useMemo, useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import wave from "./wave.svg";
import { useInViewport } from "react-in-viewport";

function StatsItem(props) {
  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const className =
    "Stats-item-value" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");

  return (
    <div className="Stats-item" ref={itemRef}>
      <div
        className={className}
        style={{ animationDelay: `${props.index / 10}s` }}
      >
        {props.stat.value}
      </div>
      <div className="Stats-item-desc">{props.stat.desc}</div>
    </div>
  );
}

function StatsNotes(props) {
  return <div className="Stats-notes">{props.notes}</div>;
}

function Stats() {
  const data = useStaticQuery(graphql`
    query StatsQuery {
      directus {
        Stats {
          desc
          id
          notes
          value
        }
      }
    }
  `);
  return (
    <div className="Stats">
      <div className="Stats-container">
        <div className="Stats-content">
          {data.directus.Stats.map((stat, i) => (
            <StatsItem key={stat.id} stat={stat} index={i} />
          ))}
          {data.directus.Stats.filter((stat) => stat.notes).map((stat) => (
            <StatsNotes key={stat.id} notes={stat.notes} />
          ))}
        </div>
      </div>
      <div className="Stats-background-wave-container">
        <img src={wave} alt="" className="Stats-background-wave" />
      </div>
    </div>
  );
}

export default Stats;
