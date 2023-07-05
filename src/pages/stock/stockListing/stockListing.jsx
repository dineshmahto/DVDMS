import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody } from "@mui/material";
import { Paper } from "@mui/material";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import {
  NETWORK_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import dayjs from "dayjs";
const EditStockListModal = lazy(() => import("./editstocklistmodal"));

const StockListing = () => {
  const dispatch = useDispatch();
  const stockDeskListingResponse = useSelector(
    (state) => state?.stock?.stockDeskListResponse
  );
  console.log("stockDeskListingResponse", stockDeskListingResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [tableData, setTableData] = useState([]);
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
    if (
      stockDeskListingResponse &&
      stockDeskListingResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(stockDeskListingResponse?.data?.pageList?.totalElements);
      setTableData(stockDeskListingResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      stockDeskListingResponse &&
      stockDeskListingResponse?.status == NETWORK_STATUS_CODE.BAD_REQUEST
    ) {
      setLoading(false);
      toastMessage("Stock Listing", "", "error");
      dispatch(getStockDeskListResponse(""));
    } else if (
      stockDeskListingResponse &&
      stockDeskListingResponse?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
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
  const handleCheckboxChange = (e) => {
    setController({
      ...controller,
      check: e.target.checked ? 1 : 0,
    });
  };
  const handleEditStockListModal = () => {
    setShowStockEditListModal(false);
  };
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
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
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <StyledTableRow key={index}>
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
                          {formatDate(data?.expDate)}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {formatDate(data?.manufactureDate)}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.dayToExpire < 0 ? (
                            <span className="badge rounded-pill bg-danger text-dark">
                              Days {data?.dayToExpire}
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-warning text-dark">
                              Days {data?.dayToExpire}
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
                            <span className="badge rounded-pill bg-danger pe-2 ps-2">
                              {data?.availableQty}
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-primary pe-2 ps-2">
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
          handleEditStockListModal={handleEditStockListModal}
        />
      </Suspense>
    </>
  );
};

export default StockListing;
