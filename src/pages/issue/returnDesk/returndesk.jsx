import React, { useState, useMemo, useEffect } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReturnDeskList } from "../../../store/issue/action";
import StyledTableRow from "../../../components/tables/datatable/customTableRow";
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
const ReturnDesk = () => {
  const dispatch = useDispatch();
  const returnDeskListResp = useSelector(
    (state) => state?.issuereturn?.returnDeskListResponse
  );
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState(tempData);
  const [sortedData, handleSorting] = useSortableTable(tableData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showStockEditListModal, setShowStockEditListModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const columns = useMemo(() => [
    {
      id: "returnNumber",
      name: "RETURN NUMBER",
      sortable: true,
    },

    {
      id: "returnDate",
      name: "RETURN DATE",
      sortable: true,
    },

    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "progName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: true,
    },
    {
      id: "expiryDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "noOfDaysToExpire",
      name: "NO OF DAYS TO EXPIRE",
      sortable: true,
    },
    {
      id: "returnQty",
      name: "RETURN. QTY.",
      sortable: true,
    },
    {
      id: "returnType",
      name: "RETURN TYPE",
      sortable: true,
    },

    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
    },
  ]);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
    setTableData(sortedData);
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
    };
  }, [controller]);

  useEffect(() => {
    if (returnDeskListResp && returnDeskListResp?.status === 200) {
      setTotalRows(returnDeskListResp?.data?.totalElements);
      setTableData(returnDeskListResp?.data?.content);
      setLoading(false);
    } else if (returnDeskListResp && returnDeskListResp?.status == 400) {
      setLoading(false);
    }
  }, [returnDeskListResp]);

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
            checkBoxRequired={false}
          >
            <TableBody>
              {loading ? (
                <StyledTableRow>
                  <TableCell className="text-center" colSpan={12}>
                    <Spinner />
                  </TableCell>
                </StyledTableRow>
              ) : (
                tableData &&
                tableData?.length > 0 &&
                tableData?.map((data, index) => {
                  return (
                    <StyledTableRow key={data.id}>
                      <TableCell padding="none">
                        <Checkbox
                          onClick={(event) => handleClick(event, index, data)}
                          color="primary"
                          checked={selected.includes(index)}
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="none" className={classes.tableCell}>
                        {moment(data.notificationDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell
                        padding="none"
                        className={[classes.tableCell, "text-center"]}
                      >
                        {data.financialDate}
                      </TableCell>
                      <TableCell
                        padding="none"
                        className={[classes.tableCell, "text-center"]}
                      >
                        {moment.utc(data.lastDate).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell
                        padding="none"
                        className={[classes.tableCell, "text-center"]}
                      >
                        {data?.programList && data?.programList.length > 0 ? (
                          <span
                            className="text-decoration-underline"
                            onClick={() => {
                              setModalTitle("Programme List");
                              setPreviewList(data?.programList);
                              setShow(true);
                            }}
                            style={{ fontSize: "0.7rem", cursor: "pointer" }}
                          >
                            VIEW PROGRAMME LIST
                          </span>
                        ) : (
                          "NONE"
                        )}
                      </TableCell>
                      <TableCell
                        padding="none"
                        className={[classes.tableCell, "text-center"]}
                      >
                        {data?.drugList && data?.drugList.length > 0 ? (
                          <span
                            className="text-decoration-underline"
                            onClick={() => {
                              setModalTitle("Drug List");
                              setPreviewList(data?.drugList);
                              setShow(true);
                            }}
                            style={{ fontSize: "0.7rem" }}
                          >
                            VIEW DRUGLIST
                          </span>
                        ) : (
                          ""
                        )}
                      </TableCell>

                      <TableCell
                        padding="none"
                        className={[classes.tableCell, "text-center"]}
                      >
                        {data?.staus === 10 || data?.status === 11 ? (
                          <FontAwesomeIcon icon={faDownload} />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </StyledTableRow>
                  );
                })
              )}
              {console.log(tableData?.length)}
              {!loading && tableData && tableData.length === 0 && (
                <TableRow>
                  <TableCell className="text-center" colSpan={12}>
                    <p style={{ fontSize: "0.8rem" }}>
                      NO DATA AVAILABE IN TABLE
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    </>
  );
};

export default ReturnDesk;
