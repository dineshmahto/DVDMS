import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper, TableBody } from "@mui/material";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
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
const DrugListModal = lazy(() => import("./druglistmodal"));
const RateContractDesk = () => {
  const dispatch = useDispatch();
  const rateContractListResponse = useSelector(
    (state) => state.admin.rateContractListResponse
  );
  console.log("rateContractListResponse", rateContractListResponse);
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
  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
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

  const handleDrugListModal = () => {
    setShowDrugList(false);
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
            <div className="d-flex justify-content-end ">
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
                        <StyledTableRow>
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
    </>
  );
};

export default RateContractDesk;
