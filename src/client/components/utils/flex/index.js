import React from "react";

export default function index({ gap = 16, style, ...props }) {
  return (
    <div style={{ display: "flex", gap: `${gap}px`, ...style }} {...props}>
      {props.children}
    </div>
  );
}
