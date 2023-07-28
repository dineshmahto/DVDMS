import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { Spinner } from "react-bootstrap";
import {
  faSearch,
  faShareFromSquare,
  faArrowLeft,
  faFloppyDisk,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssueCampList,
  getIssueCampListResponse,
  saveIssueToThirdParty,
} from "../../../../store/issue/action";
import { useNavigate } from "react-router-dom";
import Basicbutton from "../../../../components/button/basicbutton";
import { Paper } from "@mui/material";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import NormalTableRow from "../../../../components/tables/datatable/normalTableRow";
import CustDatepicker from "../../../../components/datepicker/custDatepicker";
import dayjs from "dayjs";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
import { SORTINGORDER } from "../../../../common/constant/constant";
import BasicTextAreaField from "../../../../components/inputbox/textarea";
const IssueDrugModal = lazy(() =>
  import("../issueToThirdParty/issuedrugmodal")
);
const IssueToCamp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const issueToCampResponse = useSelector(
    (state) => state?.issuereturn?.issueCampListResponse
  );
  console.log("issueToCampResponse", issueToCampResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [modalData, setModalData] = useState([{}]);
  const [campName, setCampName] = useState([]);
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

    {
      id: "action",
      name: "ACTION",
      sortable: false,
    },
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
    setLoading(true);

    setTimeout(() => {
      dispatch(
        getIssueCampList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }, 10000);
    return () => {
      clearTimeout();
      dispatch(getIssueCampListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (issueToCampResponse && issueToCampResponse?.status === 200) {
      setTableData(issueToCampResponse?.data?.pageList?.content);
      setTotalRows(issueToCampResponse?.data?.pageList?.totalElements);
      setCampName(issueToCampResponse?.data?.campNameList);
      setLoading(false);
    }
  }, [issueToCampResponse]);

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
          <p className="fs-6">ISSUE TO CAMP</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
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
              <label>Camp Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                options={campName}
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
        <Paper elevation={2} className="mb-2">
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
                            if (d.id === "action") {
                              return (
                                <StyledTableCell padding="none">
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
                              <StyledTableCell key={k} padding="none">
                                {row[d.id]}
                              </StyledTableCell>
                            );
                          })}
                        </NormalTableRow>
                      );
                    })}
                </TableBody>
              </TableComponent>

              <div className="row mb-2">
                <div className="col-4">
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
                          issueDate: newValue,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-8">
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
                          remarks: e?.target?.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div className="me-1">
                  <Basicbutton
                    className="primary rounded-0 mb-1"
                    buttonText="save"
                    icon={
                      <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                    }
                    onClick={() => {
                      if (submitData?.thirdPartyId === "") {
                        toastMessage(
                          "Issue To Camp",
                          "Select the Camp Name",
                          "error"
                        );
                      } else if (
                        submitData?.issueDate === null ||
                        submitData?.issueDate === ""
                      ) {
                        toastMessage(
                          "Issue To Camp",
                          "Pick the Issue Date",
                          "error"
                        );
                      } else if (submitData?.remarks === "") {
                        toastMessage(
                          "Issue To Camp",
                          "Enter the Remarks",
                          "error"
                        );
                      } else {
                        const cloneData = [...displayData];
                        let stockIds = [];
                        cloneData &&
                          cloneData.map(({ stockId, issueQty }) => {
                            let ele = {};
                            ele["stockId"] = stockId;
                            ele["issueQty"] = issueQty;
                            stockIds.push(ele);
                            return stockId;
                          });

                        dispatch(
                          saveIssueToThirdParty({
                            thirdPartyId: submitData?.thirdPartyId,
                            issueDate: formatDate(submitData?.issueDate),
                            remarks: submitData?.remarks,
                            list: stockIds,
                          })
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </>
          ) : null}
        </Paper>
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
                  <TableRowLaoder />
                ) : (
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
                                setShowAddDrugModal(true);
                                setModalData([data]);
                              }}
                            >
                              <span>
                                <FontAwesomeIcon icon={faShareFromSquare} />{" "}
                                Click Here
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
                <EmptyRow loading={loading} tableData={tableData} />
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

export default IssueToCamp;
