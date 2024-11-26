import React, { useState, useEffect } from "react";
import { Padding, Header, Checkbox, BasicSegment } from "@ombiel/aek-lib";
import CallToActionButton from "../components/button";
import BadgeButton from "../components/badge";
import ScrollContainer from "../components/scrollContainer";
import Flex from "../components/utils/flex";
import "../css/index.css";
import { router } from "../route";
import store from "../store";

function Index() {
  const time = store.state.filters.time_of_day;
  const [, setUpdate] = useState(0); // A dummy state to force updates

  useEffect(() => {
    const handleChange = () => {
      setUpdate((prev) => prev + 1); // Increment the state to force re-render
    };

    store.on("change", handleChange);

    // Cleanup on component unmount
    return () => {
      store.off("change", handleChange);
    };
  }, []);

  return (
    <BasicSegment style={{ padding: 0 }}>
      <Padding>
        <Header
          level={4}
          style={{
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          What Would You Like TO EAT?
        </Header>
      </Padding>
      {/* time of day  */}
      <Padding style={{ marginBottom: "16px" }}>
        <Header
          level={5}
          style={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          time of day
        </Header>
        <ScrollContainer>
          <Flex gap={8}>
            <BadgeButton
              onClick={() => {
                store.set("filters.time_of_day", "breakfast");
              }}
              active={store.get("filters.time_of_day") === "breakfast"}
            >
              Breakfast
            </BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
            <BadgeButton onClick={() => console.log("hi")}>deli</BadgeButton>
          </Flex>
        </ScrollContainer>
      </Padding>
      {/* time of day  */}

      {/* fast and cascual  */}
      <Padding style={{ marginBottom: "16px" }}>
        <Header
          level={5}
          style={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          Fast And Casual
        </Header>
        <ScrollContainer>
          <Flex gap={8}>
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
          </Flex>
        </ScrollContainer>
      </Padding>
      {/* fast and cascual  */}

      {/* cusine  */}
      <Padding style={{ marginBottom: "16px" }}>
        <Header
          level={5}
          style={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          Cusine
        </Header>
        <ScrollContainer>
          <Flex gap={8}>
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
          </Flex>
        </ScrollContainer>
      </Padding>
      {/* cusine  */}

      {/* Dessert & cafe */}
      <Padding style={{ marginBottom: "16px" }}>
        <Header
          level={5}
          style={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          Dessert & cafe
        </Header>
        <ScrollContainer>
          <Flex gap={8}>
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
          </Flex>
        </ScrollContainer>
      </Padding>
      {/* Dessert & cafe */}

      {/* Diet Specific Food */}
      <Padding style={{ marginBottom: "16px" }}>
        <Header
          level={5}
          style={{ textTransform: "uppercase", fontWeight: "700" }}
        >
          Diet Specific Food
        </Header>
        <ScrollContainer>
          <Flex gap={8}>
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
          </Flex>
        </ScrollContainer>
      </Padding>
      {/* Diet Specific Food */}

      <Flex style={{ justifyContent: "center" }}>
        <Padding
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            marginBottom: "12px",
          }}
        >
          <p style={{ fontSize: "16px" }}>
            Narrow it down <span style={{ fontSize: "10px" }}>(Optional)</span>
          </p>

          <div>
            <span style={{ fontWeight: "500" }}>Price</span>
            <br />
            <Flex gap={16}>
              <Checkbox label="$100" />
              <Checkbox label="$100" />
              <Checkbox label="$100" />
            </Flex>
          </div>

          <div>
            <span style={{ fontWeight: "500" }}>Service Option</span>
            <br />
            <Flex>
              <Checkbox label="Dine-in" />
              <Checkbox label="Take-out" />
            </Flex>
          </div>
          <CallToActionButton
            style={{ width: "100%" }}
            onClick={() => router.goto("/results")}
          >
            Search
          </CallToActionButton>
        </Padding>
      </Flex>

      <hr />

      <Flex style={{ justifyContent: "center" }}>
        <Padding
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <p style={{ textAlign: "center" }}>Still can&#39;t Decide</p>
          <CallToActionButton
            style={{ width: "100%", background: "teal" }}
            onClick={() => router.goto("/results")}
          >
            Surprise me
          </CallToActionButton>
        </Padding>
      </Flex>
    </BasicSegment>
  );
}

export default Index;
