import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import HorizonatalLine from "../../../../components/horizontalLine/horizonatalLine";
import TableComponent from "../../../../components/tables/datatable/tableComponent";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Spinner } from "react-bootstrap";
import { useSortableTable } from "../../../../components/tables/datatable/useSortableTable";

import { faSearch, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../../../components/select/customSelect";
import SearchField from "../../../../components/search/search";
const IssueDrugModal = lazy(() =>
  import("../issueToThirdParty/issuedrugmodal")
);

const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});

const IssueToCamp = () => {
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
  const [showAddDrugModal, setShowAddDrugModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const columns = useMemo(() => [
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
      id: "packagingDescp",
      name: "PACKAGING. DESCRIPTION",
      sortable: true,
    },

    {
      id: "avaibleQty",
      name: "AVAILABLE QTY",
      sortable: true,
    },

    {
      id: "issueDrugs",
      name: "ISSUE DRUGS",
      sortable: false,
    },
    ,
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

  const handleAddDrugModal = () => {
    setShowAddDrugModal(false);
  };
  useEffect(() => {
    setLoading(false);

    setTimeout(() => {}, 10000);
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
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Your Store</label>
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
              <label>Camp Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect options={[]} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="New Issue Drug Details" />
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
                    {columns.map((d, k) => {
                      if (d.id === "issueDrugs") {
                        return (
                          <TableCell
                            key={k}
                            padding="none"
                            className={classes.tableCell}
                            onClick={() => {
                              setShowAddDrugModal(true);
                              setModalData(data);
                            }}
                          >
                            <span>
                              <FontAwesomeIcon icon={faShareFromSquare} /> Click
                              Here
                            </span>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={k}
                            padding="none"
                            className={classes.tableCell}
                          >
                            {data[d.id]}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableComponent>
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <IssueDrugModal
          loading={true}
          data={modalData}
          showAddDrugModal={showAddDrugModal}
          handleAddDrugModal={handleAddDrugModal}
        />
      </Suspense>
    </>
  );
};

export default IssueToCamp;
