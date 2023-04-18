import React, { useState, useMemo } from "react";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import TableComponent from "../../../components/tables/datatable/tableComponent";

import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
const tempData = [
  {
    id: 1,
    drugName: "DVT PREVENTION DEVICE",
    pName: "CORONA VIRUS",
    batchNo: "SN:DMO6B-13201",
    mfgDate: "2015-02-28 00:00:00.0",
    expDate: "2025-02-28 00:00:00.0",
    stockQty: 1,
    institute: "NHM",
  },
  {
    id: 2,
    drugName: "DVT PREVENTION DEVICE",
    pName: "CORONA VIRUS",
    batchNo: "SN:DMO6B-13201",
    mfgDate: "2015-02-28 00:00:00.0",
    expDate: "2025-02-28 00:00:00.0",
    stockQty: 1,
    institute: "NHM",
  },
];
const AddStockVerification = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(tempData);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [verificationDate, setVerificationDate] = useState();
  // columns
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
      id: "lastVerifiedDate",
      name: "LAST VERIFIED DATE",
      sortable: true,
    },

    {
      id: "stockQty",
      name: "STOCK QTY",
      sortable: true,
    },
    {
      id: "institute",
      name: "INSTITUTE",
      sortable: true,
    },
    {
      id: "avlQty",
      name: "AVAILABLE. QTY",
      sortable: true,
    },
  ]);

  // returns boolean wether particular index is checked or not
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // onclick handle of checkbox
  const handleClick = (event, name, row) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
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
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">Stock Verification</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row">
            <div className="col-auto">
              <label>Store Name</label>
            </div>
            <div className="col-auto">
              <CustomSelect
                defaultValue={{
                  value: "stateWareHouse",
                  label: "State WareHouse",
                }}
                options={[
                  { value: "stateWareHouse", label: "State WareHouse" },
                ]}
              />
            </div>

            <div className="col-auto">
              <label>Verification Date:</label>
            </div>
            <div className="col-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.root}
                  value={verificationDate}
                  onChange={(newValue) => {
                    console.log("NewValue", newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Drug Details" />
      </div>
      <Paper>
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
              page={controller.page}
              count={totalRows}
              rowsPerPage={controller.rowsPerPage}
              order={order}
              checkBoxRequired={true}
              paginationRequired={true}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              numSelected={selected.length}
              rowCount={tableData?.length}
              actionIcon={faAdd}
              showTableActionBar={false}
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {tableData &&
                  tableData?.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={selected.includes(index)}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="none">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id, row)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        {columns.map((d, k) => {
                          if (d.id === "avlQty") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                <BasicInput
                                  type="text"
                                  placeholder="Enter the Quantity"
                                  disabled={!isItemSelected}
                                />
                              </TableCell>
                            );
                          } else if (d.id === "mfgDate" || d.id === "expDate") {
                            return (
                              <TableCell
                                key={k}
                                padding="none"
                                style={{
                                  padding: "4px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(row[d.id]).format("DD/MM/YYYY")}
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
                                {row[d.id]}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableComponent>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AddStockVerification;
