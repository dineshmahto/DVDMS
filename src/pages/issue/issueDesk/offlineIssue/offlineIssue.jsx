import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { Spinner } from "react-bootstrap";
import {
  faSearch,
  faArrowLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getOfflineIssueList,
  getOfflineIssueListResponse,
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
const IssueDrugModal = lazy(() =>
  import("../issueToThirdParty/issuedrugmodal")
);
const OfflineIssue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const offlineIssueListResponse = useSelector(
    (state) => state?.issuereturn?.offlineIssueListResponse
  );
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
    ,
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
    setLoading(false);

    setTimeout(() => {
      dispatch(
        getOfflineIssueList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }, 10000);
    return () => {
      clearTimeout();
      dispatch(getOfflineIssueListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (offlineIssueListResponse && offlineIssueListResponse?.status === 200) {
      setTableData(offlineIssueListResponse?.data?.pageList?.content);
      setTotalRows(offlineIssueListResponse?.data?.pageList?.totalElements);
      setSubStoreList(offlineIssueListResponse?.data?.subStoreList);
      setLoading(false);
    }
  }, [offlineIssueListResponse]);
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
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Your Store</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "statewarehouse",
                  label: "STATE WAREHOUSE",
                }}
                options={[
                  { value: "statewarehouse", label: "STATE WAREHOUSE" },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Sub Store</label>
            </div>
            <div className="col-auto">
              <CustomSelect options={subStoreList} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {displayData && displayData.length > 0 ? (
          <>
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
                <div className="col-4">
                  <label className="form-label">Issue Date</label>
                  <CustDatepicker
                    value={submitData?.issueDate}
                    name="issueDate"
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                      console.log("name", newValue);
                    }}
                  />
                </div>
                <div className="col-8">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    className="form-control shadow-none"
                    rows="3"
                    id="remarks"
                    onChange={(e) => {}}
                  ></textarea>
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
                    if (
                      submitData?.remarks === "" ||
                      submitData?.issueDate === null ||
                      submitData?.stockId === ""
                    ) {
                      toastMessage(
                        "Third Party Issue",
                        "provide all the fields",
                        "error"
                      );
                    } else {
                      const cloneData = [...displayData];
                      console.log("cloneData", cloneData);
                      let programId = [];
                      cloneData &&
                        cloneData.map(({ stockId, issueQty }) => {
                          let ele = {};
                          ele["stockId"] = stockId;
                          ele["issueQty"] = issueQty;
                          programId.push(ele);
                          return stockId;
                        });

                      // dispatch(
                      //   saveIssueToThirdParty({
                      //     thirdPartyId: submitData?.thirdPartyId,
                      //     issueDate: formatDate(submitData?.issueDate),
                      //     remarks: submitData?.remarks,
                      //     list: programId,
                      //   })
                      // );
                    }
                  }}
                />
              </div>
            </div>
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
                              <BasicInput type="number" name={d.id} />
                            </StyledTableCell>
                          );
                        } else if (d.id === "issueDQty") {
                          return (
                            <StyledTableCell key={k} padding="none">
                              <BasicInput type="number" name={d.id} />
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
      </Paper>
    </>
  );
};

export default OfflineIssue;
