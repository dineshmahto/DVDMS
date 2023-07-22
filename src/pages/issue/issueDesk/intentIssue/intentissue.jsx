import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
import {
  getIntentIssueList,
  getIntentIssueListResponse,
} from "../../../../store/issue/action";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import TableRowLaoder from "../../../../components/tables/datatable/tableRowLaoder";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";
const IntentIssueConfirmModal = lazy(() => import("./intentissueconfirmmodal"));
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
  const [filterData, setFilterData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    status: 99,
  });
  const [loading, setLoading] = useState(false);
  const [showIntentIssueModal, setShowIntentIssueModal] = useState(false);
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
    // {
    //   id: "remarks",
    //   name: "REMARKS",
    //   sortable: true,
    // },
    {
      id: "status",
      name: "STATUS",
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
            status: controller.status,
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
      setFilterData(intentIssueListResponse?.data?.pageList?.content);
      setTableData(intentIssueListResponse?.data?.pageList?.content);
      setTotalRows(intentIssueListResponse?.data?.pageList?.totalElements);
      setLoading(false);
    }
  }, [intentIssueListResponse]);

  const handleCollapse = (clickedIndex) => {
    console.log("clickedIndex", clickedIndex);
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
      setShowIntentIssueModal(true);
    }
  };
  const handleStatusChange = (selectedOption) => {
    setController({
      ...controller,
      status: selectedOption?.value,
    });
  };

  const recursiveSearch = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === target.id) {
        return arr[i];
      }
      if (arr[i].children) {
        const result = recursiveSearch(arr[i].children, target);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  // function _find(collection, value) {
  //   const filteredData = [...collection]?.filter((item) => {
  //     if (
  //       Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value?.toLowerCase())
  //     ) {
  //       return o;
  //     }

  //     if (Array.isArray(v)) {
  //       const _o = _find(v, value);
  //       if (_o) {
  //         return _o;
  //       }
  //     }
  //   });
  // }

  const handleRejectIntent = () => {
    console.log("selected", selectedRow);
  };

  const handleIssueIntent = () => {
    console.log("selected", selected[0]);
    navigate("/openIssueIndent", { state: selected[0] });
  };

  const handleIntentIssueModal = () => {
    setShowIntentIssueModal(false);
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
                  value: 99,
                  label: "All",
                }}
                options={[
                  {
                    value: 99,
                    label: "All",
                  },
                  {
                    value: 4,
                    label: "Approved",
                  },
                  {
                    value: 7,
                    label: "Rejected",
                  },
                  {
                    value: 8,
                    label: "Dispatched",
                  },
                  {
                    value: 9,
                    label: "Completed",
                  },
                  {
                    value: 20,
                    label: "Parttly Issued",
                  },
                ]}
                onChange={handleStatusChange}
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
                console.log(e?.target?.value);
                // console.log(recursiveSearch(filterData, e.target?.value));
                // console.log(_find(filterData, e?.target?.value));
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
              checkBoxRequired={true}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => (
                    <>
                      <StyledTableRow key={data.request_id}>
                        <StyledTableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleCollapse(data?.request_id)}
                          >
                            <FontAwesomeIcon
                              icon={
                                open.includes(data?.request_id)
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={(event) =>
                              handleClick(event, data?.request_id, data)
                            }
                            color="primary"
                            checked={selected.includes(data?.request_id)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${data?.request_id}`,
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
                        {/* <StyledTableCell padding="none">
                          {data?.remarks}
                        </StyledTableCell> */}
                        <StyledTableCell padding="none">
                          {data?.status}
                        </StyledTableCell>
                      </StyledTableRow>

                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={open.includes(data?.request_id)}
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
                                    data?.transferDetail.map((ele, index) => {
                                      return (
                                        <>
                                          <StyledTableRow key={index}>
                                            <StyledTableCell padding="none">
                                              {ele?.programName}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.drugName}
                                            </StyledTableCell>

                                            <StyledTableCell padding="none">
                                              {ele?.requestQty}
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

            <Suspense>
              <IntentIssueConfirmModal
                showIntentIssueModal={showIntentIssueModal}
                handleIntentIssueModal={handleIntentIssueModal}
                handleIssueIntent={handleIssueIntent}
                handleRejectIntent={handleRejectIntent}
              />
            </Suspense>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default IntentIssue;
