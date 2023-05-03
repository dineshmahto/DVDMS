import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../../components/tables/datatable/tableComponent";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TableRow, TableCell, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BasicInput from "../../../components/inputbox/floatlabel/basicInput";
import moment from "moment";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import SwitchCheckBox from "../../../components/switch/switchcheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CustomSelect from "../../../components/select/customSelect";
import {
  faAdd,
  faCircleXmark,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addStockEntry,
  getStockEntryDesk,
  getStockEntryDeskResponse,
} from "../../../store/stock/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import { useNavigate } from "react-router-dom";
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
const Stock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stockEntryDeskResponse = useSelector(
    (state) => state?.stock?.stockEntryDeskResponse
  );
  const addStockEntryResponse = useSelector(
    (state) => state?.stock?.addStockEntryResponse
  );
  console.log("addStockEntryResponse", addStockEntryResponse);
  console.log("stockEntryDeskResponse", stockEntryDeskResponse);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [submitData, setSubmitData] = useState([]);
  const [rows, setRows] = useState([{}]);
  const [drugClassList, setDrugClassList] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [drugPkgList, setDrugPkgList] = useState([]);
  const [programeList, setProgrameList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const columns = useMemo(() => [
    {
      id: "action",
      name: "ACTION",
      sortable: false,
      type: "button",
    },
    {
      id: "receivedDate",
      name: "RECEIVED DATE",
      sortable: false,
      type: "YMDPicker",
    },

    {
      id: "drugClass",
      name: "CLASSIFICATION",
      sortable: false,
      type: "select",
    },
    {
      id: "programme",
      name: "PROG NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "drug",
      name: "DRUG NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "drugPkg",
      name: "PACKAGING",
      sortable: false,
      type: "select",
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      sortable: false,
      type: "input",
    },
    {
      id: "manufacturerDate",
      name: "MNF DATE",
      sortable: false,
      type: "YMPicker",
    },
    {
      id: "expiryDate",
      name: "EXP DATE",
      sortable: false,
      type: "YMPicker",
    },
    {
      id: "receivedQTy",
      name: "RECEIVED QTY",
      sortable: false,
      type: "input",
    },

    {
      id: "fundingSource",
      name: "SOURCE",
      sortable: false,
      type: "select",
    },
    {
      id: "challanNo",
      name: "CHALLAN NO",
      sortable: false,
      type: "input",
    },
  ]);
  const handleChange = (idx, id, e) => {
    console.log("Dinesh", idx);
    console.log("Dinesh", id);
    console.log("Dinesh", e);
    const clone = [...rows];
    console.log("Dinesh", clone[idx]);
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };
    console.log("Dinesh", clone);
    setRows(clone);
  };

  const handleAddRow = () => {
    console.log("row", rows);
    const item = {
      receivedDate: null,
      drugClass: drugClassList,
      drugClassId: "",
      programme: programeList,
      programmeId: "",
      drug: drugList,
      drugId: "",
      drugPkg: drugPkgList,
      drugPkgId: "",
      batchNo: "",

      manufacturerDate: null,

      expiryDate: null,
      receivedQTy: "",
      fundingSource: sourceList,
      fundingSourceId: "",
      challanNo: "",
    };
    setRows([...rows, item]);
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };
  const handleRemoveSpecificRow = (idx) => {
    const clone = [...rows];
    clone.splice(idx, 1);
    setRows(clone);
  };
  const handleSubmit = () => {
    console.log("rows", [...rows]);
    console.log("Data", data);

    const finalData = [...rows]?.map((ele) => {
      // ele?.receivedDate = moment(ele?.receivedDate).format("l");
      // ele?.manufacturerDate = moment(ele).format("l");
      // ele?.expiryDate = moment(ele).format("l");
      delete ele?.programme;
      delete ele?.drug;
      delete ele?.drugClass;
      delete ele?.drugPkg;
      delete ele?.fundingSource;

      return ele;
    });

    const isEmpty = finalData?.some(function (object) {
      return (
        object.receivedDate === "" ||
        object.drugClassId === "" ||
        object.programmeId === "" ||
        object.drugId === "" ||
        object.batchNo === "" ||
        object.drugPkgId === "" ||
        object.manufacturerDate === "" ||
        object.expiryDate === "" ||
        object.challanNo === "" ||
        object.receivedQTy === "" ||
        object.fundingSourceId === ""
      );
    });
    if (isEmpty) {
      toastMessage(
        "Stock Entry Desk",
        "Fill up the selected List to Transfer",
        "error"
      );
    }
    console.log("finalData", finalData);
    dispatch(addStockEntry(finalData));
  };

  const ToolBarElement = () => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Stock Entry
        </Typography>

        <>
          <Tooltip title="Add">
            <FontAwesomeIcon
              icon={faAdd}
              size="2x"
              onClick={handleAddRow}
              className="me-2"
            />
          </Tooltip>
          <Tooltip title="Delete Last Row">
            <FontAwesomeIcon
              icon={faTrash}
              size="2x"
              onClick={handleRemoveRow}
              className="me-2"
            />
          </Tooltip>
          <Tooltip title="Submit">
            <FontAwesomeIcon
              icon={faFloppyDisk}
              size="2x"
              onClick={handleSubmit}
            />
          </Tooltip>
        </>
      </Toolbar>
    );
  };
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      dispatch(getStockEntryDesk());
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getStockEntryDeskResponse(""));
    };
  }, []);

  useEffect(() => {
    if (stockEntryDeskResponse && stockEntryDeskResponse?.status === 200) {
      setDrugClassList(stockEntryDeskResponse?.data?.drugClassList);
      setDrugList(stockEntryDeskResponse?.data?.drugList);
      setDrugPkgList(stockEntryDeskResponse?.data?.drugPkgList);
      setProgrameList(stockEntryDeskResponse?.data?.programList);
      setSourceList(stockEntryDeskResponse?.data?.sourceList);
      setRows([
        {
          receivedDate: null,
          drugClass: stockEntryDeskResponse?.data?.drugClassList,
          drugClassId: "",
          programme: stockEntryDeskResponse?.data?.programList,
          programmeId: "",
          drug: stockEntryDeskResponse?.data?.drugList,
          drugId: "",
          drugPkg: stockEntryDeskResponse?.data?.drugPkgList,
          drugPkgId: "",
          batchNo: "",
          manufacturerDate: null,
          expiryDate: null,
          receivedQTy: "",
          fundingSource: stockEntryDeskResponse?.data?.sourceList,
          fundingSourceId: "",
          challanNo: "",
        },
      ]);
    } else if (
      stockEntryDeskResponse &&
      stockEntryDeskResponse?.status === 404
    ) {
      toastMessage("Stock Entry Desk", "Failed to load the Data", "error");
    }
  }, [stockEntryDeskResponse]);

  useEffect(() => {
    if (addStockEntryResponse && addStockEntryResponse?.status === 201) {
      toastMessage("Stock Entry", "successfully created");
      navigate("/stocklisting");
    } else if (
      addStockEntryResponse &&
      addStockEntryResponse?.status === 5000
    ) {
      toastMessage("Stock Entry", "Something went wrong", "error");
    }
  }, [addStockEntryResponse]);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-4">
            <p className="fs-6">STOCK ENTRY DESK</p>
          </div>
          <div className="col-8">
            <div className="d-flex justify-content-around">
              <div>
                <SwitchCheckBox
                  type="checkbox"
                  labelText="FOR COVID 19"
                  id="forCovid19"
                />
              </div>
              <div>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <label>Institute Type</label>
                  </div>
                  <div className="col-auto">
                    <CustomSelect data={[]} />
                  </div>
                </div>
              </div>
              <div>
                <SwitchCheckBox
                  type="checkbox"
                  labelText="Received from Ministry"
                  id="receivedForMinistry"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <HorizonatalLine text="Enter Drug Details" />
        </div>
        <Paper>
          <div className="row mt-2">
            <div className="col-12">
              <TableComponent
                columns={columns}
                overFlow={true}
                stickyHeader={true}
                customWidth="max-content"
                tableTitle="Stock Entry Desk"
                toolbarRequired={true}
                toolbar={<ToolBarElement />}
              >
                {rows &&
                  rows.length > 0 &&
                  rows.map((row, idx) => {
                    return (
                      <TableRow key={row.name}>
                        {columns.map((d, k) => {
                          console.log("K", k);
                          if (d.type == "input") {
                            console.log("Id", d.id);
                            return (
                              <TableCell key={k} align="right">
                                <BasicInput
                                  id={row.id + d.id}
                                  type="text"
                                  className="form-control shadow-none"
                                  placeholder="Amount"
                                  onChange={(e) => {
                                    handleChange(idx, d.id, e.target.value);
                                    // commonFunctionToUpdateValue(
                                    //   row.id,
                                    //   e.target.value,
                                    //   d.id
                                    // );
                                  }}
                                />
                              </TableCell>
                            );
                          } else if (d.type == "select") {
                            console.log("Key", d.id);
                            console.log("Data", rows[idx][d.id]);
                            return (
                              <TableCell>
                                <CustomSelect
                                  options={rows[idx][d.id]}
                                  onChange={(selectedOption) => {
                                    console.log(
                                      "change",
                                      selectedOption?.value
                                    );
                                    handleChange(
                                      idx,
                                      `${d.id}Id`,
                                      selectedOption?.value
                                    );
                                    // commonFunctionToUpdateValue(
                                    //   row.id,
                                    //   selectedOption?.value,
                                    //   `${d.id}Id`
                                    // );
                                  }}
                                  id={row.id + row[d.id]}
                                />
                              </TableCell>
                            );
                          } else if (d.type == "YMDPicker") {
                            return (
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    className={classes.root}
                                    value={rows[idx][d.id]}
                                    onChange={(newValue) => {
                                      handleChange(idx, d.id, newValue);
                                      // handleChange(
                                      //   idx,
                                      //   `${d.id}Date`,
                                      //   moment(newValue).format("l")
                                      // );
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                            );
                          } else if (d.type == "YMPicker") {
                            console.log("DateValue", rows[idx][d.id], d.id);
                            return (
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    id={row.id + d.id}
                                    className={classes.root}
                                    views={["year", "month"]}
                                    openTo="month"
                                    value={rows[idx][d.id]}
                                    disablePast
                                    onChange={(newValue) => {
                                      handleChange(idx, d.id, newValue);
                                      // handleChange(
                                      //   idx,
                                      //   `${d.id}Date`,
                                      //   moment(newValue).format("l")
                                      // );
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                            );
                          } else if (d.type == "button") {
                            return (
                              <TableCell>
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  onClick={() => handleRemoveSpecificRow(idx)}
                                  size="2x"
                                />
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableComponent>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Stock;
