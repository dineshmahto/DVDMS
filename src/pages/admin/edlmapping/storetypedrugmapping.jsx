import React from "react";
import Basicbutton from "../../../components/button/basicbutton";
import CustomSelect from "../../../components/select/customSelect";
import TransferComponent from "../../../components/transfer/transferComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
const StoreTypeDrugMapping = () => {
  return (
    <Paper className="mt-2">
      <div className="container-fluid  border rounded">
        <div className="row text-center mt-3">
          <div className="col-6 offset-3">
            <h6 className="p-1">EDL MAPPING</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-9 offset-1">
            <div className="row mb-2">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">STORE TYPE</div>
                  <div className="col-8">
                    <CustomSelect options={[]} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <HorizonatalLine text="Drug List" />
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

export default StoreTypeDrugMapping;
