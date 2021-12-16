import * as React from "react";
import Intro from "../components/Intro";
import Stats from "../components/Stats";
import Objective from "../components/Objective";
import Events from "../components/Events";
import Map from "../components/Map";
import Aims from "../components/Aims";
import Trees from "../components/Trees";
import Team from "../components/Team";
import Outcome from "../components/Outcome";
import Contacts from "../components/Contacts";
import Quote from "../components/Quote";
import Donate from "../components/Donate";
import Images from "../components/Images";
import "./style.css";
import { ParallaxProvider } from "react-scroll-parallax";

const IndexPage = () => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <ParallaxProvider>
      <main>
        <Intro />
        <Stats />
        <Objective />
        <Events />
        <Map />
        <Quote />
        <Aims />
        <Trees />
        <Donate />
        <Images />
        <Team />
        <Outcome />
        <Contacts />
      </main>
    </ParallaxProvider>
  );
};

export default IndexPage;
