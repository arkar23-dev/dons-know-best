import React from "react";
import { Padding, Header, Checkbox } from "@ombiel/aek-lib";
import CallToActionButton from "../components/button";
import { router } from "../route";
import BadgeButton from "../components/badge";

function index() {
  const filterSec = (
    <Padding style={{ marginBottom: "16px" }}>
      <Header
        level={5}
        style={{ textTransform: "uppercase", fontWeight: "700" }}
      >
        time of day
      </Header>
      <div
        style={{
          width: "100%",
          overflow: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
        </div>
      </div>
    </Padding>
  );
  return (
    <>
      <Padding>
        <Header
          level={4}
          style={{ textTransform: "uppercase", textAlign: "center" }}
        >
          What Would You Like TO EAT?
        </Header>
      </Padding>

      {Array.from({ length: 10 }).map((_, indexSec) => (
        <React.Fragment key={indexSec}>{filterSec}</React.Fragment>
      ))}

      <Padding>
        <Checkbox label="$100" />
        <CallToActionButton style={{ width: "100%" }}>
          Search
        </CallToActionButton>
      </Padding>
    </>
  );
}

export default index;
