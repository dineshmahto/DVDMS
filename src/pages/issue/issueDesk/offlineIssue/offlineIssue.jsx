import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { Spinner } from "react-bootstrap";
import {
  faSearch,
  faArrowLeft,
  faFloppyDisk,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getOfflineIssueList,
  getOfflineIssueListResponse,
  saveOfflineIssue,
  saveOfflineIssueResponse,
} from "../../../../store/issue/action";
import { useNavigate } from "react-router-dom";
import Basicbutton from "../../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import BasicInput from "../../../../components/inputbox/floatlabel/basicInput";
import NormalTableRow from "../../../../components/tables/datatable/normalTableRow";
import CustDatepicker from "../../../../components/datepicker/custDatepicker";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import dayjs from "dayjs";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "src/common/constant/constant";
import BasicTextAreaField from "src/components/inputbox/textarea";
const IssueDrugModal = lazy(() =>
  import("../issueToThirdParty/issuedrugmodal")
);
const OfflineIssue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offlineIssueListResponse = useSelector(
    (state) => state?.issuereturn?.offlineIssueListResponse
  );
  const saveOfflineIssueResp = useSelector(
    (state) => state?.issuereturn?.saveOfflineIssueResp
  );
  console.log("saveOfflineIssueResp", saveOfflineIssueResp);
  console.log("offlineIssueListResponse", offlineIssueListResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [subStoreList, setSubStoreList] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [submitData, setSubmitData] = useState({
    issueDate: null,
    remarks: "",
    subStoreId: null,
  });
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH. NO",
      sortable: true,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: true,
    },

    {
      id: "manfDate",
      name: "MANUFACTURE DATE",
      sortable: false,
    },
    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },
    {
      id: "unitPrice",
      name: "UNIT PRICE",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },
    {
      id: "requestedQty",
      name: "REQUESTED QTY",
      sortable: false,
    },
    {
      id: "issueDQty",
      name: "ISSUED QTY",
      sortable: false,
    },
    ,
  ]);

  const selectedColumns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH. NO",
      sortable: true,
    },

    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: true,
    },

    {
      id: "manfDate",
      name: "MANUFACTURE DATE",
      sortable: false,
    },
    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: false,
    },
    {
      id: "unitPrice",
      name: "UNIT PRICE",
      sortable: false,
    },
    {
      id: "tax",
      name: "TAX",
      sortable: false,
    },
    {
      id: "requestedQty",
      name: "REQUESTED QTY",
      sortable: false,
    },
    {
      id: "issueDQty",
      name: "ISSUED QTY",
      sortable: false,
    },
    {
      id: "action",
      name: "ACTION",
      sortable: false,
    },
  ]);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  const handleAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      dispatch(
        getOfflineIssueList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }, 1000);
    return () => {
      clearTimeout();
      dispatch(getOfflineIssueListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (offlineIssueListResponse && offlineIssueListResponse?.status === 200) {
      setLoading(false);
      setTableData(offlineIssueListResponse?.data?.pageList?.content);
      setTotalRows(offlineIssueListResponse?.data?.pageList?.totalElements);
      setSubStoreList(offlineIssueListResponse?.data?.subStoreList);
      setLoading(false);
    }
  }, [offlineIssueListResponse]);

  useEffect(() => {
    if (
      saveOfflineIssueResp &&
      saveOfflineIssueResp?.status === NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (saveOfflineIssueResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS) {
        toastMessage(
          "OFFLINE ISSUE",
          saveOfflineIssueResp?.data?.message,
          "success"
        );
        dispatch(saveOfflineIssueResponse(""));
        navigate("/openIssueDesk");
      } else if (
        saveOfflineIssueResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        toastMessage(
          "OFFLINE ISSUE",
          saveOfflineIssueResp?.data?.message,
          "error"
        );
        dispatch(saveOfflineIssueResponse(""));
      }
    } else if (
      saveOfflineIssueResp &&
      saveOfflineIssueResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      toastMessage("OFFLINE ISSUE", "Something went Wrong", "error");
      dispatch(saveOfflineIssueResponse(""));
    }
  }, [saveOfflineIssueResp]);
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
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
    console.log("data", data);
    //isPositiveInteger(e.target.value);

    const filtered = [...data]?.filter((ele) => {
      if (
        ele?.hasOwnProperty("requestedQty") &&
        ele?.hasOwnProperty("issueDQty")
      ) {
        return ele;
      }
    });
    let newElement = [];
    filtered?.map((element, index) => {
      const elementExist = displayData?.filter((item) => {
        return item.stockId === element?.stockId;
      });
      if (elementExist.length === 0) {
        newElement.push(element);
      } else {
        for (let [i, item] of [...displayData]?.entries()) {
          if (item.stockId === element?.stockId) {
            displayData.splice(i, 1);
          }
        }
        newElement.push(element);
      }
    });

    setDisplayData([...displayData, ...newElement]);
  };

  const isPositiveInteger = (inputValue) => {
    return /^[1-9]\d*$/.test(inputValue);
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
            onClick={() => navigate("/openIssueDesk")}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">OFFLINE ISSUE</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="col-auto">
            <label>Your Store</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              defaultValue={{
                value: "statewarehouse",
                label: "STATE WAREHOUSE",
              }}
              options={[{ value: "statewarehouse", label: "STATE WAREHOUSE" }]}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="col-auto">
            <label>Sub Store</label>
          </div>
          <div className="col-auto">
            <CustomSelect
              options={subStoreList}
              value={
                subStoreList &&
                subStoreList?.find((c) => c.value === submitData?.subStoreId)
              }
              onChange={(val) => {
                setSubmitData({
                  ...submitData,
                  subStoreId: val?.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12 align-items-center"></div>
      </div>
      <div className="row">
        {displayData && displayData.length > 0 ? (
          <>
            <HorizonatalLine text="Selected Drug" />
            <Paper elevation={3}>
              <TableComponent
                columns={selectedColumns}
                sortField={sortField}
                order={order}
                paginationRequired={true}
                handleSorting={handleSortingChange}
              >
                <TableBody>
                  {displayData &&
                    displayData?.length > 0 &&
                    displayData?.map((row, index) => {
                      return (
                        <NormalTableRow key={row.id}>
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
                                key={k}
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
                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="col-auto">
                      <label className="form-label">Issue Date</label>
                    </div>
                    <div className="col-auto">
                      <CustDatepicker
                        value={submitData?.issueDate}
                        name="issueDate"
                        inputFormat="DD/MM/YYYY"
                        onChange={(newValue) => {
                          console.log("name", newValue);
                          setSubmitData({
                            ...submitData,
                            issueDate: formatDate(newValue),
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="col-auto">
                      <label className="form-label">
                        Office Intent/ Letter No
                      </label>
                    </div>
                    <div className="col-auto">
                      <BasicTextAreaField
                        className="form-control shadow-none"
                        rows="3"
                        onChange={(e) => {
                          setSubmitData({
                            ...submitData,
                            letterNo: e.target?.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="col-auto">
                      <label htmlFor="remarks" className="form-label">
                        Remarks
                      </label>
                    </div>
                    <div className="col-auto">
                      <BasicTextAreaField
                        name="remarks"
                        className="form-control shadow-none"
                        rows="3"
                        id="remarks"
                        onChange={(e) => {
                          setSubmitData({
                            ...submitData,
                            remarks: e.target.value.trim(),
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="me-1">
                  <Basicbutton
                    className="primary rounded-0"
                    buttonText="save"
                    icon={
                      <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                    }
                    onClick={() => {
                      if (submitData?.subStoreId === null) {
                        toastMessage(
                          "Offline Issue",
                          "Select the Sub Store",
                          "error"
                        );
                      } else if (submitData?.issueDate === null) {
                        toastMessage(
                          "Offline Issue",
                          "Select the Issue Date",
                          "error"
                        );
                      } else if (submitData?.remarks === "") {
                        toastMessage(
                          "Offline Issue",
                          "Enter the Remarks",
                          "error"
                        );
                      } else {
                        let finalData = {
                          list: [...displayData],
                          ...submitData,
                        };
                        console.log("finalData", finalData);
                        dispatch(saveOfflineIssue(finalData));
                      }
                    }}
                  />
                </div>
              </div>
            </Paper>
          </>
        ) : null}
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="New Issue Drug Details" />
      </div>
      <Paper>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 mt-1"
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              order={order}
              handleSorting={handleSortingChange}
              checkBoxRequired={false}
            >
              <TableBody>
                {loading ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={12}>
                      <Spinner />
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <StyledTableRow key={data.id}>
                      {columns.map((d, k) => {
                        if (d.id === "requestedQty") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput
                                type="number"
                                name={d.id}
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    d.id,
                                    e.target.value.trim(),
                                    tableData,
                                    setTableData
                                  );
                                }}
                              />
                            </StyledTableCell>
                          );
                        } else if (d.id === "issueDQty") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput
                                type="number"
                                name={d.id}
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    d.id,
                                    e.target.value.trim(),
                                    tableData,
                                    setTableData
                                  );
                                }}
                              />
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
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </TableComponent>
            <TablePagination
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller?.rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center">
            <Basicbutton
              className="btn btn-primary rounded-0"
              buttonText="Add"
              onClick={() => {
                handleIssueDrugList(tableData);
              }}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default OfflineIssue;
