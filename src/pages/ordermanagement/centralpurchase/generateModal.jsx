import React, { useEffect, useMemo, useState } from "react";
import { TableBody, Paper } from "@mui/material";
import BasicModal from "../../../components/modal/basicmodal";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import Basicbutton from "../../../components/button/basicbutton";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
const EditUserModalForm = ({
  openModal,
  handleCloseModal,
  editData,
  handleSave,
  drugId,
}) => {
  const drugDetailColumn = useMemo(() => [
    {
      id: "drugName",
      name: "PROGRAM NAME",
      sortable: false,
    },
    {
      id: "requestQty",
      name: "REQUEST QTY",
      sortable: false,
    },
    {
      id: "addedStrip",
      name: "	ADDED STRIP/BOTTLE",
      sortable: false,
    },

    {
      id: "totalStrip",
      name: "TOTAL STRIP/BOTTLE",
      sortable: false,
    },
    {
      id: "addQty",
      name: "ADD STRIP/BOTTLE",
      sortable: false,
    },
    {
      id: "totalUnit",
      name: "TOTAL UNIT",
      sortable: false,
    },
  ]);
  const [savedRow, setSavedRow] = useState(editData);

  const handleSubmit = (values) => {
    console.log("Submit Values", values);
    //  dispatch(createNewDrug(values));
  };

  const handleChange = (idx, id, e) => {
    const clone = [...savedRow];
    console.log("clone", clone);
    console.log("idx", idx, id);
    console.log("specificElement", clone[idx]);
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };

    console.log("clone", clone);

    setSavedRow(clone);
  };

  return (
    <>
      <BasicModal
        title=""
        show={openModal}
        close={() => {
          handleCloseModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_user"
      >
        <TableComponent columns={drugDetailColumn}>
          <TableBody>
            {editData &&
              editData?.length > 0 &&
              editData?.map((row, index) => {
                return (
                  <NormalTableRow key={row?.programId}>
                    <StyledTableCell padding="none">
                      {row?.programName}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      {row?.requestQty}
                    </StyledTableCell>
                    <StyledTableCell padding="none">
                      <BasicInput
                        type="number"
                        onChange={(e) => {
                          handleChange(
                            index,
                            "addedReq",
                            parseInt(e.target.value)
                          );
                        }}
                      />
                    </StyledTableCell>
                  </NormalTableRow>
                );
              })}

            {/* <EmptyRow loading={loading} tableData={notificationData} /> */}
          </TableBody>
        </TableComponent>
        <div className="row">
          <div className="d-flex justify-content-end">
            <Basicbutton
              buttonText="Save"
              className="btn btn-sm btn-success rounded-0"
              onClick={() => {
                const filt = [...savedRow].filter((ele) => {
                  if (Object.keys(ele).includes("addedReq")) {
                    return ele;
                  }
                });
                console.log("filter", filt);
                handleSave(filt, drugId);
                handleCloseModal();
              }}
            />
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default EditUserModalForm;
