import React, { useState, useEffect } from "react";
import SelectOption from "../../components/option/option";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HorizonatalLine from "../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../components/transfer/transferComponent";
import { makeStyles } from "@mui/styles";
import RadioCheckBox from "../../components/switch/radiocheckbox";
import { getNotificationService } from "../../services/notification/notificationservice";

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
  const classes = useStyles();
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
    useState();
  const [copyDrugData, setCopyDrugData] = useState([]);

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [lastDate, setLastDate] = useState();
  const data = [
    {
      id: 1000000786,
      name: "Tab. Ampicillin, Dispersible",
    },
    {
      id: 10318,
      name: "Tab. Levofloxacin 500mg",
    },
    {
      id: 1000000794,
      name: "Inj. Gentamycin Sulphate",
    },
    {
      id: 1000000795,
      name: "Inj. Fortified Procaine Penicillin",
    },
    {
      id: 1000000796,
      name: "Tab. Amoxycillin, Dispersible",
    },
    {
      id: 1000000797,
      name: "Cap. Chloramphenicol",
    },
  ];
  console.log("dataLenght", data.length);
  const callApi = async (endPoint, setData, setCopyData, setActiveIndicies) => {
    await getNotificationService(endPoint)
      .then((r) => {
        // console.log("Response", r?.data.data);
        // setActiveIndicies(r.data?.data?.map(() => false));
        // setCopyData(r?.data?.data);
        // setData(r?.data?.data);

        setActiveIndicies(data?.map(() => false));
        setCopyData(data);
        setData(data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    callApi(
      "calls/getAllProgrammerLists",
      setprogrammeData,
      setCopyprogrmmeData,
      setProgrammeActiveIndicies
    );
    callApi(
      "calls/getAllDruglist",
      setDrugData,
      setCopyDrugData,
      setDrugActiveIndicies
    );
  }, []);
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
      const leftRearrangedList = cloneData.filter((elem) => {
        return !tempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
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
    copyiedData,
    setData,
    setSelectedItem,
    setRightTempArray,
    setActiveIndicies,
    activeIndicies
  ) => {
    const allACtiveClasses = selectItemActiveIndices.every((e) => e === true);
    if (rightTempArray.length > 0) {
      setFirstClick(true);
      const cloneData = [...selectedItem];
      const rightDispalyList = cloneData.filter((elem) => {
        return !rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setSelectedItemActiveIndices(rightDispalyList?.map(() => true));
      const reverseBackElements = cloneData.filter((elem) => {
        return rightTempArray.find((ele) => {
          return ele.id === elem.id;
        });
      });

      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setTempArray(updateTempArray);
      const storeIntoOne = [...copyiedData];
      reverseBackElements.map((elem) => {
        storeIntoOne.push(elem);
      });
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
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="d-flex">
            <div className="col">
              <div className="row">
                <div className="col-5 text-center">
                  <label className="labellineHeight" htmlFor="storeName">
                    Store Name
                  </label>
                </div>
                <div className="col-7 m-0">
                  <SelectOption className="d-inline" id="storeName" data={[]} />
                </div>
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
                  <SelectOption id="financialYear" data={[]} />
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
                  <SelectOption id="demandType" data={[]} />
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
                      value={lastDate}
                      onChange={(newValue) => {
                        console.log("NewValue", newValue);
                      }}
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
                  <SelectOption id="periodic" data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="New Request" />
        </div>
        <div className="row">
          <div className="d-flex">
            <label>Do you want program-wise drug demands from the stores</label>
            <RadioCheckBox
              id1="programWiseDrug1"
              id2="programWiseDrug2"
              name="programWiseDrug"
              labelText1="Yes"
              labelText2="No"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Programme List" />
        </div>
        <div className="row">
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
                copyProgrmmeData,
                setprogrammeData,
                setSelectedProgrammeItem,
                setRightProgrammeTempArray,
                setProgrammeActiveIndicies,
                programmeActiveIndicies
              );
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
            }}
            handleLeftListItemClick={handleLeftListItemClick}
            handleRightListItemClick={handleRightListItemClick}
            selectedItem={selectedProgrammeItem}
            selectItemActiveIndices={selectProgrammeItemActiveIndices}
          />
        </div>
        <div className="row">
          <div className="d-flex">
            <label>Do you want notification for selected drugs </label>
            <RadioCheckBox
              list={[
                {
                  id: "selectDrugs1",
                  labelText: "Yes",
                  value: "Yes",
                  name: "selectDrugs",
                },
                {
                  id: "selectDrugs2",
                  labelText: "No",
                  value: "No",
                  name: "selectDrugs",
                },
              ]}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Drug List List" />
        </div>
        <div className="row">
          <TransferComponent
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
                copyDrugData,
                setDrugData,
                setSelectedDrugItem,
                setDrugRightTempArray,
                setDrugActiveIndicies,
                drugActiveIndicies
              );
            }}
            handleMoveSelectedItemToRight={() => {
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
        </div>
        <div className="row mt-2">
          <HorizonatalLine text="Remarks" />
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <label htmlFor="remarks" className="form-label">
              Remarks
            </label>
            <textarea className="form-control" rows="3" id="remarks"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenNotification;
