import React, { useEffect, useState } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import CustomSelect from "../../../components/select/customSelect";
import TransferComponent from "../../../components/transfer/transferComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import { useSelector, useDispatch } from "react-redux";
import { getEdlMappingList } from "../../../store/admin/action";
const StoreTypeDrugMapping = () => {
  const [storeTypeDropDownList, setStoreTypeDropDownList] = useState([]);
  const dispatch = useDispatch();
  const edlMappingListResponse = useSelector(
    (state) => state.admin?.edlMappingListResponse
  );

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

  useEffect(() => {
    if (edlMappingListResponse && edlMappingListResponse?.status === 200) {
      setStoreTypeDropDownList(edlMappingListResponse?.data?.selectList);
      setprogrammeData(edlMappingListResponse?.data?.moveLeftRightList);
      setCopyprogrmmeData(edlMappingListResponse?.data?.moveLeftRightList);
      setProgrammeActiveIndicies(
        edlMappingListResponse?.data?.moveLeftRightList.map((bool, j) => false)
      );
    }
  }, [edlMappingListResponse]);

  useEffect(() => {
    dispatch(getEdlMappingList());
  }, []);

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

      console.log("reverseBackElement", reverseBackElements);

      const updateTempArray = tempArray.filter((elem) => {
        return !reverseBackElements.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setTempArray(updateTempArray);
      const storeIntoOne = [...data];
      console.log("copyiedData", copyiedData);
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
  return (
    <Paper className="mt-2">
      <div className="container-fluid  border rounded">
        <div className="row text-center mt-3">
          <div className="col-6 offset-3">
            <h6 className="p-1">EDL MAPPING</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-9 offset-1">
            <div className="row mb-2">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">STORE TYPE</div>
                  <div className="col-8">
                    <CustomSelect options={storeTypeDropDownList} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <HorizonatalLine text="Drug List" />
            </div>
            <div className="row">
              <div className="col-10 offset-1">
                <div className="row text-center">
                  <p>
                    Select Funding Source (Move selected Funding Source from
                    Left to Right)
                  </p>
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
                        programmeData,
                        setprogrammeData,
                        setSelectedProgrammeItem,
                        setRightProgrammeTempArray,
                        setProgrammeActiveIndicies,
                        programmeActiveIndicies,
                        copyProgrmmeData
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
                <div className="row mt-2 mb-2">
                  <div className="d-flex justify-content-center">
                    <div className="me-1">
                      <Basicbutton
                        buttonText="Save"
                        className="btn btn-success"
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-2"
                          />
                        }
                        onClick={console.log(
                          "selectedItem",
                          selectedProgrammeItem
                        )}
                      />
                    </div>
                    <div className="ms-1">
                      <Basicbutton
                        buttonText="Cancel"
                        className="btn btn-danger"
                        icon={
                          <FontAwesomeIcon icon={faXmark} className="me-2" />
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
  );
};

export default StoreTypeDrugMapping;
