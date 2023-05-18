import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/select/customSelect";
import Basicbutton from "../../../components/button/basicbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRefresh } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../../components/modal/basicmodal";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import CustDatepicker from "../../../components/datepicker/custDatepicker";

const CreateProgramDeskForm = ({
  openCreateProgrmModal,
  handleCloseCreateProgrmModal,
}) => {
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
    },
    {
      type: "date",
      name: "endDate",

      value: null,

      label: "End Date",
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
            programName: "Test",
            programCode: "",
            startDate: null,
            endDate: null,
            remarks: "",
            status: "",
          }}
          validationSchema={newProgramSchema}
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
            setFieldValue,
          }) => (
            <Form>
              <div className="row">
                <div className="col-10 offset-1">
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
