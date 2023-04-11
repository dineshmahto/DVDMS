import React, { useEffect, useState } from "react";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Paper } from "@mui/material";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import API from "../../../config/config";

const ProgrameFundingSource = () => {
  const fetchApi = async (signal) => {
    await API.get("", { signal })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request canceled", error.message);
        } else {
          if (error.response) {
            console.log("Response", error.response);
          } else if (error.request) {
            console.log("Error Request", error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    fetchApi(signal);
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  return (
    <Paper className="mt-2">
      <div className="container-fluid  border rounded">
        <div className="row text-center mt-1">
          <div className="col-6 offset-3">
            <h6 className="p-1">PROGRAMME FUNDING SOURCE</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-9 offset-1">
            <div className="row mb-2">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">Programme Name</div>
                  <div className="col-8">
                    <CustomSelect options={[]} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">Financial Year</div>
                  <div className="col-8">
                    <CustomSelect options={[]} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <HorizonatalLine text="Funding Source List" />
            </div>
            <div className="row">
              <div className="col-10 offset-1">
                <div className="row text-center">
                  <p>
                    Select Funding Source (Move selected Funding Source from
                    Left to Right)
                  </p>
                </div>
                <div className="row">
                  <TransferComponent />
                </div>
                <div className="row mt-2 mb-2">
                  <div className="d-flex justify-content-center">
                    <div className="me-1">
                      <Basicbutton
                        buttonText="Save"
                        className="btn btn-success"
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-2"
                          />
                        }
                      />
                    </div>
                    <div className="ms-1">
                      <Basicbutton
                        buttonText="Cancel"
                        className="btn btn-danger"
                        icon={
                          <FontAwesomeIcon icon={faXmark} className="me-2" />
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProgrameFundingSource;
