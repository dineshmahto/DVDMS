import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
const DashBoardDrugCard = ({ text, count, iconName, total, bgColorCode }) => {
  return (
    <>
      <div
        className={`card rounded-0`}
        style={{ backgroundColor: `#${bgColorCode}` }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="text-white">
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</p>
            </div>
            <div className="opacity-25">
              <FontAwesomeIcon icon={iconName} size="3x" swapOpacity={true} />
            </div>
          </div>
          <p className="card-text text-white">{text}</p>
        </div>

        <div
          className="text-center text-white p-2"
          style={{ marginBottom: 0, backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          Total:{total}
        </div>
      </div>
    </>
  );
};
DashBoardDrugCard.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  iconName: PropTypes.element,
  total: PropTypes.number.isRequired,
  bgColorCode: PropTypes.string.isRequired,
};
export default DashBoardDrugCard;
