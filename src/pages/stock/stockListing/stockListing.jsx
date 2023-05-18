import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTableCell from "../../../components/tables/datatable/customTableRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getStockDeskList,
  getStockDeskListResponse,
} from "../../../store/stock/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import Checkbox from "../../../components/checkbox/checkbox";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
const EditStockListModal = lazy(() => import("./editstocklistmodal"));

const StockListing = () => {
  const dispatch = useDispatch();
  const stockDeskListingResponse = useSelector(
    (state) => state?.stock?.stockDeskListResponse
  );
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable(tableData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    check: 0,
  });
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [showStockEditListModal, setShowStockEditListModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const columns = useMemo(() => [
    {
      id: "storeName",
      name: "STORE. NAME",
      sortable: true,
    },

    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },

    {
      id: "programName",
      name: "PROGRAMME NAME",
      sortable: true,
    },
    {
      id: "batchNO",
      name: "BATCH NO.",
      sortable: true,
    },
    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "manufactureDate",
      name: "MANUFACTURE DATE",
      sortable: true,
    },
    {
      id: "dToExp",
      name: "DAYS TO EXPIRE",
      sortable: true,
    },
    {
      id: "availableQty",
      name: "AVAIL. QTY.",
      sortable: true,
    },

    {
      id: "sourceReceiving",
      name: "SOURCE",
      sortable: true,
    },
    {
      id: "edit",
      name: "EDIT",
      sortable: false,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getStockDeskList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getStockDeskListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (stockDeskListingResponse && stockDeskListingResponse?.status === 200) {
      setTotalRows(stockDeskListingResponse?.data?.pageList?.totalElements);
      setTableData(stockDeskListingResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      stockDeskListingResponse &&
      stockDeskListingResponse?.status == 400
    ) {
      setLoading(false);
      toastMessage("Stock Listing", "", "error");
      dispatch(getStockDeskListResponse(""));
    } else if (
      stockDeskListingResponse &&
      stockDeskListingResponse?.status === 500
    ) {
      setLoading(false);
      toastMessage(
        "Stock Listing",
        "Something went Wrong Please Try again",
        "error"
      );
      dispatch(getStockDeskListResponse(""));
    }
  }, [stockDeskListingResponse]);

  const getDaysDiffernce = (expDate) => {
    var date1 = new Date(expDate);
    var date2 = new Date();

    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.floor(Difference_In_Days);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
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
    handleSorting(accessor, sortOrder);
    setTableData(sortedData);
  };
  const handleCheckboxChange = (e) => {
    console.log("checked", e.target.checked ? 1 : 0);
    setController({
      ...controller,
      check: e.target.checked ? 1 : 0,
    });
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK DESK</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Stock Management Desk" />
      </div>
      <div className="row">
        <div className="d-flex justify-content-start">
          <Checkbox
            label="List for all Stores"
            name="forAllStore"
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e)}
            className="shawdow-none"
          />
        </div>
      </div>
      <Paper>
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
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </StyledTableRow>
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    const noOfDaysToExp = getDaysDiffernce(
                      moment(data?.expDate).format("MM/DD/YYYY")
                    );
                    return (
                      <StyledTableRow key={data.id}>
                        <StyledTableCell padding="none">
                          {data?.storeName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.drugName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.programName}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.batchNo}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment(data?.expDate).format("DD/MM/YYYY")}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {moment(data?.manufactureDate).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {noOfDaysToExp < 0 ? (
                            <span class="badge rounded-pill bg-danger text-dark">
                              Days {noOfDaysToExp}
                            </span>
                          ) : (
                            <span class="badge rounded-pill bg-warning text-dark">
                              Days {noOfDaysToExp}
                            </span>
                          )}
                          {data?.status === 10
                            ? "	Compiled by HQ"
                            : data?.status === 11
                            ? " 	Closed"
                            : data?.status === 1
                            ? "Active"
                            : data?.status === 3
                            ? "Cancelled"
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.availableQty < 100 ? (
                            <span class="badge rounded-pill bg-danger pe-2 ps-2">
                              {data?.availableQty}
                            </span>
                          ) : (
                            <span class="badge rounded-pill bg-primary pe-2 ps-2">
                              {data?.availableQty}
                            </span>
                          )}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.sourceReceiving}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          <span
                            className="text-decoration-underline ms-1"
                            style={{ fontSize: "0.8rem", cursor: "pointer" }}
                            onClick={() => {
                              console.log("clicked");
                              setShowStockEditListModal(true);
                              setModalData(data);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
                          </span>
                        </StyledTableCell>
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
      <Suspense fallback={<Spinner />}>
        <EditStockListModal
          data={modalData}
          openEditStockListModal={showStockEditListModal}
          handleEditStockListModal={setShowStockEditListModal}
        />
      </Suspense>
    </>
  );
};

export default StockListing;
