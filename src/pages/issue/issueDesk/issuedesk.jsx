import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import { getStockservice } from "../../../services/stockservice/stockservice";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { Link } from "react-router-dom";

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
const IssueDesk = () => {
  let classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
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
      id: "issueNumber",
      name: "ISSUE. NUMBER",
      sortable: true,
    },

    {
      id: "issueDate",
      name: "ISSUE DATE",
      sortable: true,
    },

    {
      id: "issuedTo",
      name: "ISSUED TO",
      sortable: true,
    },
    {
      id: "progName",
      name: "PROGRAM NAME.",
      sortable: true,
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: true,
    },
    {
      id: "expDate",
      name: "EXPIRY DATE",
      sortable: true,
    },
    {
      id: "reqQty",
      name: "REQ. QTY.",
      sortable: true,
    },
    {
      id: "issue",
      name: "ISSUE/TRF QTY",
      sortable: true,
    },
    {
      id: "type",
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

  const callApi = async () => {
    await getStockservice("pagination/calls/stocklisting", {
      pageNumber: controller.page,
      pageSize: controller.rowsPerPage,
    })
      .then((r) => {
        setLoading(false);
        setTotalPages(r?.data?.totalPages);
        // setTotalRows(r.data.totalElements);
        setTableData(r.data.content);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  useEffect(() => {
    setLoading(false);

    setTimeout(() => {
      callApi();
    }, 10000);
    return () => {
      clearTimeout();
    };
  }, [controller]);

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
                <Basicbutton
                  type="button"
                  buttonText="Intent Issue"
                  className="primary rounded-0"
                />
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Basicbutton
                  type="button"
                  buttonText="Offline Issue (Sub store)"
                  className="primary rounded-0"
                />
              </div>
            </div>
            <div className="col-auto">
              <div>
                <Basicbutton
                  type="button"
                  buttonText="Camp Issue"
                  className="primary rounded-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <HorizonatalLine text="Issued Details" />
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
                <TableRow>
                  <TableCell className="text-center" colSpan={12}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                tableData.length > 0 &&
                tableData.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.issueNumber}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.issueDate}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.issuedTo}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.progName}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.drugName}
                    </TableCell>

                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.batchNo}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {moment(data?.expDate).format("DD/MM/YYYY")}
                    </TableCell>

                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.reqQty}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.issue}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.type}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {data?.remarks}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      <FontAwesomeIcon
                        onClick={() => {
                          console.log("clicked");
                        }}
                        icon={faFilePdf}
                        className="me-2"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableComponent>
        </div>
      </div>
    </>
  );
};

export default IssueDesk;
