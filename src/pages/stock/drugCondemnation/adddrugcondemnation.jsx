import React, { useState, useMemo, useEffect } from "react";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SearchField from "../../../components/search/search";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import {
  faSearch,
  faAdd,
  faPlus,
  faFloppyDisk,
  faRefresh,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDrugCondemnation,
  getAddDrugCondemnationList,
  getAddDrugCondemnationListResponse,
  addDrugCondemnationResponse,
} from "../../../store/stock/action";
import TablePagination from "../../../components/tables/datatable/tablepagination";
import RadioCheckBox from "../../../components/switch/radiocheckbox";
import EmptyRow from "../../../components/tables/datatable/emptyRow";
import TableRowLaoder from "../../../components/tables/datatable/tableRowLaoder";
import searchFunc from "../../../components/tables/searchFunc";
import NormalTableRow from "../../../components/tables/datatable/normalTableRow";
import StyledTableCell from "../../../components/tables/datatable/customTableCell";

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

const AddDrugCondemnation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addDrugCondemnationListResp = useSelector(
    (state) => state?.stock?.addDrugCondemnationListResponse
  );
  const addDrugCondemnationResponse = useSelector(
    (state) => state?.stock?.addDrugCondemnationResponse
  );
  const [cloneData, setCloneData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    condemnType: "99",
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [displaySelected, setDisplaySelected] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [entryDate, setEntryDate] = useState(null);
  const [condemnType, setCondemnType] = useState("");
  // columns

  const columns = useMemo(() => [
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: true,
    },

    {
      id: "programName",
      name: "PROGRAM NAME",
      sortable: true,
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
      type: "select",
    },
    {
      id: "mnfDate",
      name: "MNF. DATE",
      sortable: true,
    },
    {
      id: "expDate",
      name: "EXP. DATE",
      sortable: true,
    },

    {
      id: "stockQty",
      name: "STOCK QTY",
      sortable: true,
    },

    {
      id: "condemnQty",
      name: "CONDEM. QTY",
      sortable: true,
    },
  ]);

  // returns boolean wether particular index is checked or not
  const isSelected = (name, selectList) => selectList.indexOf(name) !== -1;

  // onclick handle of checkbox
  const handleClick = (list, name, setSelected) => {
    const selectedIndex = list.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(list, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(list.slice(1));
    } else if (selectedIndex === list.length - 1) {
      newSelected = newSelected.concat(list.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        list.slice(0, selectedIndex),
        list.slice(selectedIndex + 1)
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

  const handleChange = (idx, id, e, data, setData) => {
    const clone = [...data];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    setData(clone);
  };

  //   Add Button event Listner to show selected List
  const handleSelectedList = () => {
    if (selected && selected.length > 0) {
      const selectedList = [...tableData].filter((elem) => {
        return selected.find((ele) => {
          return ele === elem.id;
        });
      });
      displayData.concat(selectedList);
      const totalSelectedList = [...displayData, ...selectedList];
      const isEmpty = totalSelectedList?.some(function (object) {
        return object.avlQty == "";
      });
      if (!isEmpty) {
        const newIssueList = tableData.filter((elem) => {
          return !selected.find((ele) => {
            return ele === elem.id;
          });
        });
        //setSelected([]);
        setDisplaySelected(selected);
        setDisplayData(totalSelectedList);
        setTableData(newIssueList);
      } else {
        toastMessage(
          "Stock Verification",
          "Fill up the selected List to Transfer",
          "error"
        );
      }
    } else {
      toastMessage("Drug  Condemnation", "Select the Checkbox to add", "error");
    }
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          getAddDrugCondemnationList({
            ...controller,
            pageNumber: controller.page,
            pageSize: controller.rowsPerPage,
          })
        );
      }, 1000);
    }
    return () => {
      dispatch(getAddDrugCondemnationListResponse(""));
      clearTimeout();
      isApiSubcribed = false;
    };
  }, [controller]);

  useEffect(() => {
    if (
      addDrugCondemnationListResp &&
      addDrugCondemnationListResp?.status === 200
    ) {
      setSelected([]);
      setTotalRows(addDrugCondemnationListResp?.data?.pageList?.totalElements);
      setTableData(addDrugCondemnationListResp?.data?.pageList?.content);
      setFilterData(addDrugCondemnationListResp?.data?.pageList?.content);
      setCloneData(addDrugCondemnationListResp?.data?.pageList?.content);
      setLoading(false);
      dispatch(getAddDrugCondemnationListResponse(""));
    } else if (
      addDrugCondemnationListResp &&
      addDrugCondemnationListResp?.status === 400
    ) {
      setLoading(false);
      dispatch(getAddDrugCondemnationListResponse(""));
    }
  }, [addDrugCondemnationListResp]);

  useEffect(() => {
    if (
      addDrugCondemnationResponse &&
      addDrugCondemnationResponse?.status === 201
    ) {
      toastMessage("Drug Condemnation", "successfully added");
      dispatch(addDrugCondemnationResponse(""));
    }
  }, [addDrugCondemnationResponse]);

  const handleSubmit = () => {
    console.log("DisplayData", displayData);
    if (entryDate === null || entryDate === "") {
      toastMessage("Verification Desk", "Select the Verification Date");
    } else if (remarks === "") {
      toastMessage("Verification Desk", "Enter the Remarks");
    } else {
      const finalData = [...displayData]?.map(({ id, condemnQty }) => ({
        id,
        condemnQty,
      }));
      console.log("finalData", finalData);

      dispatch(
        addDrugCondemnation({
          inputData: finalData,
          entryDate: entryDate,
          remarks: remarks,
        })
      );
    }
  };

  const handleReset = () => {
    setTableData(cloneData);
    setSelected([]);
    setDisplayData([]);
  };
  return (
    <>
      <div className="row mt-2">
        <div className="d-flex jsutify-content-start">
          <Basicbutton
            buttonText="Back"
            className="warning rounded-0"
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate("/openCondeminationRegister")}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex justify-content-start">
          <p className="fs-6">ADD DRUG CONDEMNATION</p>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row text-align-center mb-1">
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
                  value={entryDate}
                  onChange={(newValue) => {
                    console.log("NewValue", newValue);
                    setEntryDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-start">
        <div className="col-12">
          <div className="row">
            <div className="col-auto">
              <label>Condemn Type</label>
              <RadioCheckBox
                list={[
                  {
                    id: "nonStandard",
                    labelText: "Non-standard Drugs",
                    value: "3",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                  {
                    id: "breakage",
                    labelText: "Breakage",
                    value: "16",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },

                  {
                    id: "expNI",
                    labelText: "Expired Not Issued",
                    value: "17",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                  {
                    id: "expBI",
                    labelText: "Expired but Issued",
                    value: "27",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                  {
                    id: "rejected",
                    labelText: "Rejected",
                    value: "18",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                  {
                    id: "recvBroken",
                    labelText: "Received Broken",
                    value: "19",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                  {
                    id: "qcSentDrug",
                    labelText: "QC Sent Drugs",
                    value: "1",
                    name: "condemnType",
                    checked: controller?.condemnType,
                  },
                ]}
                onChange={(e) => {
                  console.log(e.target.value);
                  setController({
                    ...controller,
                    condemnType: e?.target?.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <HorizonatalLine text="Drug Details" />
      </div>
      <Paper>
        <div className="row">
          {displayData && displayData.length > 0 ? (
            <>
              <TableComponent
                columns={columns}
                sortField={sortField}
                order={order}
                checkBoxRequired={true}
                handleSorting={handleSortingChange}
              >
                <TableBody>
                  {displayData &&
                    displayData?.length > 0 &&
                    displayData?.map((row, index) => {
                      const isItemSelected = isSelected(
                        row.id,
                        displaySelected
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <NormalTableRow
                          hover
                          role="checkbox"
                          aria-checked={displaySelected.includes(index)}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <StyledTableCell
                            padding="none"
                            style={{ textAlign: "center" }}
                          >
                            <Checkbox
                              onClick={(event) =>
                                handleClick(
                                  displaySelected,
                                  row.id,
                                  setDisplaySelected
                                )
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </StyledTableCell>
                          {columns.map((d, k) => {
                            if (d.id === "avlQty") {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  <BasicInput
                                    value={row[d.id]}
                                    type="text"
                                    onChange={(e) =>
                                      handleChange(
                                        index,
                                        d.id,
                                        e.target.value,
                                        displayData,
                                        setDisplayData
                                      )
                                    }
                                    placeholder="Enter the Quantity"
                                    disabled={!isItemSelected}
                                  />
                                </StyledTableCell>
                              );
                            } else if (
                              d.id === "mnfDate" ||
                              d.id === "expDate"
                            ) {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {moment(row[d.id]).format("DD/MM/YYYY")}
                                </StyledTableCell>
                              );
                            } else {
                              return (
                                <StyledTableCell key={k} padding="none">
                                  {row[d.id]}
                                </StyledTableCell>
                              );
                            }
                          })}
                        </NormalTableRow>
                      );
                    })}
                </TableBody>
              </TableComponent>
              <div className="d-flex justify-content-center mb-1">
                <div className="row">
                  <div className="col-auto">
                    <label>Reamrks</label>
                  </div>
                  <div className="col-auto">
                    <BasicInput
                      type="textarea"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />{" "}
                    <label></label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="me-1">
                  <Basicbutton
                    className="success rounded-0"
                    buttonText="Save"
                    icon={
                      <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                    }
                    onClick={handleSubmit}
                  />
                </div>
                <div>
                  <Basicbutton
                    className="warning rounded-0 me-1"
                    buttonText="Reset"
                    icon={<FontAwesomeIcon icon={faRefresh} className="me-1" />}
                    onClick={handleReset}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="row mb-1">
          <div className="d-flex justify-content-end">
            <SearchField
              className="me-1 mt-1"
              iconPosition="end"
              iconName={faSearch}
              onChange={(e) => {
                if (e.target?.value != "") {
                  console.log(e.target?.value);
                  setSearchValue(e?.target?.value);
                  console.log("filterData", filterData);
                  setTableData(searchFunc(filterData, e.target?.value));
                } else {
                  setTableData(filterData);
                  setSearchValue("");
                }
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
              checkBoxRequired={true}
              paginationRequired={true}
              handleSorting={handleSortingChange}
            >
              <TableBody>
                {loading ? (
                  <TableRowLaoder />
                ) : (
                  tableData &&
                  tableData?.map((row, index) => {
                    const isItemSelected = isSelected(row.id, selected);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <NormalTableRow
                        hover
                        role="checkbox"
                        aria-checked={selected.includes(index)}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <StyledTableCell padding="none">
                          <Checkbox
                            onClick={(event) =>
                              handleClick(selected, row.id, setSelected)
                            }
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>
                        {columns.map((d, k) => {
                          if (d.id === "condemnQty") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                <BasicInput
                                  onChange={(e) =>
                                    handleChange(
                                      index,
                                      d.id,
                                      e.target.value,
                                      tableData,
                                      setTableData
                                    )
                                  }
                                  type="text"
                                  placeholder="Enter the Quantity"
                                  disabled={!isItemSelected}
                                />
                              </StyledTableCell>
                            );
                          } else if (d.id === "mnfDate" || d.id === "expDate") {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {moment(row[d.id]).format("DD/MM/YYYY")}
                              </StyledTableCell>
                            );
                          } else {
                            return (
                              <StyledTableCell key={k} padding="none">
                                {row[d.id]}
                              </StyledTableCell>
                            );
                          }
                        })}
                      </NormalTableRow>
                    );
                  })
                )}
                <EmptyRow loading={loading} tableData={tableData} />
              </TableBody>
            </TableComponent>
          </div>
        </div>
        <TablePagination
          page={controller.page + 1}
          count={totalRows}
          rowsPerPage={controller?.rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="row">
          <div className="d-flex justify-content-center">
            <div>
              <Basicbutton
                buttonText="Add"
                className="primary mb-1 rounded-0"
                onClick={() => handleSelectedList()}
                icon={<FontAwesomeIcon icon={faPlus} className="me-1" />}
              />
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AddDrugCondemnation;
