import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, ...props }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px", // Default spacing between checkbox and label
  };

  return (
    <div style={containerStyle}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired, // Text for the label
};

export default Checkbox;
