import React, { useState, useEffect, useMemo } from "react";
import BasicModal from "../../../../components/modal/basicmodal";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Spinner } from "react-bootstrap";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import Basicbutton from "../../../../components/button/basicbutton";
const IssueDrugModal = ({
  title,
  loadingState,
  modalData,
  showAddDrugModal,
  handleAddDrugModal,
}) => {
  const [loading, setLoading] = useState(loadingState);
  const [remainingQty, setRemainingQty] = useState("");
  const [issuedQty, setIssuedQty] = useState("");

  const columns = useMemo(() => [
    {
      id: "ledgNo",
      name: "LEDG. NO",
      sortable: false,
    },
    {
      id: "batchNo",
      name: "BATCH NO.",
      sortable: false,
    },
    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: false,
    },

    {
      id: "qty",
      name: "QUANTITY",
      sortable: false,
    },

    {
      id: "issueQty",
      name: "ISSUE QTY",
      sortable: false,
    },
    ,
  ]);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <BasicModal
      title={title}
      show={showAddDrugModal}
      close={() => handleAddDrugModal()}
      isStatic={false}
      scrollable={true}
      isCenterAlign={true}
      fullScreen={false}
      key="add_drug_modal"
      size="lg"
    >
      <div className="row">
        <div className="col-12">
          <TableComponent
            columns={columns}
            paginationRequired={false}
            checkBoxRequired={false}
            colouredHeader={true}
          >
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="text-center" colSpan={12}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                modalData &&
                modalData?.length > 0 &&
                modalData?.map((data, index) => (
                  <TableRow key={data.id}>
                    {columns.map((d, k) => {
                      if (d.id === "issueQty") {
                        return (
                          <TableCell
                            key={k}
                            padding="none"
                            style={{
                              padding: "4px",
                              fontSize: "0.7rem",
                            }}
                          >
                            <BasicInput
                              type="number"
                              onChange={() => console.log("change")}
                            />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={k}
                            padding="none"
                            style={{
                              padding: "4px",
                              fontSize: "0.7rem",
                            }}
                          >
                            {data[d.id]}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableComponent>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <p>Total Quantity</p> {modalData?.avaibleQty}
            </div>

            <div>
              <p>Remaining Quantity</p> {remainingQty}
            </div>
            <div>
              <p>Issued Quantity</p> {issuedQty}
            </div>
          </div>
        </div>
      </div>
      <div className="row  mb-2">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <Basicbutton
              type="button"
              buttonText="ADD DRUG(S)"
              className="warning rounded-0 me-1"
            />

            <Basicbutton
              type="button"
              buttonText="CANCEL"
              className="danger rounded-0"
              onClick={handleAddDrugModal}
            />
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default IssueDrugModal;
