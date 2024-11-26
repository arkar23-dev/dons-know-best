import React from "react";

export default function ScrollContainer(props) {
  return (
    <div
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
