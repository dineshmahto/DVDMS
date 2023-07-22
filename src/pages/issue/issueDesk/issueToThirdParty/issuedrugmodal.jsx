import React, { useState, useEffect, useMemo } from "react";
import BasicModal from "../../../../components/modal/basicmodal";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Spinner } from "react-bootstrap";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import Basicbutton from "../../../../components/button/basicbutton";
import dayjs from "dayjs";
import NormalTableRow from "../../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
const IssueDrugModal = ({
  title,
  loadingState,
  modalData,
  showAddDrugModal,
  handleAddDrugModal,
  handleIssueDrugList,
}) => {
  console.log("modalDatas", modalData);
  const [loading, setLoading] = useState(loadingState);
  const [issuedQty, setIssuedQty] = useState(0);

  const [updatedDrugDetail, setUpdatedDrugDetail] = useState([]);
  const [data, setData] = useState([]);
  const columns = useMemo(() => [
    {
      id: "stockId",
      name: "LEDG. NO",
      sortable: false,
    },
    {
      id: "batchNo",
      name: "BATCH NO.",
      sortable: false,
    },
    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: false,
    },

    {
      id: "availableQty",
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

  const handleChange = (idx, id, e, data, setData) => {
    const clone = [...data];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

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
          >
            <TableBody>
              {modalData &&
                modalData?.length > 0 &&
                modalData?.map((data, index) => (
                  <NormalTableRow key={data.id}>
                    {columns.map((d, k) => {
                      if (d.id === "issueQty") {
                        return (
                          <StyledTableCell key={k} padding="none">
                            <BasicInput
                              type="number"
                              onChange={(e) => {
                                if (e.target.value === "") {
                                  setIssuedQty(0);
                                }
                                setIssuedQty(parseInt(e?.target?.value));
                                handleChange(
                                  index,
                                  d?.id,
                                  parseInt(e?.target?.value),
                                  modalData,
                                  setUpdatedDrugDetail
                                );
                              }}
                            />
                          </StyledTableCell>
                        );
                      } else if (d.id === "expiryDate") {
                        return (
                          <StyledTableCell key={k} padding="none">
                            {formatDate(data[d.id])}
                          </StyledTableCell>
                        );
                      } else {
                        return (
                          <StyledTableCell key={k} padding="none">
                            {data[d.id]}
                          </StyledTableCell>
                        );
                      }
                    })}
                  </NormalTableRow>
                ))}
            </TableBody>
          </TableComponent>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <p>Total Quantity</p> {modalData[0]?.availableQty}
            </div>

            <div>
              <p>Remaining Quantity</p>{" "}
              {parseInt(modalData[0]?.availableQty - issuedQty)}
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
              onClick={() => {
                console.log("updatedDrugList", updatedDrugDetail);
                handleIssueDrugList(updatedDrugDetail);
                handleAddDrugModal();
              }}
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
