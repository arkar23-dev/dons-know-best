import React from "react";
import scrollCss from "./index.css";

export default function ScrollContainer(props) {
  return (
    <div
      className={scrollCss.no_scrollbar}
      style={{
        width: "100%",
        overflow: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        ...props.style,
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}
