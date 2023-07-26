import React, { useState, useEffect } from "react";
import BasicModal from "../../../components/modal/basicmodal";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import CustomSelect from "../../../components/select/customSelect";
import TransferComponent from "../../../components/transfer/transferComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Basicbutton from "../../../components/button/basicbutton";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../../../common/toastmessage/toastmessage";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
import {
  getProgramDeskList,
  updateProgram,
  updateProgramResponse,
} from "../../../store/admin/action";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
const EditProgramDeskForm = ({
  openEditProgrmModal,
  handleCloseEditProgrmModal,
  totalDrugList,
  editData,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const dispatch = useDispatch();
  const updateProgramResp = useSelector(
    (state) => state?.admin?.updateProgramResp
  );
  console.log("updateProgramResp", updateProgramResp);
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);

  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);

  const dropDownList = [
    { label: "Active", value: "1" },
    { label: "InActive", value: "0" },
  ];
  const editProgramField = [
    {
      type: "text",
      name: "programName",
      placeholder: "Enter Programe Name",
      value: "",
      label: "Programe Name",
    },
    {
      type: "text",
      name: "prgCode",
      placeholder: "Enter Program Code",
      value: "",

      label: "Programe Code",
    },
    {
      type: "date",
      name: "startDate",
      placeholder: "",
      value: "",
      label: "Start Date",
    },
    {
      type: "date",
      name: "endDate",
      placeholder: "",
      value: "",
      label: "End Date",
    },
    {
      type: "text",
      name: "remarks",
      placeholder: "Enter Remarks",
      value: "",
      label: "Remarks",
    },
    {
      type: "select",
      name: "status",
      placeholder: "e.g 250, 500, 125/5",
      value: "",
      option: dropDownList,
      label: "Status",
    },
  ];

  useEffect(() => {
    if (editData && editData?.drugList) {
      console.log("Enters", editData?.drugList);
      setFirstClick(true);
      setTempArray(editData?.drugList);
      setSelectedItemActiveIndices(editData?.drugList.map(() => true));
      setSelectedItem(editData?.drugList);
      const leftElelemt = totalDrugList.filter((elem) => {
        return !editData?.drugList?.find((ele) => {
          return ele.id === elem.id;
        });
      });
      setActiveIndicies(leftElelemt?.map(() => false));
      setTransferableRoleList(leftElelemt);
      setCopyData(totalDrugList);
    }

    // return () => {
    //   setTransferableRoleList([]);
    //   setSelectedItem([]);
    //   setSelectedItemActiveIndices([]);
    // };
  }, [editData]);

  useEffect(() => {
    if (updateProgramResp && updateProgramResp?.status === 201) {
      if (updateProgramResp?.data?.status === 1) {
        handleCloseEditProgrmModal();
        toastMessage("Program Desk", updateProgramResp?.data?.message);
        dispatch(getProgramDeskList());
        dispatch(updateProgramResponse(""));
      } else if (updateProgramResp?.data?.status === 0) {
        toastMessage("Program Desk", updateProgramResp?.data?.message);
        dispatch(updateProgramResponse(""));
      }
    } else if (updateProgramResp && updateProgramResp?.status === 500) {
      handleCloseEditProgrmModal();
      dispatch(updateProgramResponse(""));
      toastMessage("Program Desk", "Something went wrong", "error");
    }
  }, [updateProgramResp]);

  const editProgramSchema = Yup.object().shape({
    programName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Program Name is Required"),
    prgCode: Yup.string().required("Program Code is required"),
    startDate: Yup.string().required("Start Date is Required!"),
    endDate: Yup.string().required("End Date is required"),
    remarks: Yup.string().required("Remarks is required"),
    status: Yup.string().ensure().required("Status Field is Required"),
  });
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

  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <BasicModal
        title="Edit Program"
        show={openEditProgrmModal}
        close={() => {
          handleCloseEditProgrmModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="edit_program"
      >
        <Formik
          validateOnMount
          initialValues={{
            programName: editData?.programmeName,
            prgCode: editData?.programmeCode,
            startDate: editData?.startDate,
            endDate: editData?.endDate,
            remarks: editData?.remarks,
            status: editData?.status,
          }}
          validationSchema={editProgramSchema}
          onSubmit={async (values) => {
            values["startDate"] = formatDate(values?.startDate);
            values["endDate"] = formatDate(values?.endDate);
            values["id"] = editData?.id;
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
              dispatch(updateProgram({ ...values, list: programId }));
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
                  {editProgramField.map(
                    ({ name, type, value, label, ...props }) => {
                      switch (type) {
                        case "select":
                          console.log("props", props?.option);
                          return (
                            <>
                              <div className="row mb-2">
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-3"
                                  }`}
                                >
                                  <label htmlFor={name} class="col-form-label">
                                    {label}
                                  </label>
                                </div>
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-6"
                                  }`}
                                >
                                  <CustomSelect
                                    id={name}
                                    key={name}
                                    name={name}
                                    defaultValue={
                                      props?.option &&
                                      props?.option?.find(
                                        (c) => c.value == values[`${name}`]
                                      )
                                    }
                                    value={
                                      props?.option &&
                                      props?.option?.find(
                                        (c) => c.value == values[`${name}`]
                                      )
                                    }
                                    onChange={(val) => {
                                      setFieldValue(name, val.value);
                                    }}
                                    options={
                                      props?.option && props?.option?.length > 0
                                        ? props?.option
                                        : []
                                    }
                                    onBlur={setFieldTouched}
                                  />
                                </div>
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-3"
                                  }`}
                                >
                                  {errors.name && touched.name ? (
                                    <div className="text-danger float-end">
                                      {errors.name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          );
                        case "date":
                          return (
                            <>
                              <div className="row mb-2">
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-3"
                                  }`}
                                >
                                  <label htmlFor={name} class="col-form-label">
                                    {label} :
                                  </label>
                                </div>
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-6"
                                  }`}
                                >
                                  <CustDatepicker
                                    value={values[`${name}`]}
                                    name={name}
                                    inputFormat={
                                      props?.format
                                        ? props?.format
                                        : "DD/MM/YYYY"
                                    }
                                    // disablePast={name === "endDate" ? true : false}
                                    onChange={(newValue) => {
                                      setFieldValue(name, newValue);
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          );

                        default:
                          return (
                            <>
                              <div className="row mb-2">
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-3"
                                  }`}
                                >
                                  <label
                                    htmlFor={name}
                                    className="col-form-label"
                                  >
                                    {label}
                                  </label>
                                </div>
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-6"
                                  }`}
                                >
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
                                <div
                                  className={`${
                                    isSmallScreen ? "col-sm-12" : " col-3"
                                  }`}
                                >
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
                          className="success primary rounded-0"
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

export default EditProgramDeskForm;
