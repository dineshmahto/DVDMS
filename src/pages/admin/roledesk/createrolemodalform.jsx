import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
const CreateRoleModalForm = ({
  openCreateRoleModal,
  handleCloseCreateRoleModal,
  data,
}) => {
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);

  const newUserRoleSchema = Yup.object().shape({
    roleName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Role Name is Required"),
    roleDescription: Yup.string()
      .ensure()
      .required("Role Description is Required!"),
    activityType: Yup.string().required("Activity Type is required"),
  });

  useEffect(() => {
    setSelectedItem([]);
    setRightTempArray([]);
    setFirstClick(false);
    setSelectedItemActiveIndices([]);
    setTempArray([]);
    setActiveIndicies(data?.map(() => false));
    setTransferableRoleList(data);
    setCopyData(data);
  }, [data]);

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
  return (
    <>
      <BasicModal
        title="Create Role"
        show={openCreateRoleModal}
        close={() => {
          setTransferableRoleList([]);
          setSelectedItem([]);
          setRightTempArray([]);
          setFirstClick(false);
          setSelectedItemActiveIndices([]);
          setTempArray([]);
          handleCloseCreateRoleModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_role"
      >
        <Formik
          validateOnMount
          initialValues={{
            roleName: "",
            roleDescription: "",
            activityType: "",
          }}
          validationSchema={newUserRoleSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            errors,
            touched,
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            setFieldTouched,
            isValid,
          }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="roleName" className="col-form-label">
                        Role Name :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        type="text"
                        placeholder="Role Name is between 6 to 50 character"
                        id="roleName"
                        name="roleName"
                        value={values?.roleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label
                        htmlFor="roleDescription"
                        className="col-form-label"
                      >
                        Role Description :
                      </label>
                    </div>
                    <div className="col-9">
                      <Field
                        className="form-control shadow-none"
                        type="text"
                        placeholder="Enter Role Description"
                        id="roleDescription"
                        name="roleDescription"
                        value={values?.roleDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-3">
                      <label htmlFor="activityType" className="col-form-label">
                        Activity Type :
                      </label>
                    </div>
                    <div className="col-9">
                      <CustomSelect
                        className="form-control shadow-none"
                        id="activityType"
                        name="activityType"
                        options={[]}
                        onBlur={setFieldTouched}
                        onChange={(choice) => {
                          console.log(choice?.value);
                          //callActivityListApiByCode(choice?.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row m-1">
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
                  <div className="row mt-1  mb-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="button"
                          buttonText="Save"
                          className="primary"
                          outlineType={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BasicModal>
    </>
  );
};

export default CreateRoleModalForm;
