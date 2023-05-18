import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  active: {
    background: "black",
    color: "white",
  },
});

interface transferComponentProps {
  isDisabled: boolean | false;
  apiData: any[];
  selectedItem: any[];
  activeIndicies: any[];
  selectItemActiveIndices: any[];
  handleMoveSelectedItemToRight: () => void;
  handleMoveSelectedItemToLeft: () => void;
  handleShiftAllElementToRight: () => void;
  handleShiftAllElementToLeft: () => void;
  handleLeftListItemClick: (
    e: any,
    id: any,
    element: any,
    index: number
  ) => void;
  handleRightListItemClick: (
    e: any,
    id: any,
    element: any,
    index: number
  ) => void;
}
const TransferComponent: React.FC<transferComponentProps> = ({
  apiData,
  activeIndicies,
  handleMoveSelectedItemToRight,
  handleMoveSelectedItemToLeft,
  handleShiftAllElementToRight,
  handleShiftAllElementToLeft,
  handleLeftListItemClick,
  selectItemActiveIndices,
  selectedItem,
  handleRightListItemClick,
  isDisabled,
}) => {
  console.log("rendering");
  const classes = useStyles();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col border rounded border-secondary p-0"
            style={{
              height: "300px",
              overflowX: "hidden",
              overflowY: "scroll",
              borderWidth: "0px !important",
              pointerEvents: isDisabled ? "none" : "auto",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <ul className="list-group">
              {apiData &&
                apiData.length > 0 &&
                apiData.map((elem, i) => {
                  return (
                    <>
                      <li
                        key={elem?.id + i}
                        className={`list-group-item ${
                          activeIndicies[i] ? classes.active : ""
                        }`}
                        onClick={(e) =>
                          handleLeftListItemClick(e, elem?.id, elem, i)
                        }
                      >
                        {elem.name}
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>

          <div className="col-1 d-flex flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-1"
              onClick={handleMoveSelectedItemToRight}
              style={{
                cursor: isDisabled ? "not-allowed !important" : "pointer",
              }}
              disabled={isDisabled}
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                onClick={handleMoveSelectedItemToRight}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-1"
              onClick={handleMoveSelectedItemToLeft}
              disabled={isDisabled}
              style={{
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-1"
              onClick={handleShiftAllElementToRight}
              disabled={isDisabled}
              style={{
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-1"
              onClick={handleShiftAllElementToLeft}
              style={{
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
              disabled={isDisabled}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
          </div>
          <div
            className="col border rounded border-secondary p-0"
            style={{
              height: "300px",
              overflowX: "hidden",
              overflowY: "scroll",
              pointerEvents: isDisabled ? "none" : "auto",
              cursor: isDisabled ? "not-allowed" : "default",
            }}
          >
            <ul className="list-group list-group-flush">
              {selectedItem &&
                selectedItem.length > 0 &&
                selectedItem.map((elem, i) => {
                  return (
                    <>
                      <li
                        key={elem?.id}
                        style={{ borderBottom: "1px solid white" }}
                        className={`list-group-item border-bottom-white ${
                          selectItemActiveIndices[i] ? classes.active : ""
                        }`}
                        onClick={(e) =>
                          handleRightListItemClick(e, elem?.id, elem, i)
                        }
                      >
                        {elem?.name}
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransferComponent;
