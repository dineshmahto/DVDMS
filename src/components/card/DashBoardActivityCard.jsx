import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DashBoardActivityCard = ({ count, text, iconName, className }) => {
  return (
    <>
      <div className={`card rounded-0 ${className}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="text-white">
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</p>
            </div>
            <div className="opacity-25">
              <FontAwesomeIcon icon={iconName} size="3x" />
            </div>
          </div>
          <p className="card-text text-white">{text}</p>
        </div>
      </div>
    </>
  );
};
DashBoardActivityCard.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  iconName: PropTypes.element,
};

export default DashBoardActivityCard;
