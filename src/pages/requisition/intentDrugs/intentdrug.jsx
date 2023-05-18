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
import SearchField from "../../../components/search/search";
import { Paper } from "@mui/material";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { useDispatch, useSelector } from "react-redux";
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
import {
  getIntentDrugList,
  getIntentDrugListResponse,
} from "../../../store/requisition/action";
import EmptyRow from "../../../components/tables/datatable/emptyRow";

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const IntentDrug = () => {
  const dispatch = useDispatch();
  const intentDrugsListResp = useSelector(
    (state) => state.requisition?.intentDrugsListResponse
  );
  console.log("intentDrugsListResp", intentDrugsListResp);
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    status: 99,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "INDENT ID",
      sortable: true,
    },

    {
      id: "fromStore",
      name: "FROM",
      sortable: true,
    },

    {
      id: "toStore",
      name: "TO",
      sortable: true,
    },

    {
      id: "date",
      name: "INDENT DATE",
      sortable: true,
    },

    {
      id: "status",
      name: "STATUS",
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
          getIntentDrugList({
            ...controller,
            page: controller.page,
            rowsPerPage: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      isApiSubcribed = false;
      clearTimeout();
      dispatch(getIntentDrugListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (intentDrugsListResp && intentDrugsListResp?.status === 200) {
      setTableData(intentDrugsListResp?.data?.pageList?.content);
      setTotalRows(intentDrugsListResp?.data?.pageList?.totalElements);
      setLoading(false);
    }
  }, [intentDrugsListResp]);

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

  const handleStatusChange = (selectedOption) => {
    setController({
      ...controller,
      status: selectedOption?.value,
    });
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">INTENT OF DRUGSs</p>
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
            <div className="col-auto">
              <label>Indent Status</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "99",
                  label: "All",
                }}
                options={[
                  {
                    value: "99",
                    label: "All",
                  },
                  {
                    value: "0",
                    label: "Draft",
                  },
                  {
                    value: "1",
                    label: "Approval Pending",
                  },
                  {
                    value: "3",
                    label: "Cancelled",
                  },
                  {
                    value: "4",
                    label: "Approved",
                  },
                  {
                    value: "5",
                    label: "Rejected",
                  },
                  {
                    value: "8",
                    label: "Dispatched",
                  },
                  {
                    value: "16",
                    label: "Completed",
                  },
                  {
                    value: "15",
                    label: "Cancelled",
                  },
                ]}
                onChange={handleStatusChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Excess/Shortage Requested Details" />
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
              order={order}
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
                          {data?.transferDrugList &&
                          data?.transferDrugList.length > 0 ? (
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
                          {data?.id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.fromStore}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.toStore}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {moment(data?.date).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.status}
                        </StyledTableCell>
                      </StyledTableRow>
                      {data?.transferDrugList &&
                      data?.transferDrugList.length > 0 ? (
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
                                      <StyledTableCell>
                                        Program Name
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Drug Name
                                      </StyledTableCell>
                                      <StyledTableCell>Batch</StyledTableCell>

                                      <StyledTableCell>REQ QTY</StyledTableCell>
                                      <StyledTableCell>
                                        TRANSFER QTY
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data?.transferDrugList &&
                                      data?.transferDrugList.length > 0 &&
                                      data?.transferDrugList.map((ele) => {
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
                                                {ele?.batch}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.requestQty}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.transQty}
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
    </>
  );
};

export default IntentDrug;
