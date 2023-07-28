import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import Basicbutton from "src/components/button/basicbutton";
import HorizonatalLine from "src/components/horizontalLine/horizonatalLine";
import TableComponent from "src/components/tables/datatable/tableComponent";
import SearchField from "src/components/search/search";
import {
  faSearch,
  faXmark,
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

import { useDispatch, useSelector } from "react-redux";
import toastMessage from "src/common/toastmessage/toastmessage";

import TableRowLaoder from "src/components/tables/datatable/tableRowLaoder";
import EmptyRow from "src/components/tables/datatable/emptyRow";
import TablePagination from "src/components/tables/datatable/tablepagination";
import StyledTableRow from "src/components/tables/datatable/customTableRow";
import StyledTableCell from "src/components/tables/datatable/customTableCell";
import {
  DELETE_MESSAGE_DESCRIPTION,
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
  SORTINGORDER,
} from "../../common/constant/constant";

import handleSortingFunc from "src/components/tables/datatable/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "src/components/select/customSelect";
import { getPoApprovedList } from "src/store/supplier/action";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const AlertDialog = lazy(() => import("../../components/dialog/dialog"));
const SupplierList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const poApprovedListResp = useSelector(
    (state) => state.supplier.poApprovedListResp
  );
  //   const cancelPoResp = useSelector(
  //     (state) => state?.supplier?.poApprovedListResp
  //   );
  console.log("poApprovedListResp", poApprovedListResp);
  // console.log("cancelPores", cancelPoResp);
  const [tableData, setTableData] = useState([]);
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
  const [acceptable, setAcceptable] = useState(false);
  const [dispatchable, setDispatchable] = useState(false);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "SL.NO",
      sortable: true,
    },
    {
      id: "poDate",
      name: "PO DATE",
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
      setDispatchable(false);
      setAcceptable(false);
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
        getPoApprovedList({
          pageNumber: 0,
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
      poApprovedListResp &&
      poApprovedListResp?.status === NETWORK_STATUS_CODE.SUCCESS
    ) {
      setTotalRows(poApprovedListResp?.data?.pageList?.totalElements);
      setTableData(poApprovedListResp?.data?.pageList?.content);
      setLoading(false);
    } else if (
      poApprovedListResp &&
      poApprovedListResp?.status === NETWORK_STATUS_CODE?.INTERNAL_ERROR
    ) {
      setLoading(false);
      toastMessage("Supplier List", "Something went wrong", "error");
    }
  }, [poApprovedListResp]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">SUPPLIER INTERFACE DESK</p>
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
            {selected && selected.length > 0 && acceptable ? (
              <div>
                <Basicbutton
                  type="button"
                  buttonText="Acceptance"
                  className="primary btn-sm me-2 rounded-0 col-sm-12"
                  disabled={
                    selected.length > 0 && acceptable ? null : "disabled"
                  }
                  onClick={(e) => {
                    console.log("Selected Data", selectedRow);
                    navigate("/openAcceptanceForm", { state: selectedRow });
                  }}
                  icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
                />
              </div>
            ) : null}

            <div className="row mt-2 mb-2">
              <div className="d-flex justify-content-between">
                {selected && selected.length > 0 && dispatchable ? (
                  <div>
                    <Basicbutton
                      type="button"
                      buttonText="Dispatch"
                      className="primary btn-sm me-2 rounded-0 col-sm-12"
                      disabled={
                        selected.length > 0 && dispatchable ? null : "disabled"
                      }
                      onClick={(e) => {
                        console.log("Selected Data", selectedRow);
                        navigate("/openDispatchForm", { state: selectedRow });
                      }}
                      icon={<FontAwesomeIcon icon={faXmark} className="me-1" />}
                    />
                  </div>
                ) : null}
              </div>
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
                            {row?.drugList && row?.drugList.length > 0 ? (
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

                            <Checkbox
                              onClick={(event) => {
                                if (row?.status === 13) {
                                  setDispatchable(true);
                                } else if (row?.status === 4) {
                                  setAcceptable(true);
                                }
                                handleClick(event, index, row);
                              }}
                              color="primary"
                              checked={selected.includes(index)}
                              inputProps={{
                                "aria-labelledby": `enhanced-table-checkbox-${index}`,
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell padding="none">
                            {index + 1}
                          </StyledTableCell>

                          <StyledTableCell padding="none">
                            {moment(row?.poDate).format("DD/MM/YYYY")}
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
                        {row?.drugList && row?.drugList.length > 0 ? (
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
                                      {row?.drugList &&
                                        row?.drugList.length > 0 &&
                                        row?.drugList.map((ele) => {
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
    </>
  );
};

export default SupplierList;
