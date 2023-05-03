import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import {
  faChevronDown,
  faFilePdf,
  faSearch,
  faChevronUp,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import { Spinner } from "react-bootstrap";
import {
  getIntentIssueList,
  getIntentIssueListResponse,
} from "../../../../store/issue/action";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const IntentIssue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intentIssueListResponse = useSelector(
    (state) => state.issuereturn?.intentIssueListResponse
  );
  console.log("intentIssueListResponse", intentIssueListResponse);
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
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const columns = useMemo(() => [
    {
      id: "action",
      name: "Action",
      sortable: false,
    },
    {
      id: "request_id",
      name: "INTENT. NUMBER",
      sortable: true,
    },

    {
      id: "request_date",
      name: "INTENT DATE",
      sortable: true,
    },

    {
      id: "fromStore",
      name: "FROM STORE",
      sortable: true,
    },
    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
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
          getIntentIssueList({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getIntentIssueListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (intentIssueListResponse && intentIssueListResponse?.status === 200) {
      setTableData(intentIssueListResponse?.data?.pageList?.content);
      setTotalRows(intentIssueListResponse?.data?.pageList?.totalElements);
      setLoading(false);
    }
  }, [intentIssueListResponse]);

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

  const handleClick = (event, index, row) => {
    if (selected.includes(index)) {
      const openCopy = selected.filter((element) => {
        return element !== index;
      });
      setSelectedRow([]);
      setSelected(openCopy);
    } else {
      setSelectedRow(row);
      const openCopy = [...selected];
      openCopy.shift();
      openCopy.push(index);
      setSelected(openCopy);
    }
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
          <p className="fs-6">INTENT DETAILS</p>
        </div>
      </div>

      <div className="row d-flex justify-content-start mb-2">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Filter By Status</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "Approved",
                  label: "Approved",
                }}
                options={[
                  {
                    value: "Approved",
                    label: "Approved",
                  },
                  {
                    value: "Rejected",
                    label: "Rejected",
                  },
                  {
                    value: "Dispatched",
                    label: "Dispatched",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                  {
                    value: "Partly Issued",
                    label: "Parttly Issued",
                  },
                ]}
              />
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
                          <Checkbox
                            onClick={(event) => handleClick(event, index, data)}
                            color="primary"
                            checked={selected.includes(index)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.request_id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.request_date}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.fromStore}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.remarks}
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
                                    <TableCell>REQ QTY</TableCell>
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
                                              {ele?.requestQty}
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

export default IntentIssue;