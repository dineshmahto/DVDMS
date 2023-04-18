import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPenToSquare,
  faTrash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import API from "../../../config/config";
const AddNewDrugModal = lazy(() => import("./addnewdrug"));
const AddNewAssetModal = lazy(() => import("./addnewasset"));
const EditDrugModal = lazy(() => import("./editdrugmodal"));

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const DrugDesk = () => {
  const classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showEditDrugModal, setEditDrugModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => [
    {
      id: "drugId",
      name: "DRUG ID",
      sortable: true,
    },

    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },
    {
      id: "strengthUnit",
      name: "STRENGTH UNIT",
      sortable: true,
    },
    {
      id: "mName",
      name: "MANUFACTURER NAME",
      sortable: true,
    },
    {
      id: "pType",
      name: "PACKAGE TYPE",
      sortable: true,
    },
    {
      id: "dClass",
      name: "DRUG CLASS",
      sortable: true,
    },
    {
      id: "category",
      name: "CATEGORY",
      sortable: true,
    },

    {
      id: "Action",
      name: "Edit / Delete",
      sortable: false,
    },
  ]);

  const fetchApi = async (signal) => {
    await API.get("", { signal })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request canceled", error.message);
        } else {
          if (error.response) {
            console.log("Response", error.response);
          } else if (error.request) {
            console.log("Error Request", error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    fetchApi(signal);
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setLoading(true);
    setController({
      ...controller,
      page: newPage - 1,
    });
  };
  const handleChangeRowsPerPage = (current, pageSize) => {
    console.log(current, pageSize);
    setController({
      ...controller,
      rowsPerPage: pageSize,
      page: 0,
    });
  };
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    // console.log("tableData", tableData);
    // handleSorting(accessor, sortOrder, tableData);
    // console.log("sortedData", sortedData);
    // setTableData(sortedData);
  };
  const handleOpenAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  const handleOpenAddAssetModal = () => {
    setShowAddAssetModal(false);
  };
  const handleEditDrugModal = () => {
    setEditDrugModal(false);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">DRUG / ASSETS DESK</p>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Drug Management Desk" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Drug"
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {
                setShowAddDrugModal(true);
              }}
            />
          </div>
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 "
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
              count={totalRows}
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
                  tableData &&
                  tableData.length > 0 &&
                  tableData.map((data, index) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.drugId}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.drugName}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.strengthUnit}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.mName}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.pType}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.dClass}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.category}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          <span
                            className="text-decoration-underline ms-1"
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
                          </span>
                          <span className="m-1"> |</span>

                          <span
                            className="text-decoration-underline"
                            style={{
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="ms-2"
                              color="red"
                            />
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
                {!loading && tableData && (
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
          <Suspense>
            <AddNewDrugModal
              openAddNewDrugModal={showAddDrugModal}
              handleOpenAddDrugModal={handleOpenAddDrugModal}
            />
          </Suspense>

          <Suspense>
            <AddNewAssetModal
              openAddNewAssetModal={showAddAssetModal}
              handleOpenAddAssetModal={handleOpenAddAssetModal}
            />
          </Suspense>
          <Suspense>
            <EditDrugModal
              openEditDrugModal={showEditDrugModal}
              handleEditDrugModal={handleEditDrugModal}
            />
          </Suspense>
        </div>
      </Paper>
    </>
  );
};

export default DrugDesk;
