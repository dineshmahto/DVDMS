import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Paper } from "@mui/material";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faXmark,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

import "./StockRep.css";

/* Import for Document reports */
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PdfTable from "../../../components/pdf/PdfTable";
import PdfHeader from "../../../components/pdf/PdfHeader";
import PdfFooter from "../../../components/pdf/PdfFooter";

import Pdf from "../Pdf";
import { useNavigate } from "react-router-dom";
import CSV from "../Csv";
import { useDispatch, useSelector } from "react-redux";
import {
  getClasswiseDrug,
  getClasswiseDrugResponse,
  getStockLedger,
  getStockLedgerResponse,
  getStockStatus,
  postStockReport,
  postStockReportResponse,
} from "../../../store/report/action";
import toastMessage from "../../../common/toastmessage/toastmessage";

const StockLadger = () => {
  /*  Document For Reports */

  const styles = StyleSheet.create({
    fontSize: {
      fontSize: "10px",
    },
    challanNo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 8,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 150,
      paddingHorizontal: 35,
    },

    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
  });

  const DocumentRep = () => {
    const [rows, setRows] = useState(repData.drugList);

    const keys = Object.keys(rows[0]); //dynamic column creation based on the table data

    const column = [
      {
        id: "slNo",
        value: "Sl.No",
        // width: "17%",
      },
    ];

    keys.forEach((item) => {
      column.push({
        id: item,
        value: item,
        width: `${100 / (keys.length + 1)}%`,
      });
    });

    return (
      <Document title="Stock ledger Reports">
        <Page wrap style={styles.body} size={column.length > 6 ? "A2" : "A4"}>
          <PdfHeader
            imageName="download"
            government="GOVERNMENT OF NAGALAND"
            department=" DIRECTORATE OF HEALTH AND FAMILY WELFARE"
            state="NAGALAND"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "10px",
              }}
            >
              <Text style={{ marginBottom: "5px" }}>Ref Issue No: 54962</Text>
              <Text style={{ marginBottom: "5px" }}>
                Issue Date: 2023-03-21
              </Text>
            </View>
            <View>
              <Text style={styles.displayBolck}>
                Issued by: State Warehouse
              </Text>
            </View>
          </View>
          {/* To Section */}
          <View>
            <Text style={{ fontSize: "10px" }}>To,</Text>
          </View>
          <View style={{ display: "flex", fontSize: "10px" }}>
            <View>
              <Text
                style={{
                  marginLeft: "25px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              >
                The Medical Officer
              </Text>
            </View>
            <View>
              <Text style={{ marginLeft: "25px", marginBottom: "5px" }}>
                Noklak CHCCH Tuensang
              </Text>
            </View>
          </View>
          {/* End of To section */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              fontSize: "10px",
              textDecoration: "underline",
              marginTop: "10px",
            }}
          >
            <Text style={{ fontWeight: 700, color: "black" }}>Sub :</Text>
            <Text style={{ fontWeight: 700, color: "black" }}>
              Issue / Receipt Voucher
            </Text>
          </View>

          <View
            style={{ fontSize: "10px", marginTop: "8px", marginBottom: "8px" }}
          >
            <Text>
              The following items are issued to you for
              Hospitals/CHC/PHC/Sub-Centre uses etc.
            </Text>
          </View>

          <PdfTable column={column} tableData={rows} />
          <PdfFooter />
        </Page>
      </Document>
    );
  };
  //end of documents

  const [genReport, setGenReports] = useState(true);

  const [storeList, setStoreList] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [drugClassList, setDrugClassList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [storeId, setStoreId] = useState(0);

  const [csvReady, setCsvReady] = useState(false);

  const [repData, setRepData] = useState({
    storeID: "",
    // drugList : [{ "id" : "" ,"name":""}]
    drugList: [],
  });

  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);

  const dispatch = useDispatch();
  const stockLedgerResp = useSelector(
    (state) => state?.report?.stockLedgerResp
  );

  const classwiseDrugResp = useSelector(
    (state) => state?.report?.classwiswDrugResp
  );
  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      dispatch(getStockStatus());
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getStockLedgerResponse(""));
    };
  }, []);

  useEffect(() => {
    if (stockLedgerResp && stockLedgerResp?.status === 200) {
      setStoreList(stockLedgerResp.data.storeList);
      setDrugClassList(stockLedgerResp.data.drugClassList);
      setDrugList(stockLedgerResp.data.drugList);
    } else if (stockLedgerResp && stockLedgerResp?.status === 400) {
      dispatch(getStockLedgerResponse(""));
      toastMessage(" Error", "Please enter valid ID", "error");
    } else if (stockLedgerResp && stockLedgerResp?.status === 500) {
      dispatch(getStockLedgerResponse(""));
      toastMessage(" Error", "some error in loading data", "error");
    }
  }, [stockLedgerResp]);

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    console.log("selecteed value", selectedValue);
    setSelectedOption(selectedValue);
  };

  const clearButtonHandle = (event) => {
    event.preventDefault();
    setTempArray([]);
    setSelectedItem([]);
    setTransferableRoleList(drugList);
    //setRightTempArray([])
    //setSelectedItemActiveIndices([])
  };

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption == 0) {
      setTransferableRoleList(drugList);
    } else {
      dispatch(getClasswiseDrug({ drugClassId: selectedOption }));
    }
  }, [selectedOption]);
  useEffect(() => {
    if (classwiseDrugResp && classwiseDrugResp?.status === 200) {
      setTransferableRoleList(classwiseDrugResp.data.drugList);
    } else if (classwiseDrugResp && classwiseDrugResp?.status === 400) {
      dispatch(getClasswiseDrugResponse(""));
      toastMessage(" Error", "select source", "error");
    } else if (classwiseDrugResp && classwiseDrugResp?.status === 500) {
      dispatch(getClasswiseDrugResponse(""));
      toastMessage(" Error", "some error in loading data", "error");
    }
  }, [classwiseDrugResp]);

  const handleGenerate = (event) => {
    event.preventDefault();

    if (selectedItem.length === 0) {
      alert("select atleast one drug");
      return;
    }
    setRepData({
      // storeID:storeId , drugList:selectedItem.map(item => ({ id: item.id }))
      storeID: storeId,
      drugList: selectedItem,
    });
    setGenReports(false);
    setCsvReady(true);
  };

  //postStockReportRes
  const postStockReportResp = useSelector(
    (state) => state?.report?.postStockReportRes
  );

  useEffect(() => {
    console.log(repData);
    dispatch(postStockReport(repData));
  }, [repData]);
  useEffect(() => {
    if (postStockReportResp && postStockReportResp?.status === 200) {
    } else if (postStockReportResp && postStockReportResp?.status === 400) {
      dispatch(postStockReportResponse(""));
      toastMessage(" Error", "", "error");
    } else if (postStockReportResp && postStockReportResp?.status === 500) {
      dispatch(postStockReportResponse(""));
      toastMessage(" Error", "some error in reporting data", "error");
    }
  }, [postStockReportResp]);

  useEffect(() => {
    setSelectedItem([]);
    setRightTempArray([]);
    setFirstClick(false);
    setSelectedItemActiveIndices([]);
    setTempArray([]);
    setActiveIndicies(drugList?.map(() => false));
    setTransferableRoleList(drugList);
    setCopyData(drugList);
  }, [drugList]);

  // useEffect( ()=>{
  //  console.log("temparray ==", tempArray)
  //  console.log("righttemparray ==", rightTempArray)
  //  console.log("selectedItem ==", selectedItem)
  //  console.log("activeIndicies ==", activeIndicies)
  //  console.log("firstClick ==", firstClick)
  //  console.log("selectItemActiveIndices ==", selectItemActiveIndices)
  //  console.log("copyData ==", copyData)
  //  console.log("transferableRoleList ==", transferableRoleList)

  // } ,[tempArray ,rightTempArray , selectedItem , activeIndicies , firstClick , selectItemActiveIndices  , copyData ,transferableRoleList ])

  const handleRightListItemClick = (e, id, element, index) => {
    const elementExist = rightTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setRightTempArray([...rightTempArray, element]);
    } else {
      for (let [i, item] of rightTempArray.entries()) {
        if (item.id === id) {
          rightTempArray.splice(i, 1);
        }
      }
    }

    if (firstClick) {
      setSelectedItemActiveIndices(
        selectItemActiveIndices.map((bool, j) => (j === index ? true : false))
      );
      setFirstClick(false);
    } else {
      const t = [...selectItemActiveIndices];
      const ut = t.map((elem, i) => {
        if (i === index) {
          if (elem) {
            return (t[index] = false);
          } else if (!elem) {
            return (t[index] = true);
          }
        } else {
          return elem;
        }
      });
      setSelectedItemActiveIndices(ut);
    }
  };

  const handleLeftListItemClick = (e, id, element, index) => {
    const elementExist = tempArray?.filter((item) => {
      return item.id === id;
    });

    if (elementExist.length === 0) {
      setTempArray([...tempArray, element]);
    } else {
      for (let [i, item] of tempArray?.entries()) {
        if (item.id === id) {
          tempArray.splice(i, 1);
        }
      }
    }
    if (!activeIndicies.at(index)) {
      setActiveIndicies(
        activeIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setActiveIndicies(
        activeIndicies.map((bool, j) => (j === index ? false : bool))
      );
    }
  };

  const handleMoveSelectedItemToRight = (
    tempArray,
    setFirstClick,
    copyiedData,
    setSelectedItemActiveIndices,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies,
    setSelectedItem,
    setData
  ) => {
    if (tempArray?.length > 0) {
      setFirstClick(true);
      const cloneData = [...copyiedData];

      setSelectedItemActiveIndices(tempArray?.map(() => true));
      setRightTempArray([]);
      setActiveIndicies(activeIndicies.map((bool, j) => false));
      const rightDispalyList = cloneData.filter((elem) => {
        return tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItem(rightDispalyList);
      const leftRearrangedList = transferableRoleList.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setTransferableRoleList(leftRearrangedList);
    }
  };

  const handleMoveSelectedItemToLeft = (
    selectItemActiveIndices,
    rightTempArray,
    setFirstClick,
    selectedItem,
    setSelectedItemActiveIndices,
    tempArray,
    setTempArray,
    data,
    setData,
    setSelectedItem,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies,
    copyiedData
  ) => {
    const allACtiveClasses = selectItemActiveIndices.every((e) => e === true);
    if (rightTempArray.length > 0) {
      setFirstClick(true);
      console.log("selectedItem", selectedItem);
      const cloneData = [...selectedItem];
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("Right Display List", rightDispalyList);
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("ReverseBackElements", reverseBackElements);
      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("TempArray", updateTempArray);
      setTempArray(updateTempArray);
      console.log("copiedData", data);
      const storeIntoOne = [...data];
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
      console.log("storeIntoOne", storeIntoOne);
      setData(storeIntoOne);
      setSelectedItem(rightDispalyList);
      setRightTempArray([]);
      // update the selected List
    } else if (allACtiveClasses) {
      handleShiftAllElementToLeft(
        copyiedData,
        setSelectedItemActiveIndices,
        setData,
        setRightTempArray,
        setTempArray,
        setSelectedItem,
        setActiveIndicies,
        activeIndicies
      );
    }
  };

  const handleShiftAllElementToRight = (
    copyiedData,
    setFirstClick,
    setSelectedItemActiveIndices,
    setSelectedItem,
    setRightTempArray,
    setTempArray,
    setData
  ) => {
    const cloneData = [...copyiedData];
    setFirstClick(true);
    setSelectedItemActiveIndices(cloneData?.map(() => true));
    setSelectedItem(cloneData);
    setRightTempArray([]);
    setTempArray(cloneData);
    setData([]);
  };

  const handleShiftAllElementToLeft = (
    copyiedData,
    setSelectedItemActiveIndices,
    setData,
    setRightTempArray,
    setTempArray,
    setSelectedItem,
    setActiveIndicies,
    activeIndicies
  ) => {
    const cloneData = [...copyiedData];
    console.log("cloneData", cloneData);

    setSelectedItemActiveIndices([]);
    setData(cloneData);
    setRightTempArray([]);
    setTempArray([]);
    setSelectedItem([]);
    setActiveIndicies(activeIndicies.map((bool) => false));
  };

  //function to handle reports and csv

  const navigate = useNavigate();

  const handleCreateNew = () => {
    setGenReports(true);
    setSelectedItem([]);
    setRightTempArray([]);
    setFirstClick(false);
    setSelectedItemActiveIndices([]);
    setTempArray([]);
    setActiveIndicies(drugList?.map(() => false));
    setTransferableRoleList(drugList);
    setCopyData(drugList);
    //document.getElementById("store").value=0;
  };

  return (
    <>
      {genReport ? (
        <Paper className="mt-2">
          <div className="container-fluid  border rounded">
            <div className=" mb-3  heading">
              <h4 className="text-center ">STOCK LEDGER REPORT</h4>
            </div>
            <div className="row">
              <div className="col-12 ">
                <div className="row mb-2">
                  <div className="col-10 offset-2">
                    <div className="row">
                      <div className="col-4">
                        Store Name:<span style={{ color: "red" }}>*</span>
                      </div>
                      <div className="col-8">
                        {/* <CustomSelect options={storeList} /> */}
                        <select
                          id="store"
                          className="customSelectinput"
                          onChange={(e) => setStoreId(e.target.value)}
                        >
                          <option value={0}>Select Store:</option>
                          {storeList.map((store) => (
                            <option key={store.value} value={store.value}>
                              {store.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mb-1 ">
                  <HorizonatalLine text="Drug Details" />
                </div>
                <div className="row mb-3">
                  <div className="col-10 offset-2">
                    <div className="row">
                      <div className="col-4">Select Drug Class:</div>
                      <div className="col-8">
                        {/* <CustomSelect options={drugList}  /> */}

                        <select
                          id="store"
                          className="customSelectinput"
                          onChange={handleOptionSelect}
                        >
                          <option value="0">Select Drug Class</option>
                          {drugClassList.map((drug) => (
                            <option key={drug.value} value={drug.value}>
                              {drug.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-10 offset-1">
                    <div className="row text-center">
                      <p>Select Drug(Move the Drug From Left to Right) *</p>
                    </div>
                    <div className="row">
                      <TransferComponent
                        apiData={transferableRoleList}
                        activeIndicies={activeIndicies}
                        handleMoveSelectedItemToLeft={() => {
                          handleMoveSelectedItemToLeft(
                            selectItemActiveIndices,
                            rightTempArray,
                            setFirstClick,
                            selectedItem,
                            setSelectedItemActiveIndices,
                            tempArray,
                            setTempArray,
                            transferableRoleList,
                            setTransferableRoleList,
                            setSelectedItem,
                            setRightTempArray,
                            setActiveIndicies,
                            activeIndicies,
                            copyData
                          );
                        }}
                        handleMoveSelectedItemToRight={() => {
                          handleMoveSelectedItemToRight(
                            tempArray,
                            setFirstClick,
                            copyData,
                            setSelectedItemActiveIndices,
                            setRightTempArray,
                            setActiveIndicies,
                            activeIndicies,
                            setSelectedItem,
                            setTransferableRoleList
                          );
                        }}
                        handleShiftAllElementToRight={() => {
                          handleShiftAllElementToRight(
                            copyData,
                            setFirstClick,
                            setSelectedItemActiveIndices,
                            setSelectedItem,
                            setRightTempArray,
                            setTempArray,
                            setTransferableRoleList
                          );
                        }}
                        handleShiftAllElementToLeft={() => {
                          handleShiftAllElementToLeft(
                            copyData,
                            setSelectedItemActiveIndices,
                            setTransferableRoleList,
                            setRightTempArray,
                            setTempArray,
                            setSelectedItem,
                            setActiveIndicies,
                            activeIndicies
                          );
                        }}
                        handleLeftListItemClick={handleLeftListItemClick}
                        handleRightListItemClick={handleRightListItemClick}
                        selectedItem={selectedItem}
                        selectItemActiveIndices={selectItemActiveIndices}
                      />
                    </div>
                    <div className="row mt-2 mb-2">
                      <div className="d-flex justify-content-center">
                        <div className="me-1">
                          <Basicbutton
                            buttonText="Generate"
                            className="btn btn-success"
                            onClick={handleGenerate}
                            icon={
                              <FontAwesomeIcon
                                icon={faFloppyDisk}
                                className="me-2"
                              />
                            }
                          />
                        </div>
                        <div className="ms-1">
                          <Basicbutton
                            onClick={clearButtonHandle}
                            buttonText="Clear"
                            className="btn btn-danger"
                            icon={
                              <FontAwesomeIcon
                                icon={faEraser}
                                className="me-2"
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <div>
          <div className="row mt-2 mb-2">
            <div className="d-flex justify-content-center">
              <div className="me-1">
                <Basicbutton
                  buttonText="Create New reports"
                  className="btn btn-success"
                  onClick={handleCreateNew}
                  icon={
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                  }
                />
              </div>

              <div className="ms-1">
                {csvReady && <CSV csvData={repData.drugList} />}
              </div>
            </div>

            <Pdf parameter={DocumentRep} />
          </div>
        </div>
      )}
    </>
  );
};

export default StockLadger;
