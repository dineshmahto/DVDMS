import React, { useEffect, useMemo, useState } from "react";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import Basicbutton from "../../../components/button/basicbutton";
import BasicModal from "../../../components/modal/basicmodal";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import { Spinner } from "react-bootstrap";
const useStyles = makeStyles({
  tableCell: {
    padding: "10px !important",
    fontSize: "0.8rem !important",
  },
  lineHeight: {
    lineHeight: "3",
  },
});
const BudgetListDesk = () => {
  const classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  console.log(typeof tableData, tableData.length);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => [
    {
      id: "programme",
      name: "PROGRAMME",
      sortable: true,
    },

    {
      id: "financialYear",
      name: "FINANCIAL YEAR",
      sortable: true,
    },
    {
      id: "fundingSource",
      name: "FUNDING SOURCE",
      sortable: true,
    },
    {
      id: "budgetAllocated",
      name: "BUDGET ALLOCATED",
      sortable: false,
    },
    {
      id: "utlzBudget",
      name: "UTILIZED BUDGET",
      sortable: false,
    },
    {
      id: "avlBudget",
      name: "AVAILABLE BUDGET",
      sortable: false,
    },
  ]);
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

  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">BUDGET LIST DESK</p>
        </div>
      </div>

      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Allocate New Budget"
              className="btn btn-primary rounded-0 mb-2 me-1 mt-2"
              onClick={() => {}}
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
                          {data.programme}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data.financialYear}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.fundingSource}
                        </TableCell>

                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.budgetAllocated}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.utlzBudget}
                        </TableCell>
                        <TableCell padding="none" className={classes.tableCell}>
                          {data?.avlBudget}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}

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
      </Paper>
    </>
  );
};

export default BudgetListDesk;
