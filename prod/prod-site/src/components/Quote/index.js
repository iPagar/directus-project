import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import schndr from "./schndr.svg";
import wave from "./wave.svg";
import park from "./park.png";
import { useInViewport } from "react-in-viewport";

function Quote() {
  const data = useStaticQuery(graphql`
    query QuoteQuery {
      directus {
        Quote {
          img {
            id
          }
          id
          firstQuote
          person
          position
          secondQuote
          thirdQuote
          imgThirdQuote {
            id
          }
          personImage {
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
  const schndrRef = useRef();
  const { inViewport: inSchndrViewport, enterCount: enterSchndrCount } =
    useInViewport(schndrRef);
  const classNameSchndr =
    "Quote-img-schndr" +
    (inSchndrViewport && enterSchndrCount === 1 ? " animate-fadein" : "");

  const firstQuoteRef = useRef();
  const { inViewport: inFirstQuoteViewport, enterCount: enterFirstQuoteCount } =
    useInViewport(firstQuoteRef);
  const classNameFirstQuote =
    "Quote-container Quote-first-quote Quote-top" +
    (inFirstQuoteViewport && enterFirstQuoteCount === 1
      ? " animate-fadein-up"
      : "");

  const secondQuoteRef = useRef();
  const {
    inViewport: inSecondQuoteViewport,
    enterCount: enterSecondQuoteCount,
  } = useInViewport(secondQuoteRef);
  const classNameSecondQuote =
    "Quote-container Quote-second-quote Quote-bottom" +
    (inSecondQuoteViewport && enterSecondQuoteCount === 1
      ? " animate-fadein-down"
      : "");

  return (
    <div className="Quote">
      <div className="Quote-content">
        <div className={classNameFirstQuote} ref={firstQuoteRef}>
          <div className="Quote-content-text">
            <strong>{data.directus.Quote.firstQuote}</strong>
          </div>
        </div>
        <div className="Quote-person-container">
          <div className="Quote-person-image-container">
            <img
              src={`${data.site.siteMetadata.siteUrl}/assets/${data.directus.Quote.personImage.id}`}
              className="Quote-person-image"
              alt=""
            />
          </div>
          <div className="Quote-person-content">
            <div className="Quote-img-schndr-container">
              <img
                src={schndr}
                className={classNameSchndr}
                alt=""
                ref={schndrRef}
                style={{ animationDelay: `${5 / 10}s` }}
              />
            </div>
            <div>
              <em>{data.directus.Quote.person},</em>
            </div>
            <div>
              <em>{data.directus.Quote.position}</em>
            </div>
          </div>
        </div>
        <div className={classNameSecondQuote} ref={secondQuoteRef}>
          <div className="Quote-content-text">
            {data.directus.Quote.secondQuote}
          </div>
        </div>
        <div className="Quote-img-container">
          <div>
            <img src={park} alt="" className="Quote-img-park" />
          </div>
          <div>
            <img
              src={`${data.site.siteMetadata.siteUrl}/assets/${data.directus.Quote.img.id}`}
              className="Quote-img"
              alt=""
            />
          </div>
        </div>
        <div className="Quote-third-quote-container">
          <img
            src={`${data.site.siteMetadata.siteUrl}/assets/${data.directus.Quote.imgThirdQuote.id}`}
            className="Quote-third-quote-img"
            alt=""
          />
          <div className="Quote-third-quote-title">
            {data.directus.Quote.thirdQuote}
          </div>
        </div>
      </div>

      <div className="Quote-background-wave-container">
        <img src={wave} alt="" className="Quote-background-wave" />
      </div>
    </div>
  );
}

export default Quote;
