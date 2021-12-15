import React, { useState, useMemo, useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import tree from "./tree.png";
import Button from "../Button";
import SendMoney from "../SendMoney";
import Join from "../Join";
import { useInViewport } from "react-in-viewport";
import useWindowWidth from "../../hooks/useWindowWidth";

function Volunteer(props) {
  const width = useWindowWidth();
  const {
    person,
    img: { id },
  } = props.volunteer;
  const maxWidth = width <= 800 ? width / 4 : 200;
  const minWidth = width <= 800 ? width / 5 : 150;
  const maxPadding = width <= 800 ? width / 50 : 10;
  const minPadding = 5;

  const volunteerRef = useRef();
  const { inViewport: inVolunteerViewport, enterCount: enterVolunteerCount } =
    useInViewport(volunteerRef);
  const classNameVolunteer =
    "Donate-volunteer-content" +
    (inVolunteerViewport && enterVolunteerCount === 1
      ? " animate-fadein-right"
      : "");

  const paddingTop = useMemo(
    () =>
      Math.floor(Math.random() * (maxPadding + 60 - minPadding + 25 + 2)) +
      minPadding +
      25,
    [width]
  );
  const paddingLeft = useMemo(
    () =>
      Math.floor(Math.random() * (maxPadding - minPadding + 2)) + minPadding,
    [width]
  );
  const paddingRight = useMemo(() => {
    return (
      Math.floor(Math.random() * (maxPadding - minPadding + 2)) + minPadding
    );
  }, [width]);
  const widthCalc = useMemo(
    () => Math.floor(Math.random() * (maxWidth - minWidth + 25)) + minWidth,
    [width]
  );

  return (
    <div
      className={classNameVolunteer}
      style={{
        maxWidth: "100%",
        paddingTop,
        paddingLeft,
        paddingRight,
      }}
      ref={volunteerRef}
    >
      <div
        className="Donate-volunteer-image-container"
        style={{
          width: widthCalc,
        }}
      >
        <img
          src={`${props.siteUrl}/assets/${id}`}
          className="Donate-volunteer-image"
          alt=""
        />
      </div>
      {width <= 800 ? (
        person.split(" ").map((piece, i) => <div key={i}>{piece}</div>)
      ) : (
        <div style={{ textAlign: "center" }}>
          {person.split(" ")[0]}
          <br />
          <div>
            {person
              .split(" ")
              .filter((_piece, i) => i > 0)
              .map((piece) => piece)
              .join(" ")}
          </div>
        </div>
      )}
    </div>
  );
}

function Donate() {
  const data = useStaticQuery(graphql`
    query DonateQuery {
      directus {
        Donate {
          desc
          id
          subtitle
          quote
          title
          treesDesc
          treesTitle
          donateDesc
        }
        Volunteers {
          id
          person
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
  const [isSendMoneyActive, setIsSendMoneyActive] = useState(false);
  const onSendMoneyButtonClick = () => {
    setIsSendMoneyActive(!isSendMoneyActive);
  };
  const [isJoinActive, setIsJoinActive] = useState(false);
  const onJoinButtonClick = () => {
    setIsJoinActive(!isJoinActive);
  };
  const volunteers = useMemo(() => {
    return data.directus.Volunteers.map((volunteer) => (
      <Volunteer
        volunteer={volunteer}
        siteUrl={data.site.siteMetadata.siteUrl}
        key={volunteer.id}
      />
    ));
  }, [data.directus.Volunteers]);
  const width = useWindowWidth();

  const treesTitleRef = useRef();
  const { inViewport: inTreesTitleViewport, enterCount: enterTreesTitleCount } =
    useInViewport(treesTitleRef);
  const classNameTreesTitle =
    "Donate-trees-quote-title title" +
    (inTreesTitleViewport && enterTreesTitleCount === 1
      ? " animate-fadein-up"
      : "");

  const titleRef = useRef();
  const { inViewport: inTitleViewport, enterCount: enterTitleCount } =
    useInViewport(titleRef);
  const classNameTitle =
    "Donate-trees-title title" +
    (inTitleViewport && enterTitleCount === 1 ? " animate-fadein-up" : "");

  const treesQuoteRef = useRef();
  const { inViewport: inTreesQuoteViewport, enterCount: enterTreesQuoteCount } =
    useInViewport(treesQuoteRef);
  const classNameTreesQuote =
    "Donate-trees-quote" +
    (inTreesQuoteViewport && enterTreesQuoteCount === 1
      ? " animate-fadein-up"
      : "");

  const quoteRef = useRef();
  const { inViewport: inQuoteViewport, enterCount: enterQuoteCount } =
    useInViewport(quoteRef);
  const classNameQuote =
    "Donate-quote" +
    (inQuoteViewport && enterQuoteCount === 1 ? " animate-fadein-up" : "");

  const descRef = useRef();
  const { inViewport: inDescViewport, enterCount: enterDescCount } =
    useInViewport(descRef);
  const classNameDesc =
    "Donate-desc" +
    (inDescViewport && enterDescCount === 1 ? " animate-fadein-up" : "");

  const circleRef = useRef();
  const { inViewport: inCircleViewport, enterCount: enterCircleCount } =
    useInViewport(circleRef);
  const classNameCircle =
    "Donate-background-circle" +
    (inCircleViewport && enterCircleCount === 1 ? " animate-fadein-scale" : "");

  const treeRef = useRef();
  const { inViewport: inTreeViewport, enterCount: enterTreeCount } =
    useInViewport(treeRef);
  const classNameTree =
    "Donate-background-tree" +
    (inCircleViewport && enterCircleCount === 1 ? " animate-fadein-up" : "");

  const buttonContainerRef = useRef();
  const {
    inViewport: inButtonContainerViewport,
    enterCount: enterButtonContainerCount,
  } = useInViewport(buttonContainerRef);
  const classNameButtonContainer =
    "Donate-button-container" +
    (inButtonContainerViewport && enterButtonContainerCount === 1
      ? " animate-fadein"
      : "");

  return (
    <div className="Donate">
      <div className="Donate-content">
        <div className="Donate-subtitle">{data.directus.Donate.subtitle}</div>
        <div className={classNameTitle} ref={titleRef}>
          {data.directus.Donate.title}
        </div>
        <div className="Donate-content-container">
          <div>
            <div className={classNameDesc} ref={descRef}>
              {data.directus.Donate.desc}
            </div>
            {width > 800 && (
              <div className={classNameQuote} ref={quoteRef}>
                {data.directus.Donate.quote}
              </div>
            )}
          </div>
          {width > 800 && (
            <div className="Donate-trees-container">
              <div className={classNameTreesTitle} ref={treesTitleRef}>
                {data.directus.Donate.treesTitle}
              </div>
              <div className={classNameTreesQuote} ref={treesQuoteRef}>
                {data.directus.Donate.treesDesc}
              </div>
            </div>
          )}
        </div>
        <div className="Donate-background" ref={circleRef}>
          <img src={tree} className={classNameTree} alt="" />
          <div className={classNameCircle}></div>
        </div>
      </div>
      {width > 800 && <div className="Donate-volunteer">{volunteers}</div>}
      <div className={classNameButtonContainer} ref={buttonContainerRef}>
        <div className="Donate-button">
          <Button large onClick={onJoinButtonClick}>
            Стать волонтером
          </Button>
        </div>
        <div className="Donate-button">
          <Button large isSecondary onClick={onSendMoneyButtonClick}>
            Сделать пожертвование
          </Button>
        </div>
        <div className="Button-donate">{data.directus.Donate.donateDesc}</div>
      </div>
      {width <= 800 && (
        <>
          <div className={classNameQuote} ref={quoteRef}>
            {data.directus.Donate.quote}
          </div>
          <div className="Donate-trees-container">
            <div className={classNameTreesTitle} ref={treesTitleRef}>
              {data.directus.Donate.treesTitle}
            </div>
            <div className="Donate-trees-quote">
              {data.directus.Donate.treesDesc}
            </div>
          </div>
          <div className="Donate-volunteer">{volunteers}</div>
        </>
      )}
      <Join onClose={onJoinButtonClick} isActive={isJoinActive} />
      <SendMoney
        onClose={onSendMoneyButtonClick}
        isActive={isSendMoneyActive}
      />
    </div>
  );
}

export default Donate;
