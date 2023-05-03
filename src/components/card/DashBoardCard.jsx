import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faUpRightAndDownLeftFromCenter,
  faArrowsUpDownLeftRight,
  faRefresh,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const DashBoardCard = ({
  id,
  title,
  handleUnpin,
  handleReload,
  handleMinimize,
  handleFullScreen,
  children,
  onMouseMove,
  onClick,
  onMouseDown,
  onMouseUp,
  fullScreen,
  minimized,
}) => {
  const isFullScreen = (id) => fullScreen.indexOf(id) !== -1;
  const isMinimized = (id) => minimized.indexOf(id) !== -1;
  return (
    <>
      <div
        className="card"
        id={id}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div className="card-header p-3">
          <div className="d-flex justify-content-between">
            <div>{title}</div>
            <div className="d-flex">
              {isMinimized(id) ? (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="me-3"
                  onClick={handleMinimize}
                />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faArrowsUpDownLeftRight}
                    className="me-3"
                    onClick={handleUnpin}
                  />
                  <FontAwesomeIcon
                    icon={faRefresh}
                    className="me-3"
                    onClick={handleReload}
                  />
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="me-3"
                    onClick={handleMinimize}
                  />
                  <FontAwesomeIcon
                    icon={faUpRightAndDownLeftFromCenter}
                    className="me-3"
                    onClick={handleFullScreen}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="card-body"
          id={`card-body-${id}`}
          style={{ height: "200px", overflowY: "scroll" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
DashBoardCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleUnpin: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
  handleMinimize: PropTypes.func.isRequired,
  handleFullScreen: PropTypes.func.isRequired,
  children: PropTypes.element,
  fullScreen: PropTypes.array.isRequired,
  minimized: PropTypes.array.isRequired,
};

export default DashBoardCard;
