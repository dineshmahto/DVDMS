import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SelectOption from "../../../components/option/option";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import {
  faSearch,
  faAdd,
  faXmark,
  faPenToSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableHead,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { getPurchaseOrderList } from "../../../store/admin/action";
import moment from "moment";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import {
  DELETE_MESSAGE_DESCRIPTION,
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../../common/constant/constant";
import Basicbutton from "../../../components/button/basicbutton";
import { cancelPo } from "../../../store/ordermanagement/action";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "src/components/select/customSelect";
const AlertDialog = lazy(() => import("../../../components/dialog/dialog"));
const PurchaseOrderList = () => {
  const dispatch = useDispatch();
  const purchaseOrderListResponse = useSelector(
    (state) => state.admin.purchaseOrderListResponse
  );
  const cancelPoResp = useSelector(
    (state) => state?.ordermanaagement?.cancelPoResp
  );
  console.log("purchaseOrderListResponse", purchaseOrderListResponse);
  console.log("cancelPores", cancelPoResp);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable();
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const [isCancelable, setIsCancelable] = useState(false);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "action",
      name: "Action",
      sortable: false,
    },
    {
      id: "id",
      name: "SL.NO",
      sortable: true,
    },

    {
      id: "poRef",
      name: "PO.NO",
      sortable: true,
    },

    {
      id: "poDate",
      name: "PO DATE",
      sortable: true,
    },

    {
      id: "supplierName",
      name: "SUPPLIER NO",
      sortable: true,
    },
    {
      id: "consignee",
      name: "CONSIGNEE",
      sortable: true,
    },

    {
      id: "tax",
      name: "TOTAL PO VALUE (INC TAX)",
      sortable: true,
    },
    {
      id: "poStatus",
      name: "STATUS",
      sortable: true,
    },
    {
      id: "dwonload",
      name: "VIEW/DOWNLOAD",
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
  const handleClick = (event, index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      setIsCancelable(false);
      setSelectedRow([]);
      setSelected(openCopy);
    } else {
      if (row?.status === 1) {
        setIsCancelable(true);
      }
      setSelectedRow(row);
      const openCopy = [...selected];
      openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
    }
  };

  const handleCollapse = (clickedIndex) => {
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter((element) => {
        return element !== clickedIndex;
      });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.shift();
      openCopy.push(clickedIndex);
      setOpen(openCopy);
    }
  };

  const handleSortingChange = (accessor) => {
    setSelected([]);
    setSelectedRow([]);
    const sortOrder =
      accessor === sortField && order === SORTINGORDER.ASC
        ? SORTINGORDER.DESC
        : SORTINGORDER.ASC;
    setSortField(accessor);
    setOrder(sortOrder);
    setTableData(handleSortingFunc(accessor, sortOrder, tableData));
  };

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      dispatch(
        getPurchaseOrderList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      purchaseOrderListResponse &&
      purchaseOrderListResponse?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(purchaseOrderListResponse?.data?.pageList?.totalElements);
      setTableData(purchaseOrderListResponse?.data?.pageList?.content);
      setLoading(false);
    } else if (
      purchaseOrderListResponse &&
      purchaseOrderListResponse?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setLoading(false);
      toastMessage("Purchase Order List", "Something went wrong", "error");
    }
  }, [purchaseOrderListResponse]);

  useEffect(() => {
    if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (cancelPoResp?.data?.status === SERVER_STATUS_CODE.SUCCESS) {
        setSelectedRow([]);
        setSelected([]);
        dispatch(
          getPurchaseOrderList({
            pageNumber: 0,
            pageSize: controller.rowsPerPage,
          })
        );
        setShowDialog(false);
        toastMessage("CANCEL PO", cancelPoResp?.data?.message, "success");
      } else if (cancelPoResp?.data?.status === SERVER_STATUS_CODE.FAILED) {
        setSelectedRow([]);
        setSelected([]);
        setShowDialog(false);
        toastMessage("CANCEL PO", cancelPoResp?.data?.message, "error");
      }
    } else if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setSelectedRow([]);
      setSelected([]);
      setShowDialog(false);
      toastMessage("CANCEL PO", "Something went wrong", "error");
    } else if (
      cancelPoResp &&
      cancelPoResp?.status === NETWORK_STATUS_CODE?.PAGE_NOT_FOUND
    ) {
      setShowDialog(false);
      toastMessage("CANCEL PO", cancelPoResp?.data?.message, "error");
    }
  }, [cancelPoResp]);

  const handleDeletePo = () => {
    console.log("selectedRow", selectedRow?.id);
    dispatch(cancelPo({ id: selectedRow?.id }));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">PURCHASE ORDER</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="storeName">
                Store Name
              </label>
            </div>
            <div className="col-auto">
              <CustomSelect id="storeName" data={[]} />
            </div>
          </div>
          <div className=" col-sm-12 col-md-4 col-lg-4">
            <div className="col-auto">
              <label className="labellineHeight" htmlFor="notificationStatus">
                Notification Status
              </label>
            </div>
            <div className="col-auto">
              <CustomSelect id="notificationStatus" data={[]} />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Purchase Order Management Desk" />
        </div>
        <div className="row mt-2 mb-2">
          <div className="d-flex justify-content-between">
            <div className="">
              <BasicButton
                type="button"
                buttonText="Cancel PO"
                className="danger btn-sm me-2 rounded-0 col-sm-12"
                disabled={
                  selected.length > 0 && isCancelable ? null : "disabled"
                }
                onClick={(e) => {
                  console.log("Selected Data", selectedRow);
                  setShowDialog(true);
                }}
                icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
              />
              <BasicButton
                type="button"
                buttonText="Edit PO"
                className="primary btn-sm rounded-0"
                disabled={selected.length > 0 ? null : "disabled"}
                onClick={(e) => console.log("Selected Data", selectedRow)}
                icon={<FontAwesomeIcon icon={faPenToSquare} className="me-1" />}
              />
            </div>
            <SearchField
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>

        <Paper elevation={3} className="mb-2">
          <div className="row">
            <div className="col-12">
              <TableComponent
                columns={columns}
                sortField={sortField}
                order={order}
                handleSorting={handleSortingChange}
                checkBoxRequired={true}
              >
                <TableBody>
                  {loading ? (
                    <TableRowLaoder />
                  ) : (
                    tableData &&
                    tableData.length > 0 &&
                    tableData.map((row, index) => (
                      <>
                        <StyledTableRow key={row.id}>
                          <StyledTableCell>
                            {row?.drudList && row?.drudList.length > 0 ? (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleCollapse(index)}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    open.includes(index)
                                      ? faChevronUp
                                      : faChevronDown
                                  }
                                />
                              </IconButton>
                            ) : null}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, index, row)
                              }
                              color="primary"
                              checked={selected.includes(index)}
                              inputProps={{
                                "aria-labelledby": `enhanced-table-checkbox-${index}`,
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.id}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.poRef}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {moment(row?.poDate).format("DD/MM/YYYY")}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.supplierName}
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.consignee}
                          </StyledTableCell>
                          <StyledTableCell padding="none"></StyledTableCell>
                          <StyledTableCell padding="none">
                            {row?.poStatus}
                          </StyledTableCell>
                          <StyledTableCell padding="none"></StyledTableCell>
                        </StyledTableRow>
                        {row?.drudList && row?.drudList.length > 0 ? (
                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                            >
                              <Collapse
                                in={open.includes(index)}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    Drug Details
                                  </Typography>
                                  <Table aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Program Name</TableCell>
                                        <TableCell>Drug Name</TableCell>

                                        <TableCell>ORDER QTY</TableCell>
                                        <TableCell>RATE</TableCell>
                                        <TableCell>TAX</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {row?.drudList &&
                                        row?.drudList.length > 0 &&
                                        row?.drudList.map((ele) => {
                                          return (
                                            <>
                                              <StyledTableRow key={ele?.id}>
                                                <StyledTableCell padding="none">
                                                  {ele?.programName}
                                                </StyledTableCell>
                                                <StyledTableCell padding="none">
                                                  {ele?.drugName}
                                                </StyledTableCell>
                                                <StyledTableCell padding="none">
                                                  {ele?.orderQty}
                                                </StyledTableCell>
                                                <StyledTableCell padding="none">
                                                  {ele?.rate}
                                                </StyledTableCell>
                                                <StyledTableCell padding="none">
                                                  {ele?.tax}
                                                </StyledTableCell>
                                              </StyledTableRow>
                                            </>
                                          );
                                        })}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </>
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
      </div>

      {showDialog && (
        <Suspense>
          <AlertDialog
            open={showDialog}
            handleClose={() => setShowDialog(false)}
            description={DELETE_MESSAGE_DESCRIPTION}
            dialogTitle="Delete Po :"
          >
            <Basicbutton
              buttonText="Disagree"
              onClick={() => setShowDialog(false)}
            />
            <Basicbutton buttonText="Agree" onClick={handleDeletePo} />
          </AlertDialog>
        </Suspense>
      )}
    </>
  );
};

export default PurchaseOrderList;
