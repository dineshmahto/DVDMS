import { React, useState, useMemo } from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
import TableComponent from "../../components/tables/datatable/tableComponent";
import BasicInput from "../../components/inputbox/floatlabel/basicInput";
import BasicButton from "../../components/button/basicbutton";
import SelectOption from "../../components/option/option";
import toastMessage from "../../common/toastmessage/toastmessage";
import moment from "moment";

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
    receivedDate: null,
    receivedDateValue: "",
    classification: [
      {
        id: 1,
        value: "January",
      },
      {
        id: 2,
        value: "February",
      },
      {
        id: 3,
        value: "March",
      },
      {
        id: 4,
        value: "April",
      },
      {
        id: 5,
        value: "May",
      },
    ],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 2,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",

    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 3,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 4,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 5,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 6,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 7,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 8,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 9,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
  {
    id: 10,
    receivedDate: null,
    classification: [],
    classificationValue: "",
    progName: [],
    progNameValue: "",
    drugName: [],
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnfDate: null,
    mnfDateValue: "",
    expDate: null,
    expDateValue: "",
    source: [],
    sourceValue: "",
    challanNo: "",
    barcodeNo: "",
  },
];
const dummySelectData = [
  {
    id: 1,
    value: "January",
  },
  {
    id: 2,
    value: "February",
  },
  {
    id: 3,
    value: "March",
  },
  {
    id: 4,
    value: "April",
  },
  {
    id: 5,
    value: "May",
  },
];
const keyCase = {
  RECEIVEDDATE: "receivedDate",
  RECEIVEDDATEVALUE: "receivedDateValue",
  CLASSIFICATION: "classification",
  CLASSIFICATIONVALUE: "classificationValue",
  PROGRAMMENAME: "progName",
  PROGRAMMENAMEVALUE: "progNameValue",
  DRUGNAME: "drugName",
  DRUGNAMEVALUE: "drugNameValue",
  PACKAGING: "packaging",
  PACKAGINGVALUE: "packagingValue",
  BATCHNO: "batchNo",
  MNFDATE: "mnfDate",
  MNFDATEVALUE: "mnfDateValue",
  EXPDATE: "expDate",
  EXPDATEVALUE: "expDateValue",
  SOURCE: "source",
  SOURCEVALUE: "sourceValue",
  CHALLONNO: "challanNo",
  BARCODENO: "barcodeNo",
};
const StockEntry = () => {
  const classes = useStyles();
  const [data, setData] = useState(tempData);
  const [submitData, setSubmitData] = useState(tempData);
  const [errorRowId, setErrorRowId] = useState("");
  const [trackClassificationList, setTrackClassificationList] = useState([]);
  const [updatedClassificationDropDownLsit, setNewClassificationDropDownList] =
    useState([]);

  const programmeList = [
    {
      id: 1,
      value: "Programme 1",
    },
    {
      id: 2,
      value: "Programme 2",
    },
    {
      id: 3,
      value: "Programme 3",
    },
    {
      id: 4,
      value: "Programme 4",
    },
    {
      id: 5,
      value: "Programme 5",
    },
  ];
  const dummyDrugName = [
    {
      id: 1,
      value: "Drug 1",
    },
    {
      id: 2,
      value: "Drug 2",
    },
    {
      id: 3,
      value: "Drug 3",
    },
    {
      id: 4,
      value: "Drug 4",
    },
    {
      id: 5,
      value: "Drug 5",
    },
    {
      id: 6,
      value: "Drug 6",
    },
  ];

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalRows, setTotalRows] = useState(0);
  const fetchProgrammeList = () => {
    const cloneData = [...data];
    const updatedData = cloneData?.filter((item) => {
      if (item.id === 1) return (item.progName = programmeList);
      else return item;
    });
    console.log("CehckData", updatedData);
    setData(updatedData);
    // setData([...data, (data[0].progName = programmeList)]);
  };

  const updateDropDownValue = (
    e,
    row,
    dropDownSelectedList,
    dropDownInitialData,
    updatedDropDownLists,
    setNewDropDownList,
    setNewDropDownSelectedList,
    key,
    valueKey
  ) => {
    const value = e.target.value;
    if (dropDownSelectedList.length === 0) {
      const updatedDropDownList = dropDownInitialData.filter((item) => {
        return item.value !== value;
      });
      setNewDropDownSelectedList([row?.id]);
      setNewDropDownList(updatedDropDownList);
      const cloneData = [...data];
      const updatedData = cloneData?.filter((item) => {
        if (item.id === row.id)
          return (
            (item[`${key}`] = dropDownInitialData),
            (item[`${valueKey}`] = value)
          );
        else return (item[`${key}`] = updatedDropDownList);
      });
      setData(updatedData);
    } else {
      if (dropDownSelectedList.length !== 0) {
        const cloneData = [...data];
        const elementExist = dropDownSelectedList?.find((element) => {
          return element === row.id;
        });
        if (elementExist === 1) {
          console.log("key", key);
          if (key === keyCase.CLASSIFICATION) {
          }
          const updatedDropDownList = dropDownInitialData.filter((item) => {
            return item.value !== value;
          });
          setNewDropDownSelectedList([row?.id]);
          setNewDropDownList(updatedDropDownList);
          const updatedData = cloneData?.filter((item) => {
            if (item.id === row.id)
              return (
                (item[`${key}`] = dropDownInitialData),
                (item[`${valueKey}`] = value)
              );
            else return (item[`${key}`] = updatedDropDownList);
          });
          setData(updatedData);
        }

        if (typeof elementExist == "undefined") {
          console.log("Entered here");
          setNewDropDownSelectedList([...dropDownSelectedList, row.id]);
          const updatedDropDownList = updatedDropDownLists.filter((item) => {
            return item.value !== value;
          });
          console.log("updatedDrodownList", updatedDropDownList);
          setNewDropDownList(updatedDropDownList);
          const cloneData = [...data];
          const updateData = cloneData?.filter((item) => {
            if (dropDownSelectedList.includes(item.id)) return item;
            else if (item.id === row.id) {
              return (item[`${valueKey}`] = value);
            } else {
              return (item[`${key}`] = updatedDropDownList);
            }
          });
          console.log("updatedData", updateData);
          setData(updateData);
        }
      }
    }
  };

  const handleSubmitData = () => {
    let rowId;
    const isEmpty = data?.some(function (object) {
      rowId = object.id;
      return (
        object.classificationValue === "" ||
        object.progNameValue === "" ||
        object.drugNameValue === "" ||
        object.packagingValue === "" ||
        object.batchNo === "" ||
        object.mnrDate === "" ||
        object.expDate === "" ||
        object.sourceValue === "" ||
        object.challanNo === "" ||
        object.barcodeNo === "" ||
        object.receivedDate === "" ||
        object.mnrDate === ""
      );
    });
    if (isEmpty) {
      setErrorRowId(rowId);
      toastMessage(
        "Stock Entry Desk",
        "Fill up the selected List to Transfer",
        "error"
      );
    }
  };

  const commonFunctionToUpdateValue = (rowId, value, key) => {
    console.log("key", key);
    console.log("value", value);
    const cloneData = [...data];
    console.log("CommonData", cloneData);
    const filtered = cloneData?.filter((item) => {
      return item.id === rowId;
    });
    filtered[0][`${key}`] = value;
    console.log(filtered);
    const tempData = [...submitData];
    tempData.slice(rowId - 1, 1, filtered);
    console.log("submitData", submitData);
    console.log(tempData);

    setData(tempData);
  };

  const columns = useMemo(() => [
    {
      id: "receivedDate",
      name: "RECEIVED DATE",
      sortable: false,
      type: "YMDPicker",
    },

    {
      id: "classification",
      name: "CLASSIFICATION",
      sortable: false,
      type: "select",
    },
    {
      id: "progName",
      name: "PROG NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      sortable: false,
      type: "select",
    },
    {
      id: "packaging",
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
      id: "mnfDate",
      name: "MNF DATE",
      sortable: false,
      type: "YMPicker",
    },
    {
      id: "expDate",
      name: "EXP DATE",
      sortable: false,
      type: "YMPicker",
    },

    {
      id: "source",
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
    {
      id: "barcodeNo",
      name: "BARCODE NO",
      sortable: false,
      type: "input",
    },
  ]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <TableComponent
              columns={columns}
              sortField={sortField}
              page={controller.page}
              count={totalRows}
              order={order}
              paginationRequired={false}
              overFlow={true}
              customWidth="max-content"
              tableTitle="Stock Entry Desk"
            >
              <TableBody>
                {data &&
                  data?.map((row, index) => {
                    console.log("Row Number", index + 1);
                    console.log("Row", row);
                    return (
                      <TableRow key={row.name}>
                        {columns.map((d, k) => {
                          console.log("K", k);
                          if (d.type == "input") {
                            return (
                              <TableCell key={k} align="right">
                                <BasicInput
                                  id={row.id + d.id}
                                  type="text"
                                  className="shadow-none"
                                  placeholder="Amount"
                                  onChange={(e) =>
                                    commonFunctionToUpdateValue(
                                      row.id,
                                      e.target.value,
                                      d.id
                                    )
                                  }
                                />
                              </TableCell>
                            );
                          } else if (d.type == "select") {
                            console.log("Key", d.id);
                            console.log("Data", row[d.id]);
                            return (
                              <TableCell>
                                <SelectOption
                                  data={row[d.id]}
                                  onChange={(e) => {
                                    if (e.target.value != "None") {
                                      updateDropDownValue(
                                        e,
                                        row,
                                        trackClassificationList,
                                        dummySelectData,
                                        updatedClassificationDropDownLsit,
                                        setNewClassificationDropDownList,
                                        setTrackClassificationList,
                                        d.id,
                                        `${d.id}Value`
                                      );
                                      if (
                                        d.id == "classification" &&
                                        index == 0
                                      ) {
                                        fetchProgrammeList();
                                      }
                                    }
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
                                    value={row[d.id]}
                                    onChange={(newValue) => {
                                      commonFunctionToUpdateValue(
                                        row.id,
                                        newValue,
                                        d.id
                                      );
                                      commonFunctionToUpdateValue(
                                        row.id,
                                        moment(newValue).format("l"),
                                        `${d.id}Value`
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                            );
                          } else if (d.type == "YMPicker") {
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
                                    value={row.mnfDate}
                                    disablePast
                                    onChange={(newValue) => {
                                      commonFunctionToUpdateValue(
                                        row.id,
                                        newValue,
                                        d.id
                                      );
                                      commonFunctionToUpdateValue(
                                        row.id,
                                        moment(newValue).format("l"),
                                        `${d.id}Value`
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
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
        <div className="row">
          <div className="d-flex justify-content-center">
            <BasicButton
              buttonText="ADD"
              outlineType={true}
              className="success"
              onClick={(e) => handleSubmitData()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockEntry;
