import React from "react";

const BadgeButton = ({ active, children, ...props }) => {
  const defaultButtonStyle = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 18px",
    backgroundColor: active ? "#00543c" : "transparent",
    color: active ? "#fff" : "black",
    border: active ? "none" : "0.1px solid grey",
    borderRadius: "24px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    appearance: "none",
  };

  return (
    <button type="button" style={defaultButtonStyle} {...props}>
      {children}
    </button>
  );
};

export default BadgeButton;
