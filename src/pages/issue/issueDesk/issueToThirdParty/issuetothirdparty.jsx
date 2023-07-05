import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, Paper } from "@mui/material";
import { Spinner } from "react-bootstrap";
import {
  faShareFromSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssueToThirdPartyList,
  getIssueToThirdPartyListResponse,
  saveIssueToThirdParty,
  saveIssueToThirdPartyResponse,
} from "../../../../store/issue/action";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import BackButon from "../../../../components/button/backButon";
import searchFunc from "../../../../components/tables/searchFunc";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import Basicbutton from "../../../../components/button/basicbutton";
import NormalTableRow from "../../../../components/tables/datatable/normalTableRow";
import CustDatepicker from "../../../../components/datepicker/custDatepicker";
import dayjs from "dayjs";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../../common/constant/constant";
const IssueDrugModal = lazy(() => import("./issuedrugmodal"));

const IssueToThirdParty = () => {
  const dispatch = useDispatch();
  const thirdPartyListApiResponse = useSelector(
    (state) => state?.issuereturn?.thirdPartyListResponse
  );
  const saveIssueThirdPartyResp = useSelector(
    (state) => state?.issuereturn?.saveIssueToThirdPartyResp
  );
  console.log("saveIssueThirdPartyResp", saveIssueThirdPartyResp);
  const loader = useSelector((state) => state?.issuereturn?.loading);
  console.log("thirdPartyListResponse", thirdPartyListApiResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [tableData, setTableData] = useState([]);
  const [thirdPartDropDownList, setThirdPartyDropDownList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const [totalRows, setTotalRows] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [submitData, setSubmitData] = useState({
    thirdPartyId: "",
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
      id: "packDes",
      name: "PACKAGING. DESCRIPTION",
      sortable: true,
    },

    {
      id: "availableQty",
      name: "AVAILABLE QTY",
      sortable: true,
    },

    {
      id: "issueDrugs",
      name: "ISSUE DRUGS",
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
      id: "packDes",
      name: "PACKAGING. DESCRIPTION",
      sortable: true,
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

  const handlePageChange = (newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (e) => {
    setController({
      ...controller,
      rowsPerPage: e,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  const handleAddDrugModal = () => {
    setShowAddDrugModal(false);
  };

  useEffect(() => {
    let isApiSubcribed = true;

    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getIssueToThirdPartyList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getIssueToThirdPartyListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (
      thirdPartyListApiResponse &&
      thirdPartyListApiResponse?.status === 200
    ) {
      console.log("Data", thirdPartyListApiResponse);
      setTableData(thirdPartyListApiResponse?.data?.pageList?.content);
      setFilterData(thirdPartyListApiResponse?.data?.pageList?.content);
      setTotalRows(thirdPartyListApiResponse?.data?.pageList?.totalElements);
      setThirdPartyDropDownList(
        thirdPartyListApiResponse?.data?.thirdPartyList
      );
      setLoading(false);
    }
  }, [thirdPartyListApiResponse]);

  useEffect(() => {
    if (
      saveIssueThirdPartyResp &&
      saveIssueThirdPartyResp?.status ===
        NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (
        saveIssueThirdPartyResp?.data?.status === SERVER_STATUS_CODE.SUCCESS
      ) {
        toastMessage("Issue Desk", saveIssueThirdPartyResp?.data?.message);
        setDisplayData([]);
        setController({
          page: 0,
          rowsPerPage: 10,
        });
        dispatch(getIssueToThirdPartyList());
        dispatch(saveIssueToThirdPartyResponse(""));
      } else if (
        saveIssueThirdPartyResp?.data?.status === SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage("Issue Desk", saveIssueThirdPartyResp?.data?.message);
        dispatch(saveIssueToThirdPartyResponse(""));
      }
    } else if (
      saveIssueThirdPartyResp &&
      saveIssueThirdPartyResp?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      dispatch(saveIssueToThirdPartyResponse(""));
      toastMessage("Role Desk", "Something went wrong", "");
    }
  }, [saveIssueThirdPartyResp]);
  const handleIssueDrugList = (data) => {
    const elementExist = displayData?.filter((item) => {
      return item.stockId === data[0]?.stockId;
    });
    if (elementExist.length === 0) {
      setDisplayData([...displayData, data[0]]);
    } else {
      for (let [i, item] of [...displayData]?.entries()) {
        if (item.stockId === data[0]?.stockId) {
          displayData.splice(i, 1);
        }
      }
      setDisplayData([...displayData, data[0]]);
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <BackButon routePath="openIssueDesk" />
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">THIRD PARTY ISSUE</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
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
              <label>Third Party Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                options={thirdPartDropDownList}
                onChange={(selectedOption) => {
                  setSubmitData({
                    ...submitData,
                    thirdPartyId: selectedOption?.value,
                  });
                }}
              />
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
                    console.log("selectedColumns", selectedColumns);
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

                      setSubmitData({
                        ...submitData,
                        issueDate: newValue,
                      });
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
                    onChange={(e) => {
                      setSubmitData({
                        ...submitData,
                        remarks: e?.target?.value,
                      });
                    }}
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

                      dispatch(
                        saveIssueToThirdParty({
                          thirdPartyId: submitData?.thirdPartyId,
                          issueDate: formatDate(submitData?.issueDate),
                          remarks: submitData?.remarks,
                          list: programId,
                        })
                      );
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
              onChange={(e) => {
                if (e.target?.value != "") {
                  setSearchValue(e?.target?.value);
                  setTableData(searchFunc(filterData, e.target?.value));
                } else {
                  setTableData(filterData);
                  setSearchValue("");
                }
              }}
            />
          </div>
        </div>

        <TableComponent
          columns={columns}
          sortField={sortField}
          order={order}
          paginationRequired={true}
          handleSorting={handleSortingChange}
          checkBoxRequired={false}
        >
          <TableBody>
            {loading ? (
              <TableRowLaoder />
            ) : (
              tableData &&
              tableData.length > 0 &&
              tableData.map((data, index) => (
                <StyledTableRow key={data.id}>
                  {columns.map((d, k) => {
                    if (d.id === "issueDrugs") {
                      return (
                        <StyledTableCell
                          key={k}
                          padding="none"
                          onClick={() => {
                            console.log("modalData", data);
                            setShowAddDrugModal(true);
                            setModalData([data]);
                          }}
                        >
                          <span>
                            <FontAwesomeIcon icon={faShareFromSquare} /> Click
                            Here
                          </span>
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
            <EmptyRow
              loading={loading}
              tableData={tableData}
              searchValue={searchValue}
            />
          </TableBody>
        </TableComponent>
        <TablePagination
          page={controller.page + 1}
          count={totalRows}
          rowsPerPage={controller.rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Suspense fallback={<Spinner />}>
        <IssueDrugModal
          loading={true}
          modalData={modalData}
          showAddDrugModal={showAddDrugModal}
          handleAddDrugModal={handleAddDrugModal}
          handleIssueDrugList={handleIssueDrugList}
        />
      </Suspense>
    </>
  );
};

export default IssueToThirdParty;
