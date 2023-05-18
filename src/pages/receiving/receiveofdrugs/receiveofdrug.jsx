import React, { useState, useMemo, useEffect } from "react";
import BasicButton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import SearchField from "../../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import moment from "moment";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import {
  getReceivedDrugList,
  getReceivedDrugListResponse,
} from "../../../store/receiving/action";
import handleSortingFunc from "../../../components/tables/datatable/sortable";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";

const ReceiveOfDrugs = () => {
  const dispatch = useDispatch();
  const receivedDrugListResp = useSelector(
    (state) => state?.receiving?.receivedDrugListResp
  );
  console.log("receivedDrugListResp", receivedDrugListResp);
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "Id",
      name: "REQUEST NO.",
      sortable: true,
    },
    {
      id: "intentNo",
      name: "INTENT NO",
      sortable: true,
    },

    {
      id: "requestDate",
      name: "REQUEST DATE",
      sortable: true,
    },

    {
      id: "issueDate",
      name: "ISSUED DATE",
      sortable: true,
    },
    {
      id: "fromStore",
      name: "FROM STORE",
      sortable: true,
    },

    {
      id: "type",
      name: "TYPE",
      sortable: true,
    },
  ]);
  const handlePageChange = (newPage) => {
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
        getReceivedDrugList({
          pageNumber: controller.page,
          pageSize: controller.rowsPerPage,
        })
      );
    }
    return () => {
      dispatch(getReceivedDrugListResponse(""));
      isApiSubcribed = false;
    };
  }, [controller]);

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
  useEffect(() => {
    if (receivedDrugListResp && receivedDrugListResp?.status === 200) {
      if (
        receivedDrugListResp?.data?.pageList &&
        receivedDrugListResp?.data?.pageList?.content
      ) {
        setTotalRows(receivedDrugListResp?.data?.pageList?.totalElements);
        setTableData(receivedDrugListResp?.data?.pageList?.content);
      }
      dispatch(getReceivedDrugListResponse(""));
      setLoading(false);
    } else if (receivedDrugListResp && receivedDrugListResp?.status === 500) {
      dispatch(getReceivedDrugListResponse(""));
      setLoading(false);
    }
  }, [receivedDrugListResp]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="d-flex justify-content-start">
            <p className="fs-6">TRANSFER/INDENT RECEIVE DESK</p>
          </div>
        </div>

        <div className="row mt-2">
          <HorizonatalLine text="Rate Contract Management Desk" />
        </div>

        <div className="row mt-1 mb-2">
          <div className="d-flex justify-content-end ">
            <SearchField
              iconPosition="end"
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
                  tableData.map((data, index) => (
                    <>
                      <StyledTableRow key={data.id}>
                        <StyledTableCell>
                          {data?.transferDrugDetail &&
                          data?.transferDrugDetail.length > 0 ? (
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
                          {data?.Id}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.Id}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {moment(data?.requestDate).format("DD/MM/YYYY")}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {moment(data?.issueDate).format("DD/MM/YYYY")}
                        </StyledTableCell>

                        <StyledTableCell padding="none">
                          {data?.fromStore}
                        </StyledTableCell>
                        <StyledTableCell padding="none">
                          {data?.type}
                        </StyledTableCell>
                      </StyledTableRow>
                      {data?.transferDrugDetail &&
                      data?.transferDrugDetail.length > 0 ? (
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
                                        Drug Name
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        MANUFACTURE DATE
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        EXPIRY DATE
                                      </StyledTableCell>

                                      <StyledTableCell>REQ QTY</StyledTableCell>
                                      <StyledTableCell>
                                        TRANSFER QTY
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data?.transferDrugDetail &&
                                      data?.transferDrugDetail.length > 0 &&
                                      data?.transferDrugDetail.map((ele) => {
                                        return (
                                          <>
                                            <StyledTableRow key={ele?.id}>
                                              <StyledTableCell padding="none">
                                                {ele?.drugName}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.manufactureDate}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.expiryDate}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.requestQty}
                                              </StyledTableCell>
                                              <StyledTableCell padding="none">
                                                {ele?.issueQty}
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
      </div>
    </>
  );
};

export default ReceiveOfDrugs;
