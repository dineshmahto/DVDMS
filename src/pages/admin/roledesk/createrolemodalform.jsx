import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import TransferComponent from "../../../components/transfer/transferComponent";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import {
  createRole,
  createRoleResponse,
  getActivityByRoleId,
  getActivityByRoleIdResp,
  getRoleList,
} from "../../../store/admin/action";
const CreateRoleModalForm = ({
  openCreateRoleModal,
  handleCloseCreateRoleModal,
  data,
  activityList,
}) => {
  const dispatch = useDispatch();
  const createRoleResp = useSelector((state) => state?.admin?.createRoleResp);
  const activityListByType = useSelector(
    (state) => state?.admin?.activityListByRoleIdResp
  );
  console.log("Data", data);
  console.log("activityList", activityList);

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

  const addRoleField = [
    {
      type: "text",
      name: "roleName",
      placeholder: "Enter Role Name",
      value: "",
      label: "Role Name",
    },
    {
      type: "text",
      name: "roleDescription",
      placeholder: "Enter Role Description",
      value: "",

      label: "Role Description",
    },

    {
      type: "select",
      name: "activityType",

      option: activityList,
      value: "",
      label: "Activity Type",
    },
  ];

  useEffect(() => {
    if (createRoleResp && createRoleResp?.status === 201) {
      dispatch(getRoleList());
      dispatch(createRoleResponse(""));
    } else if (createRoleResp && createRoleResp?.status === 500) {
      dispatch(createRoleResponse(""));
      toastMessage("CREATE ROLE", "Something went wrong");
    }
  }, [createRoleResp]);

  useEffect(() => {
    if (activityListByType && activityListByType?.status === 200) {
      console.log("activityListByType", activityListByType);
      setSelectedItem([]);
      setRightTempArray([]);
      setFirstClick(false);
      setSelectedItemActiveIndices([]);
      setTempArray([]);
      setActiveIndicies(
        activityListByType?.data?.activityList?.map(() => false)
      );
      setTransferableRoleList(activityListByType?.data?.activityList);
      setCopyData(activityListByType?.data?.activityList);

      dispatch(getActivityByRoleIdResp(""));
    } else if (activityListByType && activityListByType?.status === 500) {
      dispatch(getActivityByRoleIdResp(""));
      toastMessage("ROLE DESK", "Something went wrong");
    }
  }, [activityListByType]);
  return (
    <>
      <BasicModal
        title="Create Role"
        show={openCreateRoleModal}
        close={() => {
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
            console.log("Values", values);
            if (selectedItem && selectedItem?.length === 0) {
              toastMessage("CREATE ROLE", "please map the role list");
            } else {
              const cloneData = [...selectedItem];
              const final =
                cloneData &&
                cloneData.map((ele) => {
                  delete ele["name"];
                  return ele;
                });
              console.log("final", final);
              dispatch(createRole({ ...values, list: final }));
            }
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
            setFieldValue,
            isValid,
          }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  {addRoleField.map(
                    ({ name, type, value, label, ...props }) => {
                      switch (type) {
                        case "select":
                          return (
                            <>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <label htmlFor={name} class="col-form-label">
                                    {label}
                                  </label>
                                </div>
                                <div className="col-6">
                                  <CustomSelect
                                    id={name}
                                    key={name}
                                    name={name}
                                    value={
                                      props?.option &&
                                      props?.option?.find(
                                        (c) => c.value === values[`${name}`]
                                      )
                                    }
                                    onChange={(val) => {
                                      setFieldValue(name, val.value);

                                      dispatch(
                                        getActivityByRoleId({
                                          code: val?.value,
                                        })
                                      );
                                    }}
                                    options={
                                      props?.option && props?.option?.length > 0
                                        ? props?.option
                                        : []
                                    }
                                    onBlur={setFieldTouched}
                                  />
                                </div>
                                <div className="col-3">
                                  {errors.name && touched.name ? (
                                    <div className="text-danger float-end">
                                      {errors.name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          );

                        default:
                          return (
                            <>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <label
                                    htmlFor={name}
                                    className="col-form-label"
                                  >
                                    {label}
                                  </label>
                                </div>
                                <div className="col-6">
                                  <Field
                                    className="form-control shadow-none"
                                    value={values[`${name}`]}
                                    type={type}
                                    id={name}
                                    name={name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={props?.placeholder}
                                  />
                                </div>
                                <div className="col-3">
                                  {errors?.name && touched?.name ? (
                                    <div className="text-danger float-end">
                                      {errors?.name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          );
                      }
                    }
                  )}

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
                          type="submit"
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
