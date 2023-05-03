import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import {
  faChevronDown,
  faFilePdf,
  faSearch,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssueDeskList,
  getIssueDeskListResponse,
} from "../../../store/issue/action";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import { Spinner } from "react-bootstrap";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const IssueDesk = () => {
  const dispatch = useDispatch();
  const issueDeskResponse = useSelector(
    (state) => state.issuereturn?.issueDeskListResponse
  );
  console.log("issueDeskResponse", issueDeskResponse);
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showStockEditListModal, setShowStockEditListModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "request_id",
      name: "ISSUE. NUMBER",
      sortable: true,
    },

    {
      id: "request_date",
      name: "ISSUE DATE",
      sortable: true,
    },

    {
      id: "issueTo",
      name: "ISSUED TO",
      sortable: true,
    },

    {
      id: "issueType",
      name: "TYPE",
      sortable: true,
    },
    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
    },
    {
      id: "action",
      name: "VIEW / DOWNLOAD",
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
      setTimeout(() => {
        dispatch(
          getIssueDeskList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getIssueDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (issueDeskResponse && issueDeskResponse?.status === 200) {
      setTableData(issueDeskResponse?.data?.content);
      setTotalRows(issueDeskResponse?.data?.totalElements);
      setLoading(false);
    }
  }, [issueDeskResponse]);

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

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ISSUE DESK</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-6">
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
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <div>
                <Link to={"/openIssueToThirdparty"}>
                  <Basicbutton
                    type="button"
                    buttonText="3rd Party Issue"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Link to={"/openIssueToSubstore"}>
                  <Basicbutton
                    type="button"
                    buttonText="Intent Issue"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Link to={"/openOfflineIssue"}>
                  <Basicbutton
                    type="button"
                    buttonText="Offline Issue (Sub store)"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Link to={"/openIssueToCamp"}>
                  <Basicbutton
                    type="button"
                    buttonText="Camp Issue"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Issued Details" />
      </div>
      <Paper elevation={2}>
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
              page={controller.page + 1}
              count={totalPages}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              handleSorting={handleSortingChange}
              checkBoxRequired={true}
            >
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell className="text-center" colSpan={12}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <>
                      <StyledTableRow key={data.id}>
                        <StyledTableCell>
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
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.request_id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.request_date}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.issueTo}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.issueType}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.remarks}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          <FontAwesomeIcon
                            onClick={() => {
                              console.log("clicked");
                            }}
                            icon={faFilePdf}
                            className="me-2"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

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
                                Transfer Details
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Program Name</TableCell>
                                    <TableCell>Drug Name</TableCell>
                                    <TableCell>Batch No</TableCell>
                                    <TableCell>Expiry Date</TableCell>
                                    <TableCell>REQ QTY</TableCell>
                                    <TableCell>ISSUE/TRF QTY</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {data?.transferDetail &&
                                    data?.transferDetail.length > 0 &&
                                    data?.transferDetail.map((ele) => {
                                      return (
                                        <>
                                          <TableRow>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.programName}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.drugName}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.batchNo}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.expiryDate}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.requestQty}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              className={classes.tableCell}
                                            >
                                              {ele?.transferQty}
                                            </TableCell>
                                          </TableRow>
                                        </>
                                      );
                                    })}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
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

export default IssueDesk;