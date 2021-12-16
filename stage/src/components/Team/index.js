import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import { useInViewport } from "react-in-viewport";

function TeamMember(props) {
  const className =
    "Team-member" +
    (props.inViewport && props.enterCount === 1 ? " animate-fadein" : "");

  return (
    <div
      className={className}
      style={{ animationDelay: `${props.index / 10}s` }}
    >
      <img
        src={`${props.siteUrl}/assets/${props.member.img.id}`}
        className="Team-member-img"
        alt=""
      />
      <div className="Team-member-person">{props.member.person}</div>
      <div className="Team-member-position">{props.member.position}</div>
    </div>
  );
}

function Team() {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      directus {
        Team {
          person
          position
          id
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
    "Team-title title" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");

  const contentRef = useRef();
  const { inViewport: inContentViewport, enterCount: enterContentCount } =
    useInViewport(contentRef);

  return (
    <div className="Team">
      <div className={classNameTitle} ref={itemRef}>
        Команда проекта
      </div>
      <div className="Team-content" ref={contentRef}>
        {data.directus.Team.map((member, i) => (
          <TeamMember
            member={member}
            key={member.id}
            index={i}
            inViewport={inContentViewport}
            enterCount={enterContentCount}
            siteUrl={data.site.siteMetadata.siteUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
