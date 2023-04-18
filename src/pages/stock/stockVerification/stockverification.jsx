import React, { useState, useMemo } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import CustomSelect from "../../../components/select/customSelect";
import { useSortableTable } from "../../../components/tables/datatable/useSortableTable";
import Basicbutton from "../../../components/button/basicbutton";
import SearchField from "../../../components/search/search";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import { TableBody, TableRow, TableCell } from "@mui/material";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {},
      "& .MuiInputBase-input": {
        padding: 8,
      },
    },
  },
});
const StockVerification = () => {
  const classes = useStyles();
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [sortedData, handleSorting] = useSortableTable(tableData);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },

    {
      id: "progName",
      name: "PROGRAM NAME",
      sortable: true,
    },
    {
      id: "batchNO",
      name: "BATCH NO",
      sortable: false,
      type: "select",
    },
    {
      id: "brandId",
      name: "BRAND ID",
      sortable: true,
    },
    {
      id: "stockQty",
      name: "STOCK QTY",
      sortable: true,
    },
    {
      id: "avlQty",
      name: "AVAILABLE. QTY",
      sortable: true,
    },
    {
      id: "remarks",
      name: "REMARKS",
      sortable: true,
    },
    {
      id: "lastVerifiedDate",
      name: "LAST VERIFIED DATE",
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
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">STOCK VERIFICATION</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{ value: "AZ", label: "Arizona" }}
                options={[
                  { value: "AL", label: "Alabama" },
                  { value: "AK", label: "Alaska" },
                  { value: "AS", label: "American Samoa" },
                  { value: "AZ", label: "Arizona" },
                  { value: "AR", label: "Arkansas" },
                  { value: "CA", label: "California" },
                  { value: "CO", label: "Colorado" },
                  { value: "CT", label: "Connecticut" },
                  { value: "DE", label: "Delaware" },
                  { value: "DC", label: "District Of Columbia" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Verified Drug List" />
      </div>
      <Paper>
        <div className="row ">
          <div className="d-flex flex-row justify-content-end">
            <Basicbutton
              buttonText="Add New Stock Verification"
              outlineType={true}
              className="primary rounded-0 mb-2 me-1 mt-2"
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
                    <TableRow hover>
                      {columns.map((d, k) => {
                        if (d.id === "lastVerifiedDate") {
                          return (
                            <TableCell
                              key={k}
                              padding="none"
                              style={{
                                padding: "4px",
                                fontSize: "0.7rem",
                              }}
                            >
                              {moment(data[d.id]).format("DD/MM/YYYY")}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={k}
                              padding="none"
                              style={{
                                padding: "4px",
                                fontSize: "0.7rem",
                              }}
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
      </Paper>
    </>
  );
};

export default StockVerification;
