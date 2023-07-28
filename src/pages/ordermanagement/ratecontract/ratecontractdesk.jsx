import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper, TableBody } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import {
  getRateContractDeskList,
  getRateContractDeskListResponse,
} from "../../../store/admin/action";
import moment from "moment";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import searchFunc from "../../../components/tables/searchFunc";
import Basicbutton from "../../../components/button/basicbutton";
import { useNavigate } from "react-router-dom";
import { inactiveRateContract } from "../../../store/ordermanagement/action";
import AlertDialog from "../../../components/dialog/dialog";
import {
  DELETE_MESSAGE_DESCRIPTION,
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../../common/constant/constant";
const DrugListModal = lazy(() => import("./druglistmodal"));
const RateContractDesk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rateContractListResponse = useSelector(
    (state) => state.admin.rateContractListResponse
  );
  const inactiveRateContrctResp = useSelector(
    (state) => state?.ordermanaagement?.inactiveRateContrctResp
  );
  console.log("rateContractListResponse", rateContractListResponse);
  console.log("inactiveRateContrctResp", inactiveRateContrctResp);
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [showDrugList, setShowDrugList] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [showInactiveDialog, setShowInactiveDialog] = useState(false);
  const [id, setId] = useState("");
  const columns = useMemo(() => [
    {
      id: "id",
      name: "CONTRACT ID",
      sortable: true,
    },
    {
      id: "supplierName",
      name: "SUPPLIER NAME",
      sortable: true,
    },

    {
      id: "druglist",
      name: "DRUG LIST",
      sortable: true,
    },

    {
      id: "contactFrom",
      name: "CONTRACT FORM",
      sortable: true,
    },
    {
      id: "contactTo",
      name: "CONTRACT TO",
      sortable: true,
    },
    {
      id: "contactDate",
      name: "CONTRACT DATE",
      sortable: true,
    },
    {
      id: "tenderNo",
      name: "TENDER NO",
      sortable: true,
    },
    {
      id: "tenderDate",
      name: "TENDER DATE",
      sortable: true,
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
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getRateContractDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getRateContractDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (rateContractListResponse && rateContractListResponse?.status === 200) {
      if (
        rateContractListResponse &&
        rateContractListResponse?.data?.pageList &&
        rateContractListResponse?.data?.pageList?.content
      ) {
        setTotalRows(rateContractListResponse?.data?.pageList?.totalElements);
        setTableData(rateContractListResponse?.data?.pageList?.content);
      }

      setLoading(false);
    } else if (
      rateContractListResponse &&
      rateContractListResponse?.status == 400
    ) {
      setLoading(false);
      dispatch(getRateContractDeskListResponse(""));
      toastMessage("Rate Contract Desk", "", "error");
    }
  }, [rateContractListResponse]);

  useEffect(() => {
    if (
      inactiveRateContrctResp &&
      inactiveRateContrctResp?.status ===
        NETWORK_STATUS_CODE?.CREATED_SUCCESSFULLY
    ) {
      if (
        inactiveRateContrctResp &&
        inactiveRateContrctResp?.data?.status === SERVER_STATUS_CODE?.SUCCESS
      ) {
        setShowInactiveDialog(false);
        toastMessage(
          "RATE CONTRACT DESK",
          inactiveRateContrctResp?.data?.message
        );
        dispatch(inactiveRateContrctResp(""));
      } else if (
        inactiveRateContrctResp &&
        inactiveRateContrctResp?.data?.status === SERVER_STATUS_CODE?.FAILED
      ) {
        setShowInactiveDialog(false);
        toastMessage(
          "RATE CONTRACT DESK",
          inactiveRateContrctResp?.data?.message
        );
        dispatch(inactiveRateContrctResp(""));
      }
    } else if (
      rateContractListResponse &&
      rateContractListResponse?.status == 400
    ) {
      dispatch(inactiveRateContrctResp(""));
      toastMessage("Rate Contract Desk", "", "error");
    }
  }, [inactiveRateContrctResp]);

  const handleDrugListModal = () => {
    setShowDrugList(false);
  };

  const handleInactiveDialog = () => {
    dispatch(inactiveRateContract({ id: id }));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">RATE CONTRACT DESK</p>
          </div>
        </div>

        <div className="row mt-2">
          <HorizonatalLine text="Rate Contract Management Desk" />
        </div>

        <Paper>
          <div className="row mt-1 mb-2">
            <div className="d-flex justify-content-between ">
              <Basicbutton
                buttonText="Add New Contract"
                className="btn btn-primary rounded-0"
                outlineType={true}
                onClick={() => navigate("/openAddRateContract")}
              />
              <SearchField
                iconPosition="end"
                iconName={faSearch}
                onChange={(e) => {
                  if (e.target?.value != "") {
                    console.log(e.target?.value);

                    setTableData(
                      searchFunc(
                        rateContractListResponse?.data?.pageList?.content,
                        e.target?.value
                      )
                    );
                  } else {
                    setTableData(
                      rateContractListResponse?.data?.pageList?.content
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={columns}
                sortField={sortField}
                page={controller.page + 1}
                count={totalRows}
                rowsPerPage={controller.rowsPerPage}
                order={order}
                paginationRequired={true}
                onPageChange={handlePageChange}
                rowCount={tableData?.length}
                handleSorting={handleSortingChange}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              >
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData?.map((row, index) => {
                      return (
                        <StyledTableRow key={row?.id}>
                          {columns.map((d, k) => {
                            if (
                              d.id === "contactTo" ||
                              d.id === "contactFrom" ||
                              d.id === "contactDate" ||
                              d.id === "tenderDate"
                            ) {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              );
                            } else if (d.id === "druglist") {
                              return (
                                <StyledTableCell
                                  key={k}
                                  padding="none"
                                  onClick={() => {
                                    setShowDrugList(true);
                                    setModalData(row[d.id]);
                                  }}
                                >
                                  VIEW DRUG LIST
                                </StyledTableCell>
                              );
                            } else if (d.id === "action") {
                              return (
                                <StyledTableCell key={k}>
                                  <Basicbutton
                                    buttonText="Renew"
                                    className="btn btn-sm btn-primary rounded-0 me-2"
                                    onClick={() => {
                                      navigate("/openRateContract", {
                                        state: row?.id,
                                      });
                                    }}
                                  />
                                  <Basicbutton
                                    buttonText="Inactive"
                                    className="btn btn-sm btn-danger rounded-0"
                                    onClick={() => {
                                      setShowInactiveDialog(true);
                                      setId(row?.id);
                                    }}
                                  />
                                </StyledTableCell>
                              );
                            } else {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {row[d.id]}
                                </StyledTableCell>
                              );
                            }
                          })}
                        </StyledTableRow>
                      );
                    })
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
        <Suspense>
          <DrugListModal
            showDrugListModal={showDrugList}
            handleDrugListModal={handleDrugListModal}
            drugList={modalData}
          />
        </Suspense>
      </div>
      {showInactiveDialog && (
        <Suspense>
          <AlertDialog
            open={showInactiveDialog}
            handleClose={() => {
              setShowInactiveDialog(false);
              setId("");
            }}
            description={DELETE_MESSAGE_DESCRIPTION}
          >
            <Basicbutton
              buttonText="Disagree"
              onClick={() => {
                setShowInactiveDialog(false);
                setId("");
              }}
            />
            <Basicbutton buttonText="Agree" onClick={handleInactiveDialog} />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default RateContractDesk;
