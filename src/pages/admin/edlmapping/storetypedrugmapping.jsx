import React, { useEffect, useState } from "react";
import Basicbutton from "../../../components/button/basicbutton";
import CustomSelect from "../../../components/select/customSelect";
import TransferComponent from "../../../components/transfer/transferComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import HorizonatalLine from "../../../components/horizontalLine/horizonatalLine";
import { useSelector, useDispatch } from "react-redux";
import {
  createEdlMapingResponse,
  createEdlMapping,
  getDrugListByStoreType,
  getEdlMappingList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
const StoreTypeDrugMapping = () => {
  const [storeTypeDropDownList, setStoreTypeDropDownList] = useState([]);
  const dispatch = useDispatch();
  const edlMappingListResponse = useSelector(
    (state) => state?.admin?.edlMappingListResponse
  );
  const drugListByStoreType = useSelector(
    (state) => state?.admin?.drugListByStoreTypeResponse
  );
  const createEdlMappingResponse = useSelector(
    (state) => state?.admin?.createEdlMapResp
  );
  console.log("createEdlMappingResponse", createEdlMappingResponse);

  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);

  const [storeTypeId, setStoreTypeId] = useState("");
  useEffect(() => {
    if (edlMappingListResponse && edlMappingListResponse?.status === 200) {
      setStoreTypeDropDownList(edlMappingListResponse?.data?.storeTypeList);
      setTransferableRoleList(edlMappingListResponse?.data?.drugList);
      setCopyData(edlMappingListResponse?.data?.drugList);
      setActiveIndicies(
        edlMappingListResponse?.data?.drugList.map((bool, j) => false)
      );
    }
  }, [edlMappingListResponse]);

  useEffect(() => {
    if (drugListByStoreType && drugListByStoreType?.status === 200) {
      setFirstClick(true);
      setTempArray(drugListByStoreType?.data);
      setSelectedItemActiveIndices(drugListByStoreType?.data?.map(() => true));
      setSelectedItem(drugListByStoreType?.data);
      const leftElelemt = [...copyData].filter((elem) => {
        return !drugListByStoreType?.data?.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setActiveIndicies(leftElelemt?.map(() => false));
      setTransferableRoleList(leftElelemt);
      setCopyData(copyData);
    }
  }, [drugListByStoreType]);

  useEffect(() => {
    if (createEdlMappingResponse && createEdlMappingResponse?.status === 201) {
      if (createEdlMappingResponse?.data?.status === 1) {
        toastMessage("EDL MAPPING", createEdlMappingResponse?.data?.message);

        dispatch(createEdlMapingResponse(""));
      } else if (createEdlMappingResponse?.data?.status === 0) {
        toastMessage("EDL MAPPING", createEdlMappingResponse?.data?.message);
        dispatch(createEdlMapingResponse(""));
      }
    } else if (
      createEdlMappingResponse &&
      createEdlMappingResponse?.status === 500
    ) {
      dispatch(createEdlMapingResponse(""));
      toastMessage("EDL MAPPING", "Something went wrong", "");
    } else if (
      createEdlMappingResponse &&
      createEdlMappingResponse?.status === 400
    ) {
      dispatch(createEdlMapingResponse(""));
      toastMessage(
        "EDL MAPPING",
        createEdlMappingResponse?.data?.message,
        "error"
      );
    }
  }, [createEdlMappingResponse]);

  useEffect(() => {
    dispatch(getEdlMappingList());
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
                    <CustomSelect
                      options={storeTypeDropDownList}
                      onChange={(val) => {
                        setStoreTypeId(val?.value);
                        dispatch(
                          getDrugListByStoreType({
                            storeTypeId: val?.value,
                          })
                        );
                      }}
                    />
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
                        className="btn btn-success rounded-0"
                        outlineType={true}
                        icon={
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="me-2"
                          />
                        }
                        onClick={() => {
                          if (selectedItem && selectedItem?.length === 0) {
                            toastMessage(
                              "CREATE ROLE",
                              "please map the role list"
                            );
                          } else {
                            const cloneData = [...selectedItem];
                            console.log("cloneData", cloneData);
                            let programId = [];
                            cloneData &&
                              cloneData.map(({ id }) => {
                                let ele = {};
                                ele["id"] = id;
                                programId.push(ele);
                                return id;
                              });
                            console.log("programId", programId);
                            dispatch(
                              createEdlMapping({
                                storetype_id: storeTypeId,
                                list: programId,
                              })
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="ms-1">
                      <Basicbutton
                        buttonText="Cancel"
                        className="btn btn-danger rounded-0"
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
