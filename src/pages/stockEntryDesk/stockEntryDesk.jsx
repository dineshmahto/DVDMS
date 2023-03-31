import { React, useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BasicButton from "../../components/button/basicbutton";
import SelectOption from "../../components/option/option";
import toastMessage from "../../common/toastmessage/toastmessage";
import DatePickers from "react-datepicker";
import Paper from "@mui/material/Paper";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
import moment from "moment";

// styling the material ui Date Picker
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

// Intial Data structure to show in the table
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
    drugName: "",
    drugNameValue: "",
    packaging: [],
    packagingValue: "",
    batchNo: "",
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",

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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
    mnrDate: "",
    expDate: "",
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
  MNRDATE: "mnrDate",
  EXPDATE: "expDate",
  SOURCE: "source",
  SOURCEVALUE: "sourceValue",
  CHALLONNO: "challanNo",
  BARCODENO: "barcodeNo",
};
const StockEntryDesk = () => {
  const classes = useStyles();
  const [data, setData] = useState(tempData);
  const [submitData, setSubmitData] = useState(tempData);
  const [errorRowId, setErrorRowId] = useState("");
  const [selectedClassification, setSelectedClassification] = useState([]);
  const [classification, setClassification] = useState(dummySelectData);

  const [updatedClassification, setUpdatedClassification] = useState();
  const [trackClassificationList, setTrackClassificationList] = useState([]);
  const [updatedClassificationDropDownLsit, setNewClassificationDropDownList] =
    useState([]);

  const [updatedProgramme, setUpdatedProgramme] = useState([]);
  const [trackProgrammeSelectedList, setTrackProgrammeSelectedList] = useState(
    []
  );
  const [updatedProgrammeDropDownList, setNewProgrammeDropDownList] = useState(
    []
  );
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
  const [programme, setprogramme] = useState([]);
  const [drugName, setDrugName] = useState([]);
  const [source, setSource] = useState([]);

  const [receivedDate, setReceivedDate] = useState(() => data.map(() => null));
  console.log("Received Date", receivedDate);
  const [openDatePicker, setOpenDatePicker] = useState(() =>
    data.map(() => false)
  );
  const [mnrDate, setMNRDate] = useState(() => data.map(() => ""));
  const [expDate, setExpDate] = useState(() => data.map(() => ""));

  const fetchProgrammeList = () => {
    const cloneData = [...data];
    const updatedData = cloneData?.filter((item) => {
      if (item.id === 1) return (item.progName = programmeList);
      else return item;
    });
    setData(updatedData);
  };

  //   function to update the drop down State value in UI
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
        console.log("entered in not empty");
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

  // function to check the data on click of ADD Action Button
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

  //   common Funtion to update the value of the initial Data state except the drop Down value
  const commonFunctionToUpdateValue = (rowId, value, key) => {
    const cloneData = [...data];
    const filtered = cloneData?.filter((item) => {
      return item.id === rowId;
    });
    filtered[0][`${key}`] = value;
    const tempData = [...submitData];
    tempData.slice(rowId - 1, 1, filtered);
    setData(tempData);
  };

  const columns = useMemo(() => [
    {
      id: "id",
      name: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "receivedDate",
      name: "RECEIVED DATE",
      selector: (row) => row.receivedDate,
      width: "200px",
      cell: (row) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={classes.root}
              value={row.receivedDate}
              onChange={(newValue) => {
                commonFunctionToUpdateValue(
                  row.id,
                  newValue,
                  keyCase.RECEIVEDDATE
                );
                commonFunctionToUpdateValue(
                  row.id,
                  moment(newValue).format("l"),
                  keyCase.RECEIVEDDATEVALUE
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </>
      ),
    },

    {
      id: "classification",
      name: "CLASSIFICATION",
      selector: (row) => row.classification,
      width: "200px",
      cell: (row) => (
        <SelectOption
          data={row.classification}
          id={row.id + `classification`}
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
                keyCase.CLASSIFICATION,
                keyCase.CLASSIFICATIONVALUE
              );
              fetchProgrammeList();
            } else {
              toastMessage(
                "Stock Entry Desk",
                "Select a valid drop down value from Classification",
                "error"
              );
            }
          }}
        />
      ),
    },
    {
      id: "progName",
      name: "PROG NAME",
      selector: (row) => row.progName,
      width: "200px",
      cell: (row) => (
        <SelectOption
          data={row.progName}
          id={row.id + `progName`}
          onChange={(e) => {
            updateDropDownValue(
              e,
              row,
              trackProgrammeSelectedList,
              programmeList,
              updatedProgrammeDropDownList,
              setNewProgrammeDropDownList,
              setTrackProgrammeSelectedList,
              keyCase.PROGRAMMENAME,
              keyCase.PROGRAMMENAMEVALUE
            );
          }}
        />
      ),
    },
    {
      id: "drugName",
      name: "DRUG NAME",
      selector: (row) => row.drugName,
      width: "200px",
      cell: (row) => (
        <SelectOption
          data={[]}
          id={row.id + `drugName`}
          onChange={(e) =>
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.DRUGNAME
            )
          }
        />
      ),
    },
    {
      id: "packaging",
      name: "PACKAGING",
      width: "200px",
      selector: (row) => row.packaging,
      cell: (row) => (
        <SelectOption
          data={[]}
          id={row.id + `packaging`}
          onChange={(e) =>
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.PACKAGING
            )
          }
        />
      ),
    },
    {
      id: "batchNo",
      name: "BATCH NO",
      width: "150px",
      selector: (row) => row.batchNo,
      cell: (row) => (
        <input
          id={row.id + `rqAmnt`}
          type="text"
          className="form-control"
          onChange={(e) => {
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.BATCHNO
            );
          }}
        />
      ),
    },
    {
      id: "mnrDate",
      name: "MNR DATE",
      width: "150px",
      selector: (row) => row.mnrDate,
      cell: (row) => (
        <input
          id={row.id + `rqAmnt`}
          type="text"
          className="form-control"
          onChange={(e) => {
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.MNRDATE
            );
          }}
        />
      ),
    },
    {
      id: "expDate",
      name: "EXP DATE",
      width: "200px",
      selector: (row) => row.expDate,
      cell: (row) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={classes.root}
              views={["year", "month"]}
              openTo="month"
              value={null}
              disablePast
              onChange={(newValue) => {
                console.log("value", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </>
      ),
    },

    {
      id: "source",
      name: "SOURCE",
      selector: (row) => row.source,
      width: "200px",
      cell: (row) => (
        <SelectOption
          data={[]}
          onChange={(e) =>
            commonFunctionToUpdateValue(row.id, e.target.value, keyCase.SOURCE)
          }
        />
      ),
    },
    {
      id: "challanNo",
      name: "CHALLAN NO",
      selector: (row) => row.challanNo,
      width: "150px",
      cell: (row) => (
        <input
          id={row.id + `rqAmnt`}
          type="text"
          className="form-control"
          onChange={(e) => {
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.CHALLONNO
            );
          }}
        />
      ),
    },
    {
      id: "barcodeNo",
      name: "BARCODE NO",
      selector: (row) => row.barcodeNo,
      width: "150px",
      cell: (row) => (
        <input
          id={row.id + `rqAmnt`}
          type="text"
          className="form-control"
          onChange={(e) => {
            commonFunctionToUpdateValue(
              row.id,
              e.target.value,
              keyCase.BARCODENO
            );
          }}
        />
      ),
    },
  ]);

  //   styling the table row to highlight the error row in the table
  const conditionalRowStyles = [
    {
      when: (row) => row.id === errorRowId,
      style: {
        backgroundColor: "red",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  return (
    <div className=" " id="stockEntry">
      <Paper elevation={2}>
        <div className="row">
          <DataTable
            title="Stock Entry Desk"
            columns={columns}
            data={data}
            responsive={true}
            onSelectedRowsChange={(rows) => {
              console.log("Onselect", rows);
            }}
            conditionalRowStyles={conditionalRowStyles}
            className="mb-2"
          />
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
      </Paper>
    </div>
  );
};

export default StockEntryDesk;
