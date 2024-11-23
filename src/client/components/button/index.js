import React from "react";
import PropTypes from "prop-types";
import { Button } from "@ombiel/aek-lib";

const CallToActionButton = ({ children, ...rest }) => {
  const { style, ...props } = rest;
  const buttonStyle = {
    backgroundColor: "#00543c",
    color: "#fff",
    borderRadius: "0px",
    textTransform: "uppercase",
    padding: "12px 36px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    ...style,
  };

  return (
    <Button style={buttonStyle} {...props}>
      {children}
    </Button>
  );
};

CallToActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default CallToActionButton;
