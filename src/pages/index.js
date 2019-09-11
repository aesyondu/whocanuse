import React, { Component } from "react";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import Layout from "../layout/layout";
import { Hero } from "../components/hero";
import { Heading } from "../components/typography";
import { LargeInfoBar } from "../components/infobars";
import { VisionTable, VisionRow } from "../components/vision-table";
import { About } from "../components/about";
import { SmallInfoBars } from "../components/small-info-bars";
import queryString from "query-string";
import { linkPath } from "../helpers/link";

/*----------------------------------------------------------
   Styles
----------------------------------------------------------*/

const ContentWrapper = styled("div")({
  maxWidth: "940px",
  margin: "50px auto 0 auto",
  "@media screen and (max-width: 960px)": {
    padding: "0 20px"
  }
});

const InfoBarWrapper = styled("div")({
  display: "flex",
  marginTop: "30px",
  "& + &": {
    marginTop: "10px"
  },
  justifyContent: "space-between",
  "@media screen and (max-width: 780px)": {
    flexDirection: "column"
  }
});

/*----------------------------------------------------------
   Main Layout
----------------------------------------------------------*/

class IndexPage extends Component {
  constructor(props) {
    super(props);

    let foreground = "663399";
    let background = "663399";
    let fontSize = "20";
    let foregroundText = "FFFFFF";
    let backgroundText = "663399";

    const qs = queryString.parse(window.location.search);

    backgroundText = qs.b || "663399";
    foregroundText = qs.c || "FFFFFF";
    fontSize = qs.f || "20";

    if (chroma.valid(foregroundText)) {
      foreground = foregroundText;
    }
    if (chroma.valid(backgroundText)) {
      background = backgroundText;
    }

    const style = qs.s || "";
    this.state = {
      foreground,
      foregroundText,
      background,
      backgroundText,
      fontSize,
      fontSizeText: fontSize,
      shadow: style.indexOf("s") !== -1,
      bold: style.indexOf("b") !== -1
    };
  }

  setForeground = color => {
    if (chroma.valid(color)) {
      this.setState({ foreground: color }, () => {
        window.history.pushState(
          undefined,
          "",
          `?b=${this.state.background}&f=${this.state.foreground}&t`
        );
      });
    }
    this.setState({ foregroundText: color });
  };

  setBackground = color => {
    if (chroma.valid(color)) {
      this.setState({ background: color }, () => {
        window.history.pushState(
          undefined,
          "",
          linkPath(
            this.state.background,
            this.state.foreground,
            this.state.fontSize,
            this.state.bold,
            this.state.shadow
          )
        );
      });
    }
    this.setState({ backgroundText: color });
  };

  setFontSize = fontSize => {
    if (!isNaN(Number(fontSize))) {
      this.setState({ fontSize: fontSize > 60 ? 60 : fontSize });
    }
    this.setState({ fontSizeText: fontSize });
  };

  setShadow = shadow => {
    this.setState({ shadow });
  };
  setBold = bold => {
    this.setState({ bold });
  };

  render() {
    return (
      <Layout>
        <Hero
          setBackground={this.setBackground}
          setForeground={this.setForeground}
          foreground={this.state.foreground}
          background={this.state.background}
          foregroundText={this.state.foregroundText}
          backgroundText={this.state.backgroundText}
          setFontSize={this.setFontSize}
          fontSize={this.state.fontSize}
          fontSizeText={this.state.fontSizeText}
          shadow={this.state.shadow}
          setShadow={this.setShadow}
          bold={this.state.bold}
          setBold={this.setBold}
        />
        <ContentWrapper>
          <Heading align="center">Who can use this color combination?</Heading>
          <SmallInfoBars
            foreground={this.state.foreground}
            background={this.state.background}
          />
          <InfoBarWrapper>
            <LargeInfoBar
              percent="97"
              name="Global Population (Online)"
            />
            <LargeInfoBar
              percent="80"
              name="Australian Population (Online)"
            />
          </InfoBarWrapper>
          <VisionTable>
            <VisionRow
              name="Regular Vision (Trichromatic)"
              description="Vision that’s sensitive to all three primary colours"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Protanomaly"
              description="Trouble distinguishing reds"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Protanopia"
              description="Red blind - Can’t see reds at all"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Deuteranomaly"
              description="Trouble distinguishing greens"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Deuteranopia"
              description="Green blind - Can’t see greens at all"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Tritanomaly"
              description="Trouble distinguishing blues"
              percent="-"
              number="11,000"
            />
            <VisionRow
              name="Tritanopia"
              description="Blue blind - Can’t see blues at all"
              percent="4"
              number="123,000"
            />
            <VisionRow
              name="Achromatopsia"
              description="Complete colour blindness, can only see shades"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Cataracts"
              description="Clouding of the lens in the eye that affects vision"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Glaucoma"
              description="Slight vision loss"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Hyperopia"
              description="Farsightedness - Trouble seeing things up close"
              percent="-"
              number="1,000,000"
            />
            <VisionRow
              name="Low Vision"
              description="Decreased ability to see to a degree that causes problems (not fixable by usual means such as glasses)"
              percent="-"
              number="1,000,000"
            />
          </VisionTable>
        </ContentWrapper>
        <About />
      </Layout>
    );
  }
}

export default IndexPage;
