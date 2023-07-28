import React, { useEffect, useState } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import TransferComponent from "../../../components/transfer/transferComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  editRole,
  editRoleResponse,
  getRoleList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
const EditRoleModal = ({
  openEditRoleModal,
  handleCloseEditRoleModal,
  currentRoleList,
  availableRoleList,
  totalActivitList,
  modalHeaderData,
  resetPageDetails,
}) => {
  const dispatch = useDispatch();
  const editRoleResponses = useSelector((state) => state?.admin?.editRoleResp);
  console.log("editRoleResponse", editRoleResponses);
  console.log("totalActivityList", totalActivitList, modalHeaderData);

  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [drugData, setDrugData] = useState([]);

  useEffect(() => {
    setFirstClick(true);
    setTempArray(currentRoleList);
    setSelectedItemActiveIndices(currentRoleList.map(() => true));
    setSelectedItem(currentRoleList);

    setActiveIndicies(availableRoleList?.map(() => false));
    setDrugData(availableRoleList);
    setCopyData(totalActivitList);
  }, [currentRoleList]);

  useEffect(() => {
    if (editRoleResponses && editRoleResponses?.status === 201) {
      if (editRoleResponses?.data?.status === 1) {
        handleCloseEditRoleModal();
        toastMessage("Role Desk", editRoleResponses?.data?.message);
        resetPageDetails();
        dispatch(getRoleList());
        dispatch(editRoleResponse(""));
      } else if (editRoleResponses?.data?.status === 0) {
        toastMessage("Role Desk", editRoleResponses?.data?.message);
        dispatch(editRoleResponse(""));
      }
    } else if (editRoleResponses && editRoleResponses?.status === 500) {
      handleCloseEditRoleModal();
      dispatch(editRoleResponse(""));
      toastMessage("Role Desk", "Something went wrong", "");
    }
  }, [editRoleResponses]);
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
    <>
      <BasicModal
        title={`Edit Role: ${modalHeaderData?.id} (${modalHeaderData?.name})`}
        show={openEditRoleModal}
        close={() => {
          setSelectedItem([]);
          setRightTempArray([]);
          setFirstClick(false);
          setSelectedItemActiveIndices([]);

          setActiveIndicies([]);

          setCopyData([]);
          setDrugData([]);
          handleCloseEditRoleModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_role"
      >
        <div className="row m-1">
          <TransferComponent
            apiData={drugData}
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
                drugData,

                setDrugData,
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
                setDrugData
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
                setDrugData
              );
            }}
            handleShiftAllElementToLeft={() => {
              handleShiftAllElementToLeft(
                copyData,
                setSelectedItemActiveIndices,
                setDrugData,
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
        <div className="row mt-1  mb-2">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <Basicbutton
                icon={<FontAwesomeIcon icon={faFloppyDisk} className="me-1" />}
                type="button"
                buttonText="Save"
                className="primary"
                outlineType={true}
                onClick={() => {
                  if (selectedItem && selectedItem?.length === 0) {
                    toastMessage("CREATE ROLE", "please map the role list");
                  } else {
                    const cloneData = [...selectedItem];
                    let programId = [];
                    cloneData &&
                      cloneData.map(({ id }) => {
                        let ele = {};
                        ele["id"] = id;
                        programId.push(ele);
                        return id;
                      });
                    dispatch(
                      editRole({ id: modalHeaderData?.id, list: programId })
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default EditRoleModal;
