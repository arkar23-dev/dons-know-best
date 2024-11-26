import React from "react";
import { Padding, Header, Checkbox } from "@ombiel/aek-lib";
import CallToActionButton from "../components/button";
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

      {Array.from({ length: 3 }).map((_, indexSec) => (
        <React.Fragment key={indexSec}>{filterSec}</React.Fragment>
      ))}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Padding
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <p style={{ padding: 0, margin: 0, fontSize: "16px" }}>
            Narrow it down <span style={{ fontSize: "10px" }}>(Optional)</span>
          </p>
          <div>
            <span style={{ fontWeight: "bold", padding: 0 }}>Price</span>
            <br />
            <div style={{ display: "flex", gap: "16px" }}>
              <Checkbox label="$100" />
              <Checkbox label="$100" />
              <Checkbox label="$100" />
            </div>
          </div>
          <div>
            <span style={{ fontWeight: "bold", padding: 0 }}>Price</span>
            <br />
            <div style={{ display: "flex", gap: "16px" }}>
              <Checkbox label="$100" />
              <Checkbox label="$100" />
              <Checkbox label="$100" />
            </div>
          </div>
          <CallToActionButton style={{ width: "100%" }}>
            Search
          </CallToActionButton>
          <hr style={{ margin: "0", padding: "0" }} />
          <p style={{ textAlign: "center", margin: "0", padding: "0" }}>
            Still Can/&apost Decide
          </p>
          <CallToActionButton style={{ width: "100%" }} href="/results">
            Surprise me
          </CallToActionButton>
        </Padding>
      </div>
    </>
  );
}

export default index;
