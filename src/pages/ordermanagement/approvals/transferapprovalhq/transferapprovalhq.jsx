import React, {
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import Basicbutton from "../../../../components/button/basicbutton";
import SearchField from "../../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../../common/toastmessage/toastmessage";
import { Paper } from "@mui/material";
import TablePagination from "../../../../components/tables/datatable/tablepagination";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { getTransferListForApprovalHq } from "../../../../store/ordermanagement/action";
import { Checkbox, Collapse } from "@mui/material";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const tempData = [
  {
    id: 1,
    storeName: "STATE WAREHOUSE",
    drugName: "PARACETAMOL TAB. 500MG",
    progName: "COVID19",
    batchNo: "	21443792",
    expDate: "NOV-2024",
    mfgDate: "DEC-2021",
    dToExp: "597",
    avalQty: "579",
    rack: "0 ",
    instiute: "BOTH(NHM & DHS)",
    source: "ECRP",
  },
];
const TransferApprovalHq = () => {
  const dispatch = useDispatch();
  const transferApprovalListHqResponse = useSelector(
    (state) => state.ordermanaagement?.transferApprovalListHqResponse
  );
  console.log("transferApprovalListHqResponse", transferApprovalListHqResponse);
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState(tempData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
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
      id: "drugNameList",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "programList",
      name: "PROG. NAME",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH NO.",
      sortable: true,
    },
    {
      id: "expiryDate",
      name: "EXP DATE",
      sortable: true,
    },
    {
      id: "dayToExp",
      name: "DAYS TO EXP",
      sortable: true,
    },
    {
      id: "requestQty",
      name: "REQ QTY.",
      sortable: true,
    },
    {
      id: "reqType",
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
      dispatch(
        getTransferListForApprovalHq({
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
      transferApprovalListHqResponse &&
      transferApprovalListHqResponse?.status === 200
    ) {
      setTotalRows(transferApprovalListHqResponse?.data?.totalElements);
      setTableData(transferApprovalListHqResponse?.data?.content);
      setLoading(false);
    } else if (
      transferApprovalListHqResponse &&
      transferApprovalListHqResponse?.status == 400
    ) {
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
    handleSorting(accessor, sortOrder);
  };
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;

          return (
            a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), "en", {
                numeric: true,
              }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
        setSelected([]);

        setTableData(sorted);
      }
    },
    [sortField, order, tableData]
  );
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
          <p className="fs-6">APPORVAL DESK</p>
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
              <label>Request Type</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "intentIssue",
                  label: "Intent for Issue",
                }}
                options={[
                  {
                    value: "intentIssue",
                    label: "Intent for Issue",
                  },
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
            iconName={faSearch}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <Paper>
        {/* Table Rendering */}
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              page={controller.page + 1}
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
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
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id, row)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.fromStore}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.toStore}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.requestDate}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.drugNameList &&
                            row?.drugNameList.length > 1 && (
                              <>
                                <div className="d-flex justify-content-end">
                                  <FontAwesomeIcon
                                    icon={
                                      open.includes(index)
                                        ? faChevronUp
                                        : faChevronDown
                                    }
                                    onClick={() => handleCollapse(index)}
                                  />
                                </div>
                              </>
                            )}

                          {row.drugNameList && row?.drugNameList.length > 1 && (
                            <Collapse in={open.includes(index)}>
                              {row?.drugNameList &&
                                row?.drugNameList.length > 1 &&
                                row?.drugNameList.map((elem, index) => {
                                  return (
                                    <div className="pt-2 pb-2 ">{elem}</div>
                                  );
                                })}
                            </Collapse>
                          )}

                          {row.drugNameList &&
                            row?.drugNameList.length === 1 &&
                            row?.drugNameList.map((elem, index) => {
                              return <div className="">{elem}</div>;
                            })}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.programList && row?.programList.length > 1 && (
                            <Collapse in={open.includes(index)}>
                              {row?.programList &&
                                row?.programList.length > 1 &&
                                row?.programList.map((elem, index) => {
                                  return (
                                    <div className="pt-2 pb-2 ">{elem}</div>
                                  );
                                })}
                            </Collapse>
                          )}
                        </TableCell>

                        {/* <TableCell padding="none" className={classes.tableCell}>
                          {row.batchNo && row?.batchNo.length > 1 && (
                            <Collapse in={open?.includes(index)}>
                              {row?.batchNo &&
                                row?.batchNo?.length > 0 &&
                                row?.batchNo?.map((elem, index) => {
                                  return (
                                    <div className="pt-2 pb-2 ">{elem}</div>
                                  );
                                })}
                            </Collapse>
                          )}
                        </TableCell> */}

                        <TableCell padding="none" className={classes.tableCell}>
                          {row.expiryDate && row?.expiryDate.length > 1 && (
                            <Collapse in={open.includes(index)}>
                              {row?.expiryDate &&
                                row?.expiryDate.length > 1 &&
                                row?.expiryDate.map((elem, index) => {
                                  return (
                                    <div className="pt-2 pb-2 ">{elem}</div>
                                  );
                                })}
                            </Collapse>
                          )}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.dayToExp}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {row.requestQty && row?.requestQty.length > 1 && (
                            <Collapse in={open.includes(index)}>
                              {row?.requestQty &&
                                row?.requestQty.length > 1 &&
                                row?.requestQty.map((elem, index) => {
                                  return (
                                    <div className="pt-2 pb-2 ">{elem}</div>
                                  );
                                })}
                            </Collapse>
                          )}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.reqType}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {row?.status}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

export default TransferApprovalHq;
