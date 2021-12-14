import React, { useRef } from "react";
import "./style.css";
import { useStaticQuery, graphql } from "gatsby";
import useWindowWidth from "../../hooks/useWindowWidth";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInViewport } from "react-in-viewport";

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="Images-button Images-button-left" onClick={onClick}>
      <FaAngleLeft />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="Images-button Images-button-right" onClick={onClick}>
      <FaAngleRight />
    </div>
  );
}

function ImagesSlider() {
  const width = useWindowWidth();
  const data = useStaticQuery(graphql`
    query ImagesQuery {
      directus {
        Images {
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
  const settings = {
    className: "Images-container",
    centerMode: true,
    infinite: true,
    centerPadding: width > 800 ? "100px" : 0,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {data.directus.Images.map((image) => (
        <div key={image.id} className="Images-img-container">
          <img
            src={`${data.site.siteMetadata.siteUrl}/assets/${image.img.id}`}
            className="Images-img"
            alt=""
          />
        </div>
      ))}
    </Slider>
  );
}

function Images() {
  const itemRef = useRef();
  const { inViewport, enterCount } = useInViewport(itemRef);
  const classNameTitle =
    "Images-title title" +
    (inViewport && enterCount === 1 ? " animate-fadein-up" : "");

  return (
    <div className="Images">
      <div className="Images-content-container">
        <div className="Images-content">
          <div className={classNameTitle} ref={itemRef}>
            Работаем
          </div>
        </div>
      </div>
      <ImagesSlider />
    </div>
  );
}

export default Images;
