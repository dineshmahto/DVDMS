import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReturnDeskList } from "../../../store/issue/action";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import Typography from "@mui/material/Typography";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { getReturnDeskListResponse } from "../../../store/issue/action";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import { toast } from "react-toastify";
import toastMessage from "../../../common/toastmessage/toastmessage";

const ReturnDesk = () => {
  const dispatch = useDispatch();
  const returnDeskListResp = useSelector(
    (state) => state?.issuereturn?.returnDeskListResponse
  );

  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => [
    {
      id: "id",
      name: "RETURN NUMBER",
      sortable: true,
    },

    {
      id: "date",
      name: "RETURN DATE",
      sortable: true,
    },

    {
      id: "type",
      name: "RETURN TYPE",
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
      dispatch(
        getReturnDeskList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getReturnDeskListResponse(""));
    };
  }, [controller]);

  useEffect(() => {
    if (returnDeskListResp && returnDeskListResp?.status === 200) {
      if (
        returnDeskListResp?.data?.pageList &&
        returnDeskListResp?.data?.pageList?.content
      ) {
        setTotalRows(returnDeskListResp?.data?.pageList?.totalElements);
        setTableData(returnDeskListResp?.data?.pageList?.content);
      }
      dispatch(getReturnDeskListResponse(""));
      setLoading(false);
    } else if (
      returnDeskListResp &&
      returnDeskListResp?.code == "ERR_BAD_REQUEST"
    ) {
      toastMessage("Return Desk", "BAD REQUEST");
      dispatch(getReturnDeskListResponse(""));
      setLoading(false);
    } else if (returnDeskListResp && returnDeskListResp?.status === 500) {
      toastMessage("Return Desk", "Something went wrong");
      dispatch(getReturnDeskListResponse(""));
      setLoading(false);
    }
  }, [returnDeskListResp]);

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
          <p className="fs-6">RETURN DESK</p>
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
              <label>Return Type</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "ALL",
                  label: "All",
                }}
                options={[{ value: "ALL", label: "All" }]}
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
                    buttonText="3rd Party Return"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Basicbutton
                  type="button"
                  buttonText="Sub Store Return"
                  className="primary rounded-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Return Details" />
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
                  <TableRowLaoder />
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
                          {data?.date}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.type}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.remarks}
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
                                  Return Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell className="text-center">
                                        Program Name
                                      </StyledTableCell>
                                      <StyledTableCell className="text-center">
                                        Drug Name
                                      </StyledTableCell>
                                      <StyledTableCell className="text-center">
                                        Batch
                                      </StyledTableCell>
                                      <StyledTableCell className="text-center">
                                        Expiry Date
                                      </StyledTableCell>
                                      <StyledTableCell className="text-center">
                                        No of Days To Exp{" "}
                                      </StyledTableCell>
                                      <StyledTableCell className="text-center">
                                        Return QTY
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
                                                {ele?.expiryDate}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.dayToExpire < 0 ? (
                                                  <span class="badge rounded-pill bg-danger">
                                                    Expired
                                                  </span>
                                                ) : ele?.dayToExpire < 100 ? (
                                                  <span class="badge rounded-pill bg-warning">
                                                    Soon to Expire
                                                  </span>
                                                ) : (
                                                  <span class="badge rounded-pill bg-success">
                                                    Active
                                                  </span>
                                                )}
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

export default ReturnDesk;
