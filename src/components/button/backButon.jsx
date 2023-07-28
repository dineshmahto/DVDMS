import React from "react";
import { useNavigate } from "react-router-dom";
import Basicbutton from "./basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButon = ({ routePath, stateValue }) => {
  const navigate = useNavigate();
  return (
    <div className="row mt-2">
      <div className="d-flex jsutify-content-start">
        <Basicbutton
          buttonText="Back"
          className="warning rounded-0"
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() =>
            navigate(`/${routePath}`, {
              state: {
                stateValue,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default BackButon;
