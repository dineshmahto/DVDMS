import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../components/transfer/transferComponent";
import { makeStyles } from "@mui/styles";
import RadioCheckBox from "../../components/switch/radiocheckbox";
import CustomSelect from "../../components/select/customSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOpenNotification,
  getDrugListByProgramId,
  saveDemandNotification,
} from "../../store/demand/action";
import toastMessage from "../../common/toastmessage/toastmessage";
import { Paper } from "@mui/material";
import Basicbutton from "../../components/button/basicbutton";
import moment from "moment";
import { useNavigate } from "react-router";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../common/constant/constant";
import dayjs from "dayjs";

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
const OpenNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openNotificationListResponse = useSelector(
    (state) => state?.demand?.openNotificationListResponse
  );

  const drugListByProgramIdResponse = useSelector(
    (state) => state?.demand?.drugListByProgramIdResponse
  );
  const saveDemandNotificationResponse = useSelector(
    (state) => state?.demand?.saveDemandNotificationResponse
  );

  console.log("programmeListResponse", openNotificationListResponse);
  console.log("drugListByProgramIdResponse", drugListByProgramIdResponse);
  console.log("saveDemandNotificationResponse", saveDemandNotificationResponse);

  const classes = useStyles();

  const [periodicDropDownList, setPeriodicDropDownList] = useState([]);
  const [financialYearDropDownList, setFinancialDropDownList] = useState([]);
  const [demandTypeList, setDemandTypeList] = useState([]);

  // programme state variable
  const [programmeTempArray, setProgrammeTempArray] = useState([]);
  const [rightProgrammeTempArray, setRightProgrammeTempArray] = useState([]);
  const [programmeData, setprogrammeData] = useState([]);
  const [selectedProgrammeItem, setSelectedProgrammeItem] = useState([]);
  const [programmeActiveIndicies, setProgrammeActiveIndicies] = useState([]);
  const [programmeFirstClick, setProgrammeFirstClick] = useState(false);
  const [
    selectProgrammeItemActiveIndices,
    setSelectedProgrammeItemActiveIndices,
  ] = useState();
  const [copyProgrmmeData, setCopyprogrmmeData] = useState([]);

  // drug state variable
  const [drugTempArray, setDrugTempArray] = useState([]);
  const [drugRightTempArray, setDrugRightTempArray] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [selectedDrugItem, setSelectedDrugItem] = useState([]);
  const [drugActiveIndicies, setDrugActiveIndicies] = useState([]);
  const [drugFirstClick, setDrugFirstClick] = useState(false);
  const [selectDrugItemActiveIndices, setSelectedDrugItemActiveIndices] =
    useState([]);
  const [copyDrugData, setCopyDrugData] = useState([]);

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [totalProgramList, setTotalProgramList] = useState([]);
  const [totalDrugList, setTotalDrugList] = useState([]);
  const [drugListByProgramId, setDrugListByProgramId] = useState([]);

  const [disableComp, setDisableComp] = useState(false);

  const [data, setData] = useState({
    lastDate: "",
    remarks: "",
    periodic: "",
    financialYear: "2023 - 2024",
    demandType: "",
    programWiseDrug: "1",
    drugNotification: "1",
  });

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      dispatch(getAllOpenNotification());
    }
    return () => {
      isApiSubcribed = false;
    };
  }, []);

  useEffect(() => {
    if (
      openNotificationListResponse &&
      openNotificationListResponse?.status === 200
    ) {
      setTotalProgramList(
        openNotificationListResponse?.data?.programMappingList
      );
      setProgrammeActiveIndicies(
        openNotificationListResponse?.data?.programMappingList?.map(() => false)
      );
      setCopyprogrmmeData(
        openNotificationListResponse?.data?.programMappingList
      );
      setprogrammeData(openNotificationListResponse?.data?.programMappingList);

      setDrugActiveIndicies(
        openNotificationListResponse?.data?.drugList?.map(() => false)
      );
      setCopyDrugData(openNotificationListResponse?.data?.drugList);
      setDrugData(openNotificationListResponse?.data?.drugList);

      setTotalDrugList(openNotificationListResponse?.data?.drugList);

      setPeriodicDropDownList(openNotificationListResponse?.data?.periodicList);
      setFinancialDropDownList(
        openNotificationListResponse?.data?.financialYearList
      );
      setDemandTypeList(openNotificationListResponse?.data?.demandTypeList);
      setSelectedDrugItem([]);
    } else if (
      openNotificationListResponse &&
      openNotificationListResponse?.status == 400
    ) {
      // setLoading(false);
      toastMessage("Login Error", "Please enter valid ID", "error");
    }
  }, [openNotificationListResponse]);

  useEffect(() => {
    if (
      drugListByProgramIdResponse &&
      drugListByProgramIdResponse?.status === 200
    ) {
      setDrugListByProgramId(drugListByProgramIdResponse?.data);

      const leftSelectedDrugList = totalDrugList.filter((elem) => {
        return !drugListByProgramIdResponse?.data.find((ele) => {
          return ele.id === elem.id;
        });
      });

      setDrugFirstClick(true);
      setDrugTempArray(drugListByProgramIdResponse?.data);
      setSelectedDrugItemActiveIndices(
        drugListByProgramIdResponse?.data?.map(() => true)
      );
      setSelectedDrugItem(drugListByProgramIdResponse?.data);

      setDrugActiveIndicies(
        drugListByProgramIdResponse?.data?.map(() => false)
      );
      setCopyDrugData(totalDrugList);
      setDrugData(leftSelectedDrugList);

      setData({
        ...data,
        drugNotification: "0",
      });
      setDisableComp(true);
      // if (leftSelectedDrugList.length === 0) {
      //   console.log("Enters");
      //   setData({
      //     ...data,
      //     drugNotification: "0",
      //   });
      // }
    } else if (
      drugListByProgramIdResponse &&
      drugListByProgramIdResponse?.status === 400
    ) {
      toastMessage("Drug List By Id", "Failed to Load", "error");
    }
  }, [drugListByProgramIdResponse]);

  useEffect(() => {
    if (
      saveDemandNotificationResponse &&
      saveDemandNotificationResponse?.status ===
        NETWORK_STATUS_CODE.CREATED_SUCCESSFULLY
    ) {
      if (
        saveDemandNotificationResponse?.data?.status ===
        SERVER_STATUS_CODE.SUCCESS
      ) {
        toastMessage(
          "Notification Desk",
          saveDemandNotificationResponse?.data?.message
        );
        navigate("/openNotificationDesk");
      } else if (
        saveDemandNotificationResponse?.data?.status ===
        SERVER_STATUS_CODE.FAILED
      ) {
        toastMessage(
          "Notification Desk",
          saveDemandNotificationResponse?.data?.message
        );
      }
    }
  }, [saveDemandNotificationResponse]);

  const handleDrugLeftListItemClick = (e, id, element, index) => {
    const elementExist = drugTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setDrugTempArray([...drugTempArray, element]);
    } else {
      for (let [i, item] of drugTempArray?.entries()) {
        if (item.id === id) {
          drugTempArray.splice(i, 1);
        }
      }
    }
    if (!drugActiveIndicies.at(index)) {
      setDrugActiveIndicies(
        drugActiveIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setDrugActiveIndicies(
        drugActiveIndicies.map((bool, j) => (j === index ? false : bool))
      );
    }
  };
  const handleDrugRightListItemClick = (e, id, element, index) => {
    const elementExist = drugRightTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setDrugRightTempArray([...drugRightTempArray, element]);
    } else {
      for (let [i, item] of drugRightTempArray.entries()) {
        if (item.id === id) {
          drugRightTempArray.splice(i, 1);
        }
      }
    }

    if (drugFirstClick) {
      setSelectedDrugItemActiveIndices(
        selectDrugItemActiveIndices.map((bool, j) =>
          j === index ? true : false
        )
      );
      setDrugFirstClick(false);
    } else {
      console.log("enters here");
      const t = [...selectDrugItemActiveIndices];
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

      setSelectedDrugItemActiveIndices(ut);
    }
  };

  const handleRightListItemClick = (e, id, element, index) => {
    const elementExist = rightProgrammeTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setRightProgrammeTempArray([...rightProgrammeTempArray, element]);
    } else {
      for (let [i, item] of rightProgrammeTempArray.entries()) {
        if (item.id === id) {
          rightProgrammeTempArray.splice(i, 1);
        }
      }
    }

    if (programmeFirstClick) {
      setSelectedProgrammeItemActiveIndices(
        selectProgrammeItemActiveIndices.map((bool, j) =>
          j === index ? true : false
        )
      );
      setProgrammeFirstClick(false);
    } else {
      const t = [...selectProgrammeItemActiveIndices];
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
      setSelectedProgrammeItemActiveIndices(ut);
    }
  };

  const handleLeftListItemClick = (e, id, element, index) => {
    const elementExist = programmeTempArray?.filter((item) => {
      return item.id === id;
    });
    if (elementExist.length === 0) {
      setProgrammeTempArray([...programmeTempArray, element]);
    } else {
      for (let [i, item] of programmeTempArray?.entries()) {
        if (item.id === id) {
          programmeTempArray.splice(i, 1);
        }
      }
    }
    if (!programmeActiveIndicies.at(index)) {
      setProgrammeActiveIndicies(
        programmeActiveIndicies.map((bool, j) => (j === index ? true : bool))
      );
    } else {
      setProgrammeActiveIndicies(
        programmeActiveIndicies.map((bool, j) => (j === index ? false : bool))
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
    console.log("tempArray", tempArray);
    if (tempArray?.length > 0) {
      setFirstClick(true);

      const cloneData = [...copyiedData];
      console.log("cloneData", cloneData);
      setSelectedItemActiveIndices(tempArray?.map(() => true));
      setRightTempArray([]);
      setActiveIndicies(activeIndicies.map((bool, j) => false));
      const rightDispalyList = cloneData.filter((elem) => {
        return tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("rigthDisplayList", rightDispalyList);

      setSelectedItem(rightDispalyList);
      const leftRearrangedList = cloneData.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("leftRearranged", leftRearrangedList);
      setData(leftRearrangedList);
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
      const cloneData = [...selectedItem];
      console.log("cloneData", cloneData);
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("rightDisplayList", rightDispalyList);
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });

      console.log("reverseBackElements", reverseBackElements);

      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      console.log("updateTempArray", updateTempArray);
      setTempArray(updateTempArray);
      const storeIntoOne = [...data];
      console.log("copyiedData", data);
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
      console.log("storeintoOne", storeIntoOne);
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

  const handleSubmitData = () => {
    if (
      data.lastDate === "" ||
      data.remarks === "" ||
      data.financialYear === "" ||
      data.periodic === "" ||
      data.demandType === ""
    ) {
      toastMessage(
        "Create Notification",
        "Select all the Required Fields",
        "error"
      );
    } else if (
      data?.programWiseDrug === "1" &&
      selectedProgrammeItem.length === 0
    ) {
      toastMessage(
        "Create Notification",
        "Select the Program to be mapped",
        "error"
      );
    } else if (
      data?.programWiseDrug === "0" &&
      data?.drugNotification === "0"
    ) {
      toastMessage(
        "Create Notification",
        "Select at least one either Program wise or Drug wise Mapping",
        "error"
      );
    }
  };

  const resetComponent = () => {
    setDrugFirstClick(false);
    setDrugTempArray([]);
    setSelectedDrugItemActiveIndices([]);
    setSelectedDrugItem([]);
    setDrugActiveIndicies(totalDrugList?.map(() => false));
    setCopyDrugData(totalDrugList);
    setDrugData(totalDrugList);

    setProgrammeTempArray([]);
    setSelectedProgrammeItemActiveIndices([]);
    setSelectedProgrammeItem([]);

    setProgrammeActiveIndicies(
      openNotificationListResponse?.data?.programMappingList?.map(() => false)
    );
    setCopyprogrmmeData(openNotificationListResponse?.data?.programMappingList);
    setprogrammeData(openNotificationListResponse?.data?.programMappingList);
  };

  const getDrugListByProgId = () => {
    console.log("programTempArray", programmeTempArray);
    let list = [];
    programmeTempArray?.forEach((ele) => {
      list.push(ele.id);
    });
    dispatch(getDrugListByProgramId({ programId: list.toString() }));
  };

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  return (
    <>
      <Paper className="p-2 mt-2">
        <div className="row mt-3">
          <div className="d-flex">
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-7 m-0">State WareHouse</div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="financialYear">
                    Financial Year
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    defaultValue={{ value: "2023-2024", label: "2023-2024" }}
                    options={[
                      { value: "select", label: "Select" },
                      { value: "2023-2024", label: "2023-2024" },
                    ]}
                    onChange={(selectedOption) => {
                      console.log(selectedOption?.value);
                      setData({
                        ...data,
                        financialYear: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="demandType">
                    Demand Type
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    options={demandTypeList}
                    onChange={(selectedOption) => {
                      setData({
                        ...data,
                        demandType: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-4 text-center">
                  <label className="labellineHeight" htmlFor="demandType">
                    Last Date
                  </label>
                </div>
                <div className="col-8">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className={classes.root}
                      value={data?.lastDate}
                      onChange={(newValue) => {
                        console.log("NewValue", newValue);
                        setData({
                          ...data,
                          lastDate: newValue,
                        });
                      }}
                      disablePast={true}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="periodic">
                    Periodic
                  </label>
                </div>
                <div className="col-7">
                  <CustomSelect
                    options={periodicDropDownList}
                    onChange={(selectedOption) => {
                      setData({
                        ...data,
                        periodic: selectedOption?.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <HorizonatalLine text="New Request" />

        <div className="row">
          <div className="d-flex">
            <label>Do you want program-wise drug demands from the stores</label>
            <RadioCheckBox
              list={[
                {
                  id: "programWiseDrug1",
                  labelText: "Yes",
                  value: "1",
                  name: "programWiseDrug",
                  checked: data?.programWiseDrug,
                },
                {
                  id: "programWiseDrug2",
                  labelText: "No",
                  value: "0",
                  name: "programWiseDrug",
                  checked: data?.programWiseDrug,
                },
              ]}
              onChange={(e) => {
                console.log(e.target.value);
                resetComponent(e);
                if (e.target.value === "0") {
                  setDisableComp(false);
                  console.log("enters");
                  setData({
                    ...data,
                    drugNotification: "1",
                    programWiseDrug: e.target.value,
                  });
                } else {
                  setData({
                    ...data,
                    drugNotification: "0",
                    programWiseDrug: e.target.value,
                  });
                }
              }}
            />
          </div>
        </div>

        <HorizonatalLine text="Programme List" />

        {data?.programWiseDrug === "1" ? (
          <>
            <TransferComponent
              apiData={programmeData}
              activeIndicies={programmeActiveIndicies}
              handleMoveSelectedItemToLeft={() => {
                handleMoveSelectedItemToLeft(
                  selectProgrammeItemActiveIndices,
                  rightProgrammeTempArray,
                  setProgrammeFirstClick,
                  selectedProgrammeItem,
                  setSelectedProgrammeItemActiveIndices,
                  programmeTempArray,
                  setProgrammeTempArray,
                  programmeData,

                  setprogrammeData,
                  setSelectedProgrammeItem,
                  setRightProgrammeTempArray,
                  setProgrammeActiveIndicies,
                  programmeActiveIndicies,
                  copyProgrmmeData
                );
                if (programmeTempArray.length > 1) {
                  console.log("Dinesh");
                  getDrugListByProgId();
                } else if (programmeTempArray.length === 1) {
                  resetComponent();
                }
                console.log("programeTempArray", programmeTempArray.length);
                //getDrugListByProgId();
              }}
              handleMoveSelectedItemToRight={() => {
                handleMoveSelectedItemToRight(
                  programmeTempArray,
                  setProgrammeFirstClick,
                  copyProgrmmeData,
                  setSelectedProgrammeItemActiveIndices,
                  setRightProgrammeTempArray,
                  setProgrammeActiveIndicies,
                  programmeActiveIndicies,
                  setSelectedProgrammeItem,
                  setprogrammeData
                );
                getDrugListByProgId();
              }}
              handleShiftAllElementToRight={() => {
                handleShiftAllElementToRight(
                  copyProgrmmeData,
                  setProgrammeFirstClick,
                  setSelectedProgrammeItemActiveIndices,
                  setSelectedProgrammeItem,
                  setRightProgrammeTempArray,
                  setProgrammeTempArray,
                  setprogrammeData
                );
                console.log("totalProgramList", totalProgramList);
                //getDrugListByProgId();
                let list = [];
                totalProgramList?.forEach((ele) => {
                  list.push(ele.id);
                });
                dispatch(
                  getDrugListByProgramId({
                    programId: list.toString(),
                  })
                );
              }}
              handleShiftAllElementToLeft={() => {
                handleShiftAllElementToLeft(
                  copyProgrmmeData,
                  setSelectedProgrammeItemActiveIndices,
                  setprogrammeData,
                  setRightProgrammeTempArray,
                  setProgrammeTempArray,
                  setSelectedProgrammeItem,
                  setProgrammeActiveIndicies,
                  programmeActiveIndicies
                );
                resetComponent();
              }}
              handleLeftListItemClick={handleLeftListItemClick}
              handleRightListItemClick={handleRightListItemClick}
              selectedItem={selectedProgrammeItem}
              selectItemActiveIndices={selectProgrammeItemActiveIndices}
            />
          </>
        ) : null}

        <div className="row mt-3">
          <div className="d-flex">
            <label>Do you want notification for selected drugs </label>
            <RadioCheckBox
              list={[
                {
                  id: "selectDrugs1",
                  labelText: "Yes",
                  value: "1",
                  name: "selectDrugs",
                  checked: data?.drugNotification,
                },
                {
                  id: "selectDrugs2",
                  labelText: "No",
                  value: "0",
                  name: "selectDrugs",
                  checked: data?.drugNotification,
                },
              ]}
              onChange={(e) => {
                resetComponent(e);
                setDisableComp(false);
                if (e.target.value === "0") {
                  setDisableComp(true);
                  setData({
                    ...data,
                    programWiseDrug: "1",
                    drugNotification: e.target.value,
                  });
                } else {
                  setData({
                    ...data,
                    programWiseDrug: "0",
                    drugNotification: e.target.value,
                  });
                }
              }}
            />
          </div>
        </div>

        <HorizonatalLine text="Drug List List" />

        <TransferComponent
          isDisabled={disableComp}
          apiData={drugData}
          activeIndicies={drugActiveIndicies}
          handleMoveSelectedItemToLeft={() => {
            handleMoveSelectedItemToLeft(
              selectDrugItemActiveIndices,
              drugRightTempArray,
              setDrugFirstClick,
              selectedDrugItem,
              setSelectedDrugItemActiveIndices,
              drugTempArray,
              setDrugTempArray,
              drugData,

              setDrugData,
              setSelectedDrugItem,
              setDrugRightTempArray,
              setDrugActiveIndicies,
              drugActiveIndicies,
              copyDrugData
            );
          }}
          handleMoveSelectedItemToRight={() => {
            setData({
              ...data,
              drugNotification: "1",
              programWiseDrug: "0",
            });
            handleMoveSelectedItemToRight(
              drugTempArray,
              setDrugFirstClick,
              copyDrugData,
              setSelectedDrugItemActiveIndices,
              setDrugRightTempArray,
              setDrugActiveIndicies,
              drugActiveIndicies,
              setSelectedDrugItem,
              setDrugData
            );
          }}
          handleShiftAllElementToRight={() => {
            handleShiftAllElementToRight(
              copyDrugData,
              setDrugFirstClick,
              setSelectedDrugItemActiveIndices,
              setSelectedDrugItem,
              setDrugRightTempArray,
              setDrugTempArray,
              setDrugData
            );
          }}
          handleShiftAllElementToLeft={() => {
            handleShiftAllElementToLeft(
              copyDrugData,
              setSelectedDrugItemActiveIndices,
              setDrugData,
              setDrugRightTempArray,
              setDrugTempArray,
              setSelectedDrugItem,
              setDrugActiveIndicies,
              drugActiveIndicies
            );
          }}
          handleLeftListItemClick={handleDrugLeftListItemClick}
          handleRightListItemClick={handleDrugRightListItemClick}
          selectedItem={selectedDrugItem}
          selectItemActiveIndices={selectDrugItemActiveIndices}
        />

        <HorizonatalLine text="Remarks" />

        <div className="row mb-5">
          <div className="col-6">
            <label htmlFor="remarks" className="form-label">
              Remarks
            </label>
            <textarea
              name="remarks"
              className="form-control"
              rows="3"
              id="remarks"
              onChange={(e) =>
                setData({
                  ...data,
                  remarks: e.target.value,
                })
              }
            ></textarea>
          </div>

          <div className="row d-flex justify-content-end mt-2">
            <div>
              <Basicbutton
                buttonText="Submit"
                className="primary"
                onClick={() => {
                  const unmappedDrugList = selectedDrugItem.filter((elem) => {
                    return !drugListByProgramId?.find((ele) => {
                      return ele.id === elem.id;
                    });
                  });

                  console.log("unmappedDrugList", unmappedDrugList);
                  //handleSubmitData();

                  console.log("data", data);
                  const reqData = data;
                  reqData.lastDate = formatDate(data?.lastDate);
                  reqData.program = selectedProgrammeItem;
                  reqData.drugList = selectedDrugItem;
                  console.log("Request Data", reqData);
                  dispatch(saveDemandNotification(reqData));
                }}
              />
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default OpenNotification;
