// Author Dinesh Kumar
import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRefresh } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import CustDatepicker from "../../../components/datepicker/custDatepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createProgram,
  createProgramResponse,
  getProgramDeskList,
} from "../../../store/admin/action";
import toastMessage from "../../../common/toastmessage/toastmessage";
import TransferComponent from "../../../components/transfer/transferComponent";
import dayjs from "dayjs";
const CreateProgramDeskForm = ({
  openCreateProgrmModal,
  handleCloseCreateProgrmModal,
  totalDrugList,
}) => {
  const dispatch = useDispatch();
  const createProgramResponses = useSelector(
    (state) => state?.admin?.createProgramResp
  );
  console.log("createProgramResponses", createProgramResponses);
  const [tempArray, setTempArray] = useState([]);
  const [rightTempArray, setRightTempArray] = useState([]);
  const [selectItemActiveIndices, setSelectedItemActiveIndices] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [activeIndicies, setActiveIndicies] = useState([]);
  const [firstClick, setFirstClick] = useState(false);
  const [copyData, setCopyData] = useState([]);
  const [transferableRoleList, setTransferableRoleList] = useState([]);
  const newProgramSchema = Yup.object().shape({
    programName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Program Name is Required"),
    programCode: Yup.string().required("Program Code is required"),
    startDate: Yup.string().required("Start Date is Required!"),
    endDate: Yup.string().required("End Date is required"),
    remarks: Yup.string().required("Remarks is required"),
    status: Yup.number().required("Status Field is Required"),
  });

  const addProgramField = [
    {
      type: "text",
      name: "programName",
      placeholder: "Enter Programe Name",
      value: "",
      label: "Programe Name",
    },
    {
      type: "text",
      name: "programCode",
      placeholder: "Full Name",
      value: "",
      label: "Programe Code",
    },
    {
      type: "date",
      name: "startDate",
      value: "",
      label: "Start Date",
      format: "DD/MM/YYYY",
    },
    {
      type: "date",
      name: "endDate",

      value: null,

      label: "End Date",
      format: "DD/MM/YYYY",
    },
    {
      type: "text",
      name: "remarks",
      value: "",
      label: "Remarks",
    },
    {
      type: "select",
      name: "status",
      option: [
        { label: "Active", value: "1" },
        { label: "InActive", value: "0" },
      ],
      label: "Status",
      value: "",
    },
  ];

  useEffect(() => {
    setSelectedItem([]);
    setRightTempArray([]);
    setFirstClick(false);
    setSelectedItemActiveIndices([]);
    setTempArray([]);
    setActiveIndicies(totalDrugList?.map(() => false));
    setTransferableRoleList(totalDrugList);
    setCopyData(totalDrugList);
  }, [totalDrugList]);
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
  useEffect(() => {
    if (createProgramResponses && createProgramResponses?.status === 201) {
      if (createProgramResponses?.data?.status === 1) {
        handleCloseCreateProgrmModal();
        toastMessage("PROGRAM DESK", createProgramResponses?.data?.message);
        dispatch(createProgramResponse(""));
        dispatch(getProgramDeskList());
      } else if (createProgramResponses?.data?.status === 0) {
        toastMessage("PROGRAM DESK", createProgramResponses?.data?.message);
        dispatch(createProgramResponse(""));
      }
    } else if (
      (createProgramResponses && createProgramResponses?.status === 500) ||
      createProgramResponses?.status === 404
    ) {
      handleCloseCreateProgrmModal();
      toastMessage("PROGRAM DESK", "Something went wrong");
    }
  }, [createProgramResponses]);

  const handleSubmit = (values) => {
    console.log("Submit Values", values);
    dispatch(createProgram(values));
  };
  return (
    <>
      <BasicModal
        title="Create New Program"
        show={openCreateProgrmModal}
        close={() => {
          handleCloseCreateProgrmModal();
        }}
        isStatic={false}
        scrollable={true}
        isCenterAlign={false}
        fullScreen={false}
        size="lg"
        key="create_program"
      >
        <Formik
          validateOnMount
          initialValues={{
            programName: "",
            programCode: "",
            startDate: null,
            endDate: null,
            remarks: "",
            status: "",
          }}
          validationSchema={newProgramSchema}
          onSubmit={async (values) => {
            values["startDate"] = formatDate(values?.startDate);
            values["endDate"] = formatDate(values?.endDate);
            if (selectedItem && selectedItem?.length === 0) {
              toastMessage("Program Desk", "Please map the Drug list");
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
              dispatch(createProgram({ ...values, list: programId }));
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
            isValid,
            setFieldValue,
          }) => (
            <Form>
              <div className="row">
                <div className="col-sm-12 col-md-10 col-lg-10 offset-md-1 offset-lg-1">
                  {addProgramField &&
                    addProgramField?.length > 0 &&
                    addProgramField.map(
                      ({ name, type, value, label, ...props }) => {
                        switch (type) {
                          case "select":
                            return (
                              <>
                                <div className="row mb-2">
                                  <div className="col-3">
                                    <label
                                      htmlFor={name}
                                      class="col-form-label"
                                    >
                                      {label} :
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <CustomSelect
                                      className="form-control shadow-none"
                                      name={name}
                                      id={name}
                                      value={
                                        props?.option &&
                                        props?.option?.find(
                                          (c) => c.value === values[`${name}`]
                                        )
                                      }
                                      onChange={(val) => {
                                        setFieldValue(name, val.value);
                                      }}
                                      options={
                                        props?.option &&
                                        props?.option?.length > 0
                                          ? props?.option
                                          : []
                                      }
                                      onBlur={setFieldTouched}
                                    />
                                    <div className="col-3">
                                      {errors.name && touched.name ? (
                                        <div className="text-danger float-end">
                                          {errors.name}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "date":
                            return (
                              <>
                                <div className="row mb-2">
                                  <div className="col-3">
                                    <label
                                      htmlFor={name}
                                      class="col-form-label"
                                    >
                                      {label} :
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <CustDatepicker
                                      value={values[`${name}`]}
                                      name={name}
                                      inputFormat="DD/MM/YYYY"
                                      disablePast={
                                        name === "endDate" ? true : false
                                      }
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
                  <div className="row  mb-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faRefresh}
                              className="me-1"
                            />
                          }
                          type="button"
                          buttonText="Reset"
                          className="secondary rounded-0 me-1"
                          outlineType={true}
                        />
                        <Basicbutton
                          icon={
                            <FontAwesomeIcon
                              icon={faFloppyDisk}
                              className="me-1"
                            />
                          }
                          type="submit"
                          buttonText="Save"
                          className="success rounded-0 me-1"
                          outlineType={true}
                          disabled={!isValid}
                        />
                        <Basicbutton
                          type="button"
                          buttonText="Close"
                          className="danger rounded-0"
                          outlineType={true}
                          onClick={handleCloseCreateProgrmModal}
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

export default CreateProgramDeskForm;
