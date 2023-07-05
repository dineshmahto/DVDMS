import React, { useEffect, useState } from "react";
import CustomSelect from "../../../components/select/customSelect";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Paper } from "@mui/material";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgrameFundingSourceList,
  getProgrameFundingSourceListResponse,
  getFundingSourceByPrgrmName,
  getFundingSourceByPrgrmNameResponse,
  createProgramFunding,
  createProgramFundingResponse,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
const ProgrameFundingSource = () => {
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const finincialYear = [{ value: "2021-2022", label: "2021-22" }];
  const [programId, setProgramId] = useState("");
  const [year, setyear] = useState("");

  const getProgranFundRes = useSelector(
    (state) => state?.admin?.programFundingSourceResponse
  );
  const fundingSrcListByProgrmName = useSelector(
    (state) => state?.admin?.fundingSourceListByPrgrmResponse
  );
  const createProgrmFundingResponse = useSelector(
    (state) => state?.admin?.createProgramFundingResponse
  );

  console.log("fundingSrcListByProgrmName", fundingSrcListByProgrmName);
  console.log("createProgrmFundingResponse", createProgrmFundingResponse);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getProgranFundRes && getProgranFundRes?.status === 200) {
      setProgramList(getProgranFundRes.data.programmeList);
      setSelectedItem([]);
      setRightTempArray([]);
      setFirstClick(false);
      setSelectedItemActiveIndices([]);
      setTempArray([]);
      setActiveIndicies(getProgranFundRes?.data?.sourceList?.map(() => false));
      setTransferableRoleList(getProgranFundRes?.data?.sourceList);
      setCopyData(getProgranFundRes?.data?.sourceList);
      dispatch(getProgrameFundingSourceListResponse(""));
    } else if (getProgranFundRes && getProgranFundRes?.status === 500) {
      dispatch(getProgrameFundingSourceListResponse(""));
      toastMessage("Programme Funding", "Something went wrong", "");
    }
  }, [getProgranFundRes]);

  useEffect(() => {
    if (
      fundingSrcListByProgrmName &&
      fundingSrcListByProgrmName?.status === 200
    ) {
    } else if (
      fundingSrcListByProgrmName &&
      fundingSrcListByProgrmName?.status === 500
    ) {
      dispatch(getFundingSourceByPrgrmNameResponse(""));
      toastMessage("Programme Funding", "Something went wrong", "");
    }
  }, [fundingSrcListByProgrmName]);

  useEffect(() => {
    if (
      fundingSrcListByProgrmName &&
      fundingSrcListByProgrmName?.status === 200
    ) {
      setFirstClick(true);
      setTempArray(fundingSrcListByProgrmName?.data);
      setSelectedItemActiveIndices(
        fundingSrcListByProgrmName?.data?.map(() => true)
      );
      setSelectedItem(fundingSrcListByProgrmName?.data);
      const leftElelemt = [...copyData].filter((elem) => {
        return !fundingSrcListByProgrmName?.data?.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setActiveIndicies(leftElelemt?.map(() => false));
      setTransferableRoleList(leftElelemt);
      setCopyData(copyData);
    }
  }, [fundingSrcListByProgrmName]);

  useEffect(() => {
    if (
      createProgrmFundingResponse &&
      createProgrmFundingResponse?.status === 201
    ) {
      if (createProgrmFundingResponse?.data?.status === 1) {
        dispatch(getProgrameFundingSourceList());
        toastMessage(
          "Programme Funding Desk",
          createProgrmFundingResponse?.data?.message
        );

        dispatch(createProgramFundingResponse(""));
      } else if (createProgrmFundingResponse?.data?.status === 0) {
        toastMessage(
          "Programme Funding Desk",
          createProgrmFundingResponse?.data?.message
        );
        dispatch(createProgramFundingResponse(""));
      }
    } else if (
      createProgrmFundingResponse &&
      createProgrmFundingResponse?.status === 500
    ) {
      dispatch(createProgramFundingResponse(""));
      toastMessage("Programme Funding Desk", "Something went wrong", "");
    }
  }, [createProgrmFundingResponse]);

  useEffect(() => {
    let isApiSubcribed = true;
    if (isApiSubcribed) {
      dispatch(getProgrameFundingSourceList());
    }
    return () => {
      isApiSubcribed = false;
      dispatch(getProgrameFundingSourceListResponse(""));
    };
  }, []);

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
      const storeIntoOne = [...data];
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
        <div className="row text-center mt-1">
          <div className="col-6 offset-3">
            <h6 className="p-1">PROGRAMME FUNDING SOURCE</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-9 offset-1">
            <div className="row mb-2">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">Programme Name</div>
                  <div className="col-8">
                    <CustomSelect
                      options={programList}
                      onChange={(val) => {
                        setProgramId(val?.value);
                        dispatch(
                          getFundingSourceByPrgrmName({
                            programId: val?.value,
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-10 offset-1">
                <div className="row">
                  <div className="col-4">Financial Year</div>
                  <div className="col-8">
                    <CustomSelect
                      options={finincialYear}
                      onChange={(val) => {
                        setyear(val?.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <HorizonatalLine text="Funding Source List" />
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
                        buttonText="Save"
                        className="btn btn-success"
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-2"
                          />
                        }
                        onClick={() => {
                          if (selectedItem && selectedItem?.length === 0) {
                            toastMessage(
                              "PROGRAMME FUNDING",
                              "please map the Funding Source list"
                            );
                          } else {
                            const cloneData = [...selectedItem];
                            let programIds = [];
                            cloneData &&
                              cloneData.map(({ id }) => {
                                let ele = {};
                                ele["id"] = id;
                                programIds.push(ele);
                                return id;
                              });
                            dispatch(
                              createProgramFunding({
                                programmeId: programId,
                                financialYear: year,
                                list: programIds,
                              })
                            );
                          }
                        }}
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

export default ProgrameFundingSource;
