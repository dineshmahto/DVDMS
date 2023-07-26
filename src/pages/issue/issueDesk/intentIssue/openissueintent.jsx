import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import {
  faArrowLeft,
  faCircleXmark,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import {
  getIntentDrug,
  getIntentDrugResponse,
  saveIssueAgainstIntent,
  saveIssueAgainstIntentResponse,
} from "../../../../store/issue/action";
import { useNavigate } from "react-router-dom";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import { useLocation } from "react-router-dom";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../../common/constant/constant";
import BasicTextAreaField from "src/components/inputbox/textarea";
import NormalTableRow from "src/components/tables/datatable/normalTableRow";
import toastMessage from "src/common/toastmessage/toastmessage";

const IntentIssue = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("state", state);
  const navigate = useNavigate();
  const intentDrgResp = useSelector(
    (state) => state.issuereturn?.intentDrugResponse
  );
  const saveIssueAgnstIntResp = useSelector(
    (state) => state?.issuereturn?.saveIssueIntentResp
  );
  console.log("save", saveIssueAgnstIntResp);
  console.log("intentDrgResp", intentDrgResp);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [newIssueDrugDetails, setNewIssueDrugDetails] = useState([]);
  const [issueDrugDetails, setIssueDrugDetails] = useState([]);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    status: 99,
  });
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");

  const column1 = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: false,
    },
    {
      id: "request_qty",
      name: "REQUEST QTY",
      sortable: false,
    },
    {
      id: "avlQty",
      name: "AVAIL QTY",
      sortable: false,
    },
  ]);

  const columns = useMemo(() => [
    {
      id: "stockId",
      name: "STOCK ID",
      sortable: false,
    },
    {
      id: "DrugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: false,
    },

    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: false,
    },

    {
      id: "dayToExpire",
      name: "DAYS TO EXPIRE",
      sortable: false,
    },
    {
      id: "AvailableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },

    {
      id: "issuedQty",
      name: "ISSUED QTY",
      sortable: false,
    },
  ]);

  const selectedColumns = useMemo(() => [
    {
      id: "DrugName",
      name: "DRUG NAME",
      sortable: false,
    },
    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: false,
    },

    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: false,
    },

    {
      id: "dayToExpire",
      name: "DAYS TO EXPIRE",
      sortable: false,
    },
    {
      id: "AvailableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },

    {
      id: "issuedQty",
      name: "ISSUED QTY",
      sortable: false,
    },
    {
      id: "action",
      name: "ACTION",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getIntentDrug({
            requestId: state,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getIntentDrugResponse(""));
    };
  }, [controller, state]);

  useEffect(() => {
    if (
      intentDrgResp &&
      intentDrgResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setNewIssueDrugDetails(
        intentDrgResp?.data?.getIndentRequestDetail?.availableQty
      );
      setIssueDrugDetails(
        intentDrgResp?.data?.getIndentRequestDetail?.drugInfo
      );
      setLoading(false);
    }
  }, [intentDrgResp]);

  useEffect(() => {
    if (
      saveIssueAgnstIntResp &&
      saveIssueAgnstIntResp?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (saveIssueAgnstIntResp?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        toastMessage(
          "ISSUE INTENT",
          saveIssueAgnstIntResp?.data?.message,
          "success"
        );
        dispatch(saveIssueAgainstIntentResponse(""));
        navigate("/openIssueDesk");
      } else if (
        saveIssueAgnstIntResp?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage(
          "ISSUE INTENT",
          saveIssueAgnstIntResp?.data?.message,
          "error"
        );
        dispatch(saveIssueAgainstIntentResponse(""));
      }
    } else if (
      saveIssueAgnstIntResp &&
      saveIssueAgnstIntResp?.status === NETWORK_STATUS_CODE.PAGE_NOT_FOUND
    ) {
      toastMessage(
        "ISSUE INTENT",
        saveIssueAgnstIntResp?.data?.message,
        "error"
      );
      dispatch(saveIssueAgainstIntentResponse(""));
    }
  }, [saveIssueAgnstIntResp]);

  const handleStatusChange = (selectedOption) => {
    setController({
      ...controller,
      status: selectedOption?.value,
    });
  };

  const handleChange = (idx, id, e, data, setData) => {
    const clone = [...data];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  const handleIssueDrugList = (data) => {
    const filtered = [...data]?.filter((ele) => {
      if (ele?.hasOwnProperty("issuedQty")) {
        return ele;
      }
    });
    if (filtered.length === 0) {
      toastMessage(
        "Intent Issue",
        "please Enter the Issued Qty in Requet Drug Table",
        "info"
      );
      return;
    }
    let newElement = [];
    filtered?.map((element, index) => {
      const elementExist = displayData?.filter((item) => {
        return item.stockId === element?.stockId;
      });
      if (elementExist.length === 0) {
        if (element?.issuedQty > element?.AvailableQty) {
          toastMessage(
            "INTENT ISSUE",
            `Issued Qty cannot be greater than available Qty for stock Id ${element?.stockId}`,
            "error",
            "top-center"
          );
          return;
        }
        newElement.push(element);
      } else {
        for (let [i, item] of [...displayData]?.entries()) {
          if (item.stockId === element?.stockId) {
            displayData.splice(i, 1);
          }
        }
        if (element?.issuedQty > element?.AvailableQty) {
          toastMessage(
            "INTENT ISSUE",
            `Issued Qty cannot be greater than available Qty for stock Id ${element?.stockId}`,
            "error",
            "top-center"
          );
          return;
        }
        newElement.push(element);
      }
    });

    setDisplayData([...displayData, ...newElement]);
  };

  const handleRemoveSpecificRow = (idx) => {
    const clone = [...displayData];
    clone.splice(idx, 1);
    setDisplayData(clone);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex jsutify-content-start">
          <Basicbutton
            buttonText="Back"
            className="warning rounded-0"
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate("/openIssueToSubstore")}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ISSUE TO INDENT</p>
        </div>
      </div>
      <HorizonatalLine text="Intent Details" />
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: 99,
                  label: "NHM and Family Welfare",
                }}
                options={[
                  {
                    value: 99,
                    label: "NHM and Family Welfare",
                  },
                ]}
                onChange={handleStatusChange}
              />
            </div>

            <div className="col-auto">
              <label>
                Receiving Store :
                {intentDrgResp?.data?.getIndentRequestDetail?.fromStoreName}
              </label>
            </div>
            <div className="col-auto">
              <label>
                Intent ID : {intentDrgResp?.data?.getIndentRequestDetail?.id}
              </label>
            </div>
            <div className="col-auto">
              <label>Intent Date : </label>
            </div>
          </div>
        </div>
      </div>
      <Paper elevation={2}>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={column1}
              sortField={sortField}
              order={order}
              stickyHeader={true}
              colouredHeader={true}
              overFlow={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  issueDrugDetails &&
                  issueDrugDetails.length > 0 &&
                  issueDrugDetails?.map((data, index) => (
                    <StyledTableRow key={data.drugId + data?.programId}>
                      {column1.map((d, k) => {
                        return (
                          <StyledTableCell padding="none">
                            {data[d.id]}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  ))
                )}
                <EmptyRow loading={loading} tableData={issueDrugDetails} />
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>

      <div className="row mt-2">
        {displayData && displayData.length > 0 ? (
          <>
            <HorizonatalLine text="Selected List" />
            <div className="col-12">
              <Paper elevation={2}>
                <TableComponent
                  columns={selectedColumns}
                  sortField={sortField}
                  order={order}
                >
                  <TableBody>
                    {displayData &&
                      displayData?.length > 0 &&
                      displayData?.map((row, index) => {
                        return (
                          <NormalTableRow key={row?.stockId}>
                            {selectedColumns.map((d, k) => {
                              if (d.id === "action") {
                                return (
                                  <StyledTableCell
                                    padding="none"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCircleXmark}
                                      onClick={() =>
                                        handleRemoveSpecificRow(index)
                                      }
                                      size="2x"
                                    />
                                  </StyledTableCell>
                                );
                              }
                              return (
                                <StyledTableCell
                                  padding="none"
                                  style={{
                                    padding: "4px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {row[d.id]}
                                </StyledTableCell>
                              );
                            })}
                          </NormalTableRow>
                        );
                      })}
                  </TableBody>
                </TableComponent>

                <div className="col-12 mb-1">
                  <div className="row mb-2">
                    <div className="col-sm-12 col-md-8 col-lg-8 offset-md-2 offset-lg-2">
                      <label htmlFor="remarks" className="form-label">
                        Remarks
                      </label>
                      <BasicTextAreaField
                        name="remarks"
                        className="form-control shadow-none"
                        rows="3"
                        id="remarks"
                        onChange={(e) => {
                          setRemarks(e.target.value.trim());
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="me-1 mb-2">
                    <Basicbutton
                      className="primary rounded-0 me-2"
                      buttonText="Issue"
                      icon={
                        <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                      }
                      onClick={() => {
                        if (remarks === "") {
                          toastMessage(
                            "Intent Issue",
                            "Enter the Remarks",
                            "error"
                          );
                        } else {
                          let submitData = {
                            remarks: remarks,
                            list: [...displayData],
                            id: intentDrgResp?.data?.getIndentRequestDetail?.id,
                            type: 8,
                          };
                          dispatch(saveIssueAgainstIntent(submitData));
                        }
                      }}
                    />

                    <Basicbutton
                      className="primary rounded-0 me-2"
                      buttonText="Partly"
                      icon={
                        <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                      }
                      onClick={() => {
                        if (remarks === "") {
                          toastMessage(
                            "Intent Issue",
                            "Enter the Remarks",
                            "error"
                          );
                        } else {
                          let submitData = {
                            remarks: remarks,
                            list: [...displayData],
                            id: intentDrgResp?.data?.getIndentRequestDetail?.id,
                            type: 20,
                          };
                          dispatch(saveIssueAgainstIntent(submitData));
                        }
                      }}
                    />

                    <Basicbutton
                      className="danger rounded-0"
                      buttonText="Cancel"
                      icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
                      onClick={() => {
                        setDisplayData([]);
                        setNewIssueDrugDetails(
                          intentDrgResp?.data?.getIndentRequestDetail
                            ?.availableQty
                        );
                      }}
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </>
        ) : null}
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Request Drug" />
      </div>
      <Paper elevation={2}>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  newIssueDrugDetails &&
                  newIssueDrugDetails.length > 0 &&
                  newIssueDrugDetails?.map((data, index) => (
                    <StyledTableRow key={data?.stockId}>
                      {columns.map((d, k) => {
                        if (d.id === "issuedQty") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput
                                type="number"
                                value={
                                  data[d?.id] != null &&
                                  data[d?.id] != "undefined"
                                    ? data[d?.id]
                                    : ""
                                }
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    d?.id,
                                    parseInt(e?.target?.value),
                                    newIssueDrugDetails,
                                    setNewIssueDrugDetails
                                  );
                                }}
                              />
                            </StyledTableCell>
                          );
                        } else {
                          return (
                            <StyledTableCell padding="none">
                              {data[d.id]}
                            </StyledTableCell>
                          );
                        }
                      })}
                    </StyledTableRow>
                  ))
                )}
                <EmptyRow loading={loading} tableData={newIssueDrugDetails} />
              </TableBody>
            </TableComponent>
            <div className="row">
              <div className="d-flex justify-content-center">
                <Basicbutton
                  buttonText="Add"
                  className="primary rounded-0 mb-1"
                  onClick={() => handleIssueDrugList(newIssueDrugDetails)}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default IntentIssue;
