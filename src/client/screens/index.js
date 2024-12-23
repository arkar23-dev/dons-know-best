import React from "react";
import { Padding, Header, Checkbox, BasicSegment } from "@ombiel/aek-lib";
import CallToActionButton from "../components/button";
import BadgeButton from "../components/badge";
import ScrollContainer from "../components/scrollContainer";
import Flex from "../components/utils/flex";
import "../css/index.css";
import { router } from "../route";
import useFilterStore from "../hooks/useFilterStore";

const filters = {
  "time of day": [
    {
      key: "time_of_day",
      value: "breakfast",
      label: "breakfast",
    },
    {
      key: "time_of_day",
      value: "lunch",
      label: "lunch",
    },
    {
      key: "time_of_day",
      value: "dinner",
      label: "dinner",
    },
  ],
  "Fast And Casual": [
    {
      key: "fast_and_casual",
      value: "burgers",
      label: "burgers",
    },
    {
      key: "fast_and_casual",
      value: "deli",
      label: "deli",
    },
    {
      key: "fast_and_casual",
      value: "pizza",
      label: "pizza",
    },
  ],
  cuisine: [
    {
      key: "cuisine",
      value: "asian",
      label: "asian",
    },
    {
      key: "cuisine",
      value: "mediterranean",
      label: "mediterranean",
    },
    {
      key: "cuisine",
      value: "latino",
      label: "latino",
    },
  ],
  "Dessert & Cafe": [
    {
      key: "dessert_and_cafe",
      value: "pastries",
      label: "pastries",
    },
    {
      key: "dessert_and_cafe",
      value: "ice_cream",
      label: "Ice Cream",
    },
    {
      key: "dessert_and_cafe",
      value: "boba",
      label: "boba",
    },
  ],
  "Diet Specific Food": [
    {
      key: "diet",
      value: "vegetarian",
      label: "vegetarian",
    },
    {
      key: "diet",
      value: "vegan",
      label: "vegan",
    },
    {
      key: "diet",
      value: "halal",
      label: "halal",
    },
  ],
};
function Index() {
  const store = useFilterStore();

  return (
    <BasicSegment style={{ padding: 0 }}>
      <Padding>
        <Header
          level={4}
          style={{
            textAlign: "center",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          What Would You Like TO EAT?
        </Header>
      </Padding>
      {Object.keys(filters).map((label) => {
        return (
          <Padding key={label} style={{ marginBottom: "16px" }}>
            <Header
              level={5}
              style={{ textTransform: "uppercase", fontWeight: "700" }}
            >
              {label}
            </Header>
            <ScrollContainer>
              <Flex gap={8}>
                {filters[label].map((item) => {
                  return (
                    <BadgeButton
                      key={`${item.value}-${item.label}`}
                      onClick={() => {
                        store.set(`filters.${item.key}`, item.value);
                      }}
                      active={store.get(`filters.${item.key}`) === item.value}
                    >
                      {item.label}
                    </BadgeButton>
                  );
                })}
              </Flex>
            </ScrollContainer>
          </Padding>
        );
      })}

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
