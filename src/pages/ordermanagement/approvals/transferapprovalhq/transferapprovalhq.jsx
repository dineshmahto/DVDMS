import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import {
  getTransferListForApprovalHq,
  getTransferListForApprovalHqResponse,
} from "../../../../store/ordermanagement/action";
import { Checkbox } from "@mui/material";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import handleSortingFunc from "../../../../components/tables/datatable/sortable";
import StyledTableRow from "../../../../components/tables/datatable/customTableRow";
import StyledTableCell from "../../../../components/tables/datatable/customTableCell";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import NormalTableRow from "../../../../components/tables/datatable/normalTableRow";
import EmptyRow from "../../../../components/tables/datatable/emptyRow";

const TransferApprovalHq = () => {
  const dispatch = useDispatch();
  const transferApprovalListHqResponse = useSelector(
    (state) => state.ordermanaagement?.transferApprovalListHqResponse
  );
  console.log("transferApprovalListHqResponse", transferApprovalListHqResponse);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    type: 99,
  });
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [open, setOpen] = useState([]);
  const columns = useMemo(() => [
    {
      id: "fromStore",
      name: "STORE",
      sortable: true,
    },

    {
      id: "toStore",
      name: "REQ NO",
      sortable: true,
    },

    {
      id: "requestDate",
      name: "REQ. DATE",
      sortable: true,
    },

    {
      id: "requestType",
      name: "REQ TYPE.",
      sortable: true,
    },
    {
      id: "status",
      name: "STATUS.",
      sortable: true,
    },
  ]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getTransferListForApprovalHq({
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 500);
    }
    return () => {
      clearTimeout();
      dispatch(getTransferListForApprovalHqResponse(""));
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      transferApprovalListHqResponse &&
      transferApprovalListHqResponse?.status === 200
    ) {
      if (transferApprovalListHqResponse?.data?.pageList) {
        setTotalRows(
          transferApprovalListHqResponse?.data?.pageList?.totalElements
        );
        setTableData(transferApprovalListHqResponse?.data?.pageList?.content);
      }

      dispatch(getTransferListForApprovalHqResponse(""));
      setLoading(false);
    } else if (
      transferApprovalListHqResponse &&
      transferApprovalListHqResponse?.status == 400
    ) {
      dispatch(getTransferListForApprovalHqResponse(""));
      setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [transferApprovalListHqResponse]);

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
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
  // returns boolean wether particular index is checked or not
  const isSelected = (name) => selected.indexOf(name) !== -1;
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
        <div className="d-flex justify-content-start">
          <p className="fs-6">TRNSFER APPORVAL (HQ)</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start mb-2">
        <div className="col-12">
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
              <label>Request Type</label>
            </div>
            <div className="col-2">
              <CustomSelect
                defaultValue={{
                  value: "99",
                  label: "All",
                }}
                options={[
                  {
                    value: "9",
                    label: "Transfer-Demand Request(Shortage)",
                  },
                  {
                    value: "10",
                    label: "Transfer-Demand Request(Excess)",
                  },
                ]}
                onChange={(selectedOption) => {
                  setController({
                    ...controller,
                    type: selectedOption?.value,
                  });
                }}
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
                <Link to={""}>
                  <Basicbutton
                    type="button"
                    buttonText="Approval"
                    className="primary rounded-0"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Excess / Shortage Requested Details" />
      </div>
      <div className="row mb-1">
        <div className="d-flex justify-content-end">
          <SearchField
            className="me-1 mt-1"
            iconPosition="end"
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <Paper>
        {/* Table Rendering */}

        <TableComponent
          columns={columns}
          sortField={sortField}
          order={order}
          handleSorting={handleSortingChange}
          checkBoxRequired={true}
        >
          <TableBody>
            {tableData &&
              tableData.length > 0 &&
              tableData?.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <>
                    <StyledTableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <div className="d-flex">
                          <Checkbox
                            size="small"
                            onClick={(event) => handleClick(event, row.id, row)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                          {row?.transferDrugs &&
                          row?.transferDrugs.length > 0 ? (
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
                        </div>
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {row?.fromStore}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {row?.toStore}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {row?.requestDate}
                      </StyledTableCell>

                      <StyledTableCell padding="none">
                        {row?.requestType}
                      </StyledTableCell>
                      <StyledTableCell padding="none">
                        {row?.status}
                      </StyledTableCell>
                    </StyledTableRow>
                    {row?.transferDrugs && row?.transferDrugs.length > 0 ? (
                      <NormalTableRow>
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
                                    <StyledTableCell>DRUG NAME</StyledTableCell>
                                    <StyledTableCell>
                                      PROG. NAME
                                    </StyledTableCell>
                                    <StyledTableCell>BATCH NO</StyledTableCell>
                                    <StyledTableCell>EXP DATE</StyledTableCell>
                                    <StyledTableCell>
                                      DAYS TO EXP
                                    </StyledTableCell>
                                    <StyledTableCell>REQ QTY</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row?.transferDrugs &&
                                    row?.transferDrugs.length > 0 &&
                                    row?.transferDrugs.map((ele) => {
                                      return (
                                        <>
                                          <NormalTableRow hover key={ele?.id}>
                                            <StyledTableCell padding="none">
                                              {ele?.drugName}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.programName}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.batchNo}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.requestQty}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.transQty}
                                            </StyledTableCell>
                                            <StyledTableCell padding="none">
                                              {ele?.transferQty}
                                            </StyledTableCell>
                                          </NormalTableRow>
                                        </>
                                      );
                                    })}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </NormalTableRow>
                    ) : null}
                  </>
                );
              })}
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
      </Paper>
    </>
  );
};

export default TransferApprovalHq;
