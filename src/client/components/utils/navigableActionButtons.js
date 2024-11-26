import React from "react";
import navButtonCss from "./navbutton.css";

const NavigableActionButtons = ({ img, actionName, actionLink }) => {
  return (
    <div className={navButtonCss.ctaContainer}>
      <a href={actionLink} target="_blank" className={navButtonCss.link}>
        <img
          style={{ alignSelf: "center" }}
          src={img}
          alt={actionName}
          height={30}
          width={30}
        />
        <p style={{ alignSelf: "center" }}> {actionName}</p>
      </a>
    </div>
  );
};
export default NavigableActionButtons;
