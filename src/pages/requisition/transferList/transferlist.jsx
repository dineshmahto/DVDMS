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
  getIntentDrugListResponse,
  getTransferList,
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

const TransferList = () => {
  const dispatch = useDispatch();
  const transferListResponse = useSelector(
    (state) => state.requisition?.transferListResponse
  );
  console.log("transferListResponse", transferListResponse);
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "date",
      name: "DATE",
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
      id: "type",
      name: "TRANSFER TYPE",
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
          getTransferList({
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
    if (transferListResponse && transferListResponse?.status === 200) {
      if (
        transferListResponse?.data?.pageList?.content &&
        transferListResponse?.data?.pageList?.content.length > 0
      ) {
        setTableData(transferListResponse?.data?.pageList?.content);
        setTotalRows(transferListResponse?.data?.pageList?.totalElements);
      }
      dispatch(getIntentDrugListResponse(""));
      setLoading(false);
    } else if (
      transferListResponse &&
      transferListResponse?.code === "ERR_BAD_RESPONSE"
    ) {
      dispatch(getIntentDrugListResponse(""));
      setLoading(false);
    }
  }, [transferListResponse]);

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
          <p className="fs-6">Transfer List</p>
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
                          {data?.date}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.fromStore}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.toStore}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.type}
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
                                      <TableCell>Program Name</TableCell>
                                      <TableCell>Drug Name</TableCell>
                                      <TableCell>Batch</TableCell>
                                      <TableCell>AVAIL QTY</TableCell>
                                      <TableCell>REQ QTY</TableCell>
                                      <TableCell>TRANSFER QTY</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data?.transferDrugList &&
                                      data?.transferDrugList.length > 0 &&
                                      data?.transferDrugList.map((ele) => {
                                        return (
                                          <>
                                            <TableRow key={ele?.id}>
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
                                                {ele?.batch}
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
                                                {ele?.transQty}
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

export default TransferList;
